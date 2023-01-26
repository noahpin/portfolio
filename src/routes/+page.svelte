<script>
  import ProjectCard from "$lib/components/project-card.svelte";
  import { createPopperActions } from "svelte-popperjs";
  import { onMount } from "svelte";
  import {marked} from "marked"

  const [popperRef, popperContent, getInstance] = createPopperActions({
    placement: "right",
    strategy: "fixed",
  });

  const extraOpts = {
    modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
  };

  let showTooltip = false;

  let background = "";
  export let data;
  let { projects, authors } = data;
  $: ({ projects, authors } = data); // so it stays in sync when `data` changes
	var author = authors[0];

  $: console.log({ projects });
  //create image visibility array for each project
  let imageVisibility = new Array(projects.length).fill(false);
  imageVisibility[0] = false;
  let index = 0;
  let counter = 0;
  let interval = setInterval(() => {
    inc();
  }, 5000);
  function inc() {
	return
    index++;
    if (index >= projects.length) {
      index = 0;
    }
  }
  $: {
    imageVisibility = new Array(projects.length).fill(false);
    imageVisibility[index] = true;
    counter = 0;
    clearInterval(interval);
    interval = setInterval(() => {
      inc();
    }, 5000);
  }
  onMount(() => {
    document.documentElement.style.cssText = `--background: #161412; --text: #dad7d4; `;
  });
  var x = 0
  var y = 0
  function mouseMove(e){
    if(!showTooltip) return
	x = e.clientX 
	y =  e.clientY
	getInstance().update();
  }
</script>
{#if showTooltip}
<div id="backgrounds"use:popperContent={extraOpts}>
  {#each projects as { image }, i}
    <img
      src={image[0].url}
      class={imageVisibility[i] ? "imageVisible" : ""}
      alt=""
    />
  {/each}
</div>
{/if}
<svelte:head>
  <title>Noah Pinales ✧ Designer and Developer</title>
</svelte:head>
<svelte:window
on:mousemove={mouseMove}
></svelte:window>

<div id="dummyCursor" use:popperRef style={`top: ${y}px; left: ${x}px;`}></div>

<h2>{@html author.intro}</h2>
<div id="projectList" 
class={showTooltip ? "hovered" : ""}
on:mouseenter={() => showTooltip = true}
on:mouseleave={() => showTooltip = false}>
  {#each projects as { name, slug, image, projectTags, timestamp }, i}
    <a
      class={imageVisibility[i] ? "project highlight" : "project"}
      href={"work/" + slug}
      on:mouseover={() => {
        index = i;
      }}
      on:focus={() => {
        index = i;
      }}
    >
      <h3>{name}</h3>
    </a>
  {/each}
</div>

<style>
	h2 {
    margin-top: 100px;
		text-align: left;
		max-width: 1000px;
		margin-bottom: 0px;
		word-break: normal;
		hyphens: auto;
	}
  :global(body) {
    background: black;
  }
  #dummyCursor {
    position: fixed;
    pointer-events: none;
  }
  #backgrounds {
    width: 700px;
	height:400px;
    z-index: 100;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    pointer-events: none;
  }
  #backgrounds img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.1s;
  }
  .imageVisible {
    opacity: 1 !important;
  }
  .project {
    font-size: 55px;
    transition: 0.3s background-size;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    transition: 0.1s;
    font-weight: bold;
    border-bottom: 1px solid rgba(255, 255, 255, 0.212);
    opacity: 0.75;
  }
  .project:first-child {
    border-top: 1px solid rgba(255, 255, 255, 0.212);
  }
  .hovered a {
	opacity: 0.5;
  }
  .hovered .highlight {
    padding-left: 50px;
    opacity: 1;
  }
  a {
    text-decoration: none;
  }
  .timestamp {
    opacity: 0.5;
  }
  #projectList {
    position: relative;
    width: 100%;
    gap: 0;
    z-index: 10;
    float: right;
    bottom: 0;
    margin-top: 30px;
    margin-bottom: 150px;
  }
</style>
