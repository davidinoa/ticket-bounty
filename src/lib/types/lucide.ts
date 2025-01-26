import type { SvelteComponent } from 'svelte';

type LucideProps = {
	size?: number | string;
	strokeWidth?: number | string;
	absoluteStrokeWidth?: boolean;
	color?: string;
	class?: string;
};

export type LucideIcon = new (options: {
	target: Element;
	props?: Partial<LucideProps>;
}) => SvelteComponent<LucideProps>;

export type LucideIconProps = LucideProps;
