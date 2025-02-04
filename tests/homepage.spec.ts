import { expect, test } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Ticket Bounty/);
  });

  test('should display navigation elements', async ({ page }) => {
    // Check if the navigation bar exists
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();

    // Check for the logo/home link with TicketBounty text
    const homeLink = page.getByRole('link', { name: /TicketBounty/i });
    await expect(homeLink).toBeVisible();

    // Check for the navigation links
    const navTicketsLink = nav.getByRole('link', { name: 'Tickets' });
    await expect(navTicketsLink).toBeVisible();

    // Check for the New Ticket button
    const newTicketButton = page.getByRole('link', { name: 'New Ticket' });
    await expect(newTicketButton).toBeVisible();
  });

  test('should display welcome message', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Homepage' });
    await expect(heading).toBeVisible();

    const description = page.getByText(/Welcome to the Ticket Bounty platform/);
    await expect(description).toBeVisible();
  });

  test('should have a link to view tickets', async ({ page }) => {
    const viewTicketsLink = page.getByRole('link', { name: 'View Tickets', exact: true });
    await expect(viewTicketsLink).toBeVisible();

    // Test navigation to tickets page
    await viewTicketsLink.click();
    await expect(page).toHaveURL(/.*\/tickets/);
  });
});
