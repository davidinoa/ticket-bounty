<script lang="ts">
  const { label } = $props<{ label: string }>();
  let isDisabled = $state(false);

  function handleClick() {
    isDisabled = true;
  }
</script>

<button
  on:click={handleClick}
  disabled={isDisabled}
  class="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
>
  {label}
</button>
