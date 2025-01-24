import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				background: 'rgb(from var(--color-background) r g b / <alpha-value>)',
				secondary: 'rgb(from var(--color-secondary) r g b / <alpha-value>)'
			},
			supports: {
				'backdrop-blur': 'backdrop-filter: blur'
			}
		}
	},

	plugins: []
} satisfies Config;
