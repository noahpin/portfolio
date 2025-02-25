<script>
	import { tweened } from "svelte/motion";
	export let duration = 2000;
	export let text = "";
	export let show = false;

	let displayText = "";
	let interval;
	let cutIndex = new tweened(-3, { duration });
	$: cutIndex.set(show ? text.length : -3);
    function randomChar() {
        const chars = "!@#$%^&*()[]{}-=_+~";
        return chars[Math.floor(Math.random() * chars.length)];
    }
</script>

{#each text as char, i}
{#if i < $cutIndex}{@html  char.replace(" ", "&nbsp;")}{:else if (i-1 == Math.floor($cutIndex) || i-2 == Math.floor($cutIndex))}{randomChar()}{/if}
{/each}

<style>
	.hidden {
		visibility: hidden;
	}
</style>
