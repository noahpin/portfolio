<script>
	import NavfooterSharedContent from "./navfooter-shared-content.svelte";
	export let authors;
	let author = authors[0];
	$: author = authors[0];
</script>

<footer class=" footer-center">
	<div class="particle">
		&copy; Noah Pinales {`${new Date().getFullYear()}`}
	</div>
</footer>

<style>
	a:hover {
		opacity: 0.75;
		margin: 0;
		padding: 0;
	}
	footer {
		width: 100%;
		margin: 0;
		padding-top: 40px;
		padding-bottom: 40px;
		display: flex;
	}
	.footer-top {
		display: flex;
		justify-content: center;
		gap: 30px;
		align-items: center;
		padding: 10px 0;
	}
	p {
		color: var(--white);
		opacity: 0.25;
		margin-bottom: 0;
		width: 100%;
		text-align: center;
	}
	.footer-content {
		max-width: min(1000px, 80vw);
		margin: auto;
	}
	.footer-left,
	.footer-right {
		display: inline-block;
		width: 50%;
		margin: 0;
		padding: 0;
	}
</style>
