<script>
	import {hoveredElementStore} from "$lib/stores.js";
    import TextWriteon from "./text-writeon.svelte";
    import { onMount } from "svelte";
    import {tweened} from "svelte/motion"
	export let project;
	let scrollY = 0;
	function getFormattedDate(date) {
		let year = date.getFullYear();
		let month = (1 + date.getMonth()).toString().padStart(2, "0");
		let day = date.getDate().toString().padStart(2, "0");

		return month + "-" + day + "-" + year;
	}
    console.log(project)
    let imageLoaded = false;
    let boundingRect = null; 
    let el = null;
    onMount(() => {
        boundingRect = el.getBoundingClientRect();
    })
    let mX = 0;
    let mY = 0;
    // $: console.log(mX, mY + scrollY)
    //make a tween for a little parallax relative to the center of the bounding rect and mX/mY, based on the same requirements of class:suppress. if ont suppressed, set it to 0
    let parallaxX = tweened(0, {duration: 100});
    let parallaxY = tweened(0, {duration: 100});
    let scale = tweened(1, {duration: 100});
    $: if (boundingRect) {
        if (project != $hoveredElementStore) {
            parallaxX.set(0);
            parallaxY.set(0);
            scale.set(1);
        } else {
            parallaxX.set((mX - boundingRect.left - boundingRect.width / 2) / 24);
            parallaxY.set(((mY - boundingRect.top - boundingRect.height / 2) + scrollY) / 24);
            scale.set(1.05);
        }
    }
    export let columns = 3;
    //effect to reset the boundingclientrect once columns are changed
    $: if (columns != 10 && el) {
        console.log('regenerating boundignrect')
        boundingRect = el.getBoundingClientRect();
    }
</script>

<svelte:window
    on:mousemove={(e)=>{
        mX = e.clientX;
        mY = e.clientY;
    }}
    
></svelte:window>

<svelte:body
	on:scroll={(e) => {
		scrollY = e.target.scrollTop;
	}}
/>
<a
bind:this={el}
	class="home-project"
	href={"work/" + project.slug}
    class:suppress={project != $hoveredElementStore && $hoveredElementStore != null}
	on:mouseover={() => hoveredElementStore.set(project)}
	on:mouseout={() => hoveredElementStore.set(null)}
	on:focus={() => hoveredElementStore.set(project)}
	on:blur={() => hoveredElementStore.set(null)}
>
	<img style={`--offsety: ${$parallaxY}px; --offsetx: ${$parallaxX}px; --scale: ${$scale}`} on:load={()=> imageLoaded = true} style:aspect-ratio={`${project.image[0].width} / ${project.image[0].height}`} src={project.image[0].url} alt="" />
    <div  style={`--offsety: ${$parallaxY*2}px; --offsetx: ${$parallaxX*2}px`} class="project-title">
        <TextWriteon text={project.name} duration={150} show={$hoveredElementStore == project} />
    </div>
    <div  style={`--offsety: ${$parallaxY/2}px; --offsetx: ${$parallaxX/2}px;`} class="project-barcode">
        <TextWriteon text={project.name} duration={100} show={$hoveredElementStore == project} />
    </div>
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
        transition: 0.2s opacity, 0.2s filter;
        z-index: 10;
        box-sizing: border-box;
	}
    .suppress {
        z-index: -1 !important;
    }
	.home-project img {
		width: 100%;
        transition: 0.2s opacity, 0.2s filter;
        pointer-events: none;
        z-index: 7;
        transform: translate(var(--offsetx), var(--offsety)) scale(var(--scale));
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
		outline-offset: 5px;
	}
    .home-project:hover img, .home-project:focus img {
        /* filter: sepia(1) saturate(0) contrast(.95) brightness(1.4); */
        /* opacity: 0; */
    }
    .home-project:hover .inverted-image, .home-project:focus  .inverted-image {
        /* filter: sepia(1) saturate(0) contrast(.95) brightness(1.4); */
        /* opacity: 1 !important; */
    }
    .home-project:hover .project-title, .home-project:focus .project-title {
        opacity: 1;
        transition: 0s 0s opacity;
    }
    .home-project:hover .project-barcode, .home-project:focus .project-barcode {
        opacity: 1;
    }
    .project-title, .project-barcode {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        color: var(--accent);
        font-size: 2.3rem;
        text-wrap: wrap;
        transition: 0s 0.15s opacity;
            line-height: 2.3rem;
    }

    .project-title {
        z-index: 10;
        font-family: "Instrument Serif";
        top: 0; left: 0;
        padding: 8px;
        background: black;
        opacity: 0;
        transform: translate(calc(var(--offsetx) - 20px), calc(var(--offsety) - 20px));
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
        transform: translate(calc(var(--offsetx) + 20px), calc(var(--offsety) + 20px));
    }

    :global(.project-barcode *) {
        font-family: "Libre Barcode 128";
        font-size: 3rem;
        text-wrap: nowrap;
        color: var(--accent);
    }
    .suppress {
        filter: brightness(.5) saturate(0);
    }
</style>
