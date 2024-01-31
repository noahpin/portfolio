<script lang="ts">
	export let author;
	export let breakpoint;
	export let home = false; //if home, only show the little about me part of the footer if breakpoint is false.
	export let nav = false;
	let showMainContent = breakpoint ? !nav : true;
	$: showMainContent = breakpoint ? !nav : true;
</script>

<div class="nav-content">
    {#if breakpoint ? nav : true}
	<div class="particle">
		{#if breakpoint ? home : true}
			{@html author.intro}
		{/if}
		{#if breakpoint && !nav}
			<div class="particle">
				<br />
				&copy; Noah Pinales {`${new Date().getFullYear()}`}
			</div>
		{/if}
	</div>
    {/if}
	{#if showMainContent}
		{#if author.contacts.length > 0}
			<div class="particle">
				<span>---reach me---</span>
				{#each author.contacts as { title, description, link }}
					<div class="contact-block">
						<div style="text-transform: lowercase">{description}</div>

						<a href={link}>
							{title}
						</a>
					</div>
				{/each}
			</div>
		{/if}
		{#if author.expertise.length > 0}
			<div class="particle">
				<span>---expertise---</span>
				{#each author.expertise as expertise}<br />
					<span style="text-transform: lowercase">{expertise}</span>
				{/each}
			</div>
		{/if}
		{#if !breakpoint}
			<div class="particle">
				&copy; Noah Pinales {`${new Date().getFullYear()}`}
			</div>
		{/if}
	{/if}
</div>

<style>
	.nav-content {
		font-size: 15px;
		width: 100%;
	}
	.particle {
		text-wrap: wrap;
		margin-bottom: 15px;
	}
	.contact-block {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	@media (max-width: 950px) {
		.nav-content {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			gap: 40px;
			margin-bottom: 40px;
		}
		.nav-content .particle {
			flex: 1 1 160px;
			margin-bottom: 0;
		}
		.contact-block {
			display: flex;
			justify-content: flex-start;
			gap: 16px;
		}
	}
</style>
