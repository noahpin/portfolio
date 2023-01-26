<canvas id="background" bind:this={canvas}></canvas>

<style>
    #background {
  position:fixed;
  top:0;
  left:0;
  width:100vw;
  height:100vh;
  pointer-events:none;
  z-index: -1;
  background:black;
}
</style>


<svelte:window 
on:resize={onresize}
	bind:innerWidth
    bind:innerHeight
  />
  <svelte:body bind:scrollY={scrollY}
  on:scroll={scroll}></svelte:body>

<script>
    var points = [];
    export let canvas
    import { onMount } from "svelte";
    export let innerWidth
    export let innerHeight
    export function onresize(){
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      regeneratePoints();

    }
    
    function regeneratePoints() {
      num = (window.innerHeight * window.innerWidth) / 5000;
      points = [];
      for (let i = 0; i < num; i++) {
        points.push([
          Math.floor(Math.random() * canvas.width),
          Math.floor(Math.random() * canvas.height),
          Math.random() * 1 + 0.5
        ]);
      }
    }
    
    function draw() {/*
    ctx.globalAlpha = 0.75
      ctx.drawImage(canvas, 2, 0)
      ctx.drawImage(canvas, -2, 0)
      ctx.drawImage(canvas,0, -2)
      ctx.drawImage(canvas,0, 2)
    ctx.globalAlpha = 1*/
        ctx.globalAlpha = 1
      ctx.fillStyle = "#00000056"
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      points.forEach((point, i) => {
        ctx.globalAlpha = (point[2] - .5)
        ctx.fillRect(point[0] , point[1], 2, 2 + Math.floor(Math.abs(deltaScroll)));
        point[1] += deltaScroll * point[2];
        if (point[1] < -20) {
          point[1] += window.innerHeight + 20;
          point[0] = Math.floor(Math.random() * canvas.width);
          point[3] = Math.random() * 1 + 0.5;
        }
        if (point[1] > window.innerHeight + 20) {
          point[1] -= window.innerHeight + 20;
          point[0] = Math.floor(Math.random() * canvas.width);
          point[3] = Math.random() * 1 + 0.5;
        }
      });
      deltaScroll = lerp(deltaScroll, 1, 0.03);
      requestAnimationFrame(draw);
    }
    function lerp(a, b, t) {
      return a + t * (b - a);
    }
    var ctx
    var num = 100;
    var deltaScroll = 0;
     let scrollY = 0
    var lastScroll = scrollY;

    export function scroll(e) {
      scrollY = document.body.scrollTop
      deltaScroll += (lastScroll - scrollY) * 0.05;
    
      lastScroll = scrollY;
        
    }
    
    onMount(()=>{
    ctx = canvas.getContext("2d");
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    regeneratePoints();
    
    draw();
    })
    </script>