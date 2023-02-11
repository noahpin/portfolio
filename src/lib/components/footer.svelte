<script>
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import RiLogoInstagramFill from 'svelte-icons-pack/ri/RiLogoInstagramFill';
	import RiLogoGithubFill from 'svelte-icons-pack/ri/RiLogoGithubFill';
	import RiLogoLinkedinFill from 'svelte-icons-pack/ri/RiLogoLinkedinFill';
	import RiLogoTwitterFill from 'svelte-icons-pack/ri/RiLogoTwitterFill';
	import RiLogoDribbbleFill from 'svelte-icons-pack/ri/RiLogoDribbbleFill';
	import RiLogoBehanceFill from 'svelte-icons-pack/ri/RiLogoBehanceFill';
	import Logotype from './logotype.svelte';
</script>

<footer class=" footer-center">
	<div class="footer-content">
		<div class="footer-top">
			<!--
			<div class="footer-left">
				<Logotype size="75" />
			</div>
			<div class="footer-right">
				<a class="link link-hover" href="/projects">Portfolio</a>
				<a class="link link-hover" href="/posts">Blog</a>
				<a class="link link-hover" href="/about">About</a>
			</div>-->
			<a href="https://www.instagram.com/noahp.xyz/" target="blank">
				<Icon size="24" color="var(--white)" className="icon-button" src={RiLogoInstagramFill} />
			</a>
			<a href="https://www.dribbble.com/noahpinales" target="blank">
				<Icon size="24" color="var(--white)" className="icon-button" src={RiLogoDribbbleFill} />
			</a>
			<a href="https://www.github.com/fakedazon/" target="blank">
				<Icon size="24" color="var(--white)" className="icon-button" src={RiLogoGithubFill} />
			</a><!--
			<a href="https://www.linkedin.com/in/noahpinales" target="blank">
				<Icon size="24" color="var(--white)" className="icon-button" src={RiLogoLinkedinFill} />
			</a>-->
		</div>
		<p>
			&copy; Noah Pinales {`${new Date().getFullYear()}`}
		</p>
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
		padding: 60px 0;
		padding-top: 80px;
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
