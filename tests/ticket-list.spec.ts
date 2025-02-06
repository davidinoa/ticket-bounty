import { expect, test } from './setup';

test.describe('Ticket List Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tickets');
  });

  test('should display loading state initially', async ({ page }) => {
    const spinner = page.getByRole('status');
    await expect(spinner).toBeVisible();
  });

  test('should display tickets when loaded', async ({ page }) => {
    // Wait for the loading state to finish
    await page.waitForSelector('[role="status"]', { state: 'hidden' });

    // Check for ticket container
    const ticketList = page.getByTestId('ticket-list');
    await expect(ticketList).toBeVisible();

    // Wait for tickets to be mounted (there's a staggered animation)
    await page.waitForTimeout(3000); // Wait for all ticket animations

    // Check for ticket items (using Card structure)
    const ticketLinks = ticketList.getByRole('link');
    await expect(ticketLinks).toHaveCount(7);

    // Check first ticket content
    const firstTicket = ticketLinks.first();
    await expect(firstTicket).toBeVisible();

    const ticketTitle = firstTicket.getByRole('heading');
    await expect(ticketTitle).toBeVisible();

    // Check for ticket content
    const ticketContent = firstTicket.locator('.text-muted-foreground');
    await expect(ticketContent).toBeVisible();

    // Check for status indicator
    const statusBadge = firstTicket.locator('.rounded-full');
    await expect(statusBadge).toBeVisible();
  });

  test('should navigate to ticket details when clicking a ticket', async ({ page }) => {
    // Wait for tickets to load
    await page.waitForSelector('[role="status"]', { state: 'hidden' });
    await page.waitForTimeout(3000); // Wait for ticket animations

    // Click the first ticket
    const ticketList = page.getByTestId('ticket-list');
    const firstTicket = ticketList.getByRole('link').first();

    // Get the ticket ID from the href
    const href = await firstTicket.getAttribute('href');
    await firstTicket.click();

    // Check if we navigated to the correct ticket page
    await expect(page).toHaveURL(href || '');
  });

  test('should display error state when API fails', async ({ page }) => {
    await page.goto('/tickets?error=true');

    // Check for error message
    const errorMessage = page.getByText('Failed to fetch tickets');
    await expect(errorMessage).toBeVisible({ timeout: 30_000 });

    // Check for retry button
    const retryButton = page.getByRole('button', { name: /try again/i });
    await expect(retryButton).toBeVisible();
  });

  test('should have correct page title and description', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Tickets' });
    await expect(heading).toBeVisible();

    const description = page.getByText(/Here are the tickets that have been submitted/);
    await expect(description).toBeVisible();
  });
});
