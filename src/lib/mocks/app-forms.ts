import type { ActionResult } from '@sveltejs/kit';

type EnhanceCallback = (result: { result: ActionResult; update: () => Promise<void> }) => void;

export const enhance = (form: HTMLFormElement, callback: EnhanceCallback) => callback;
