<script>
	import {hoveredElementStore} from "$lib/stores.js";
    import TextWriteon from "./text-writeon.svelte";
	export let project;
	function getFormattedDate(date) {
		let year = date.getFullYear();
		let month = (1 + date.getMonth()).toString().padStart(2, "0");
		let day = date.getDate().toString().padStart(2, "0");

		return month + "-" + day + "-" + year;
	}
    console.log(project)
    let imageLoaded = false;
</script>

<a
	class="home-project"
	href={"work/" + project.slug}
    class:suppress={project != $hoveredElementStore && $hoveredElementStore != null}
	on:mouseover={() => hoveredElementStore.set(project)}
	on:mouseout={() => hoveredElementStore.set(null)}
	on:focus={() => hoveredElementStore.set(project)}
	on:blur={() => hoveredElementStore.set(null)}
>
	<img  on:load={()=> imageLoaded = true} style:aspect-ratio={`${project.image[0].width} / ${project.image[0].height}`} src={project.image[0].url} alt="" />
    <div class="project-title">
        <TextWriteon text={project.name} duration={150} show={$hoveredElementStore == project} />
    </div>
    <div class="project-barcode">
        <TextWriteon text={project.name} duration={100} show={$hoveredElementStore == project} />
    </div>
	<img  class="inverted-image" src={project.image[0].url} alt="" />
	<!-- <div class="project-text">
        <h3>{project.name}</h3>
        <div class="bottom">
            {#each project.disciplines as tag}
                <p>{tag}</p>
            {/each}
            <p>{getFormattedDate(new Date(project.timestamp))}</p>
        </div>
    </div> -->
</a>

<style>
	.home-project {
		display: flex;
		justify-content: flex-start;
		gap: 40px;
        padding: 8px;
        transition: 0.2s opacity;
        z-index: 10;
        box-sizing: border-box;
	}
    .suppress {
        z-index: -1 !important;
    }
	.home-project img {
		width: 100%;
        transition: 0.2s opacity, 0.2s transform, 0.2s filter;
        pointer-events: none;
        z-index: 7;
	}
    .inverted-image {
        position: absolute;
		width: 100%;
        height: 100%;
        top: 0; left: 0;
        padding: 8px;
        box-sizing: border-box;
        /* mix-blend-mode: difference;
        filter: sepia(1) saturate(0) contrast(.95) brightness(1.4); */
        opacity: 0 !important;
        z-index: 15 !important;
    }

	a {
		text-decoration: none;
        position: relative;
	}
	.home-project:focus {
		outline: 2px dashed var(--white);
		outline-offset: 5px;
	}
    .home-project:hover img, .home-project:focus img {
        transform: scale(1.05);
        /* filter: sepia(1) saturate(0) contrast(.95) brightness(1.4); */
        /* opacity: 0; */
    }
    .home-project:hover .inverted-image, .home-project:focus  .inverted-image {
        /* filter: sepia(1) saturate(0) contrast(.95) brightness(1.4); */
        /* opacity: 1 !important; */
    }
    .home-project:hover .project-title, .home-project:focus .project-title {
        opacity: 1;
        transition: 0s 0s opacity, transform 0.2s;
        transform: translate(-12px, -12px);
    }
    .home-project:hover .project-barcode, .home-project:focus .project-barcode {
        opacity: 1;
        transform: translate(20px, 20px);
    }
    .project-title, .project-barcode {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        color: var(--accent);
        font-size: 3rem;
        transition: 0s 0.15s opacity, transform 0.2s;
            line-height: 2.3rem;
        -webkit-background-clip: text;
        background-clip: text;
    }

    .project-title {
        z-index: 10;
        font-family: "Instrument Serif";
        top: 0; left: 0;
        padding: 8px;
        background: black;
        opacity: 0;
    }
    :global(.project-title *) {
        font-family: "Instrument Serif";
        font-size: 3rem;
        line-height: 2.3rem;
        color: var(--accent);
        background: black;
    }
    .project-barcode {
        font-size: 3rem;
        text-wrap: nowrap;
        z-index: 5;
        font-family: "Libre Barcode 128";
        right: 0; bottom: 0;
    }

    :global(.project-barcode *) {
        font-family: "Libre Barcode 128";
        font-size: 3rem;
        text-wrap: nowrap;
        color: var(--accent);
    }
    .suppress {
        opacity: 0.5;
    }
	@media (max-width: 800px) {
		.home-project {
			flex-direction: column;
			gap: 10px;
			margin-bottom: 40px;
		}
		.home-project img {
			width: 100%;
		}
		.project-text {
			width: 100%;

			gap: 10px;
		}
	}
</style>
