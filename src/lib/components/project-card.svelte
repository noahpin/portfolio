<script>
	import StarIcon from './star-icon.svelte';
	export let url = '';
	export let name = '';
	export let slug = '';
	export let shortDescription = '';
	export let tags = [];
	export let href = '';
	export let readButton = false;
</script>

<div class="card">
	<img src={url} alt={name} class="object-cover h-full" />
	<a {href}>
		<div
			class="absolute bottom-0 left-0 right-0 lg:opacity-0 group-hover:opacity-100 bg-primary p-4 duration-300 text-primary-content"
		>
			<h2 class="font-bold lg:text-xl">{name}</h2>
			<div class="projectTags">
				{#if tags}
					{#each tags as tag, i}
						<a href="/work#{tag.replace(' ', ' ').toLowerCase()}">{tag}</a>
						{#if tags.length - 1 > i}
							<span style="width: 20px" />
							<StarIcon fill="var(--white)" size="7" />
							<span style="width: 20px" />
						{/if}
					{/each}
				{/if}
			</div>
			<p class="text-sm lg:text-xl">{shortDescription}</p>
			{#if readButton}
				<a {href} class="readButton">Read &rArr;</a>
			{/if}
		</div>
	</a>
</div>

<style>
	.card {
		max-width: min(1000px, 80vw);
		margin-bottom: 75px;
	}
	.card img {
		width: 100%;
	}
	h2 {
		margin-bottom: 10px;
	}
	a {
		text-decoration: none;
	}
</style>
