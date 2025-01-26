<script lang="ts">
	import type { LucideIcon } from '$lib/types/lucide';
	import { LucideMessageSquareWarning } from 'lucide-svelte';
	import type { Component } from 'svelte';
	let {
		message = 'Not found',
		icon = LucideMessageSquareWarning,
		Button,
		buttonProps
	} = $props<{
		message?: string;
		icon?: LucideIcon;
		Button?: Component;
		buttonProps?: {
			children?: string;
			onclick?: () => void;
			variant?: 'link' | 'ghost';
		};
	}>();
</script>

<div class="flex w-full flex-1 items-center justify-center">
	<div class="space-y-6 rounded-lg p-8 text-center">
		{#if icon}
			{@const Icon = icon}
			<Icon class="mx-auto size-16 text-gray-400" />
		{/if}
		<p class="text-xl text-gray-400">{message}</p>
		{#if Button}
			<Button {...buttonProps}>
				{buttonProps?.children}
			</Button>
		{/if}
	</div>
</div>
