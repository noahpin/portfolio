<script>
	import { onMount } from 'svelte';

	export let duration = 15;
	export let repeat = 20;
	export let paused = false;
</script>

<div class="wrapper" style="">
	<div class="content" class:paused>
		{#each Array(repeat) as _, i}
			<div class="text" style="animation-duration: {duration}s">
				<slot />
			</div>
		{/each}
	</div>
</div>

<style>
	.wrapper {
		overflow: hidden;
		background: var(--white);
		padding: 5px;
		padding-bottom: 10px;
		position: absolute;
		bottom: 0;
		width: 100%;
	}
	.content {
		width: 100000px;
		background: var(--white);
	}
	.text {
		animation-name: animation;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		float: left;
		display: flex;
		align-content: center;
		align-items: center;
	}
	.text {
		font-family: 'Akira' !important;
	}
	.paused .text {
		animation-play-state: paused;
	}
	@keyframes animation {
		100% {
			transform: translateX(-100%);
		}
	}
</style>
