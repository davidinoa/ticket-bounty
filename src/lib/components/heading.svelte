<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';

	let { title, description = undefined } = $props<{
		title: string;
		description?: string;
	}>();
</script>

<div class="grid gap-8">
	<div class="grid gap-4 px-8">
		<h2 class="text-3xl font-bold">{title}</h2>
		{#if description}
			<p class="text-pretty text-muted-foreground">{description}</p>
		{/if}
	</div>
	<Separator />
</div>
