<script>
	import { onMount } from "svelte";

	let canv;
	let ctx;
	let docHeight;
	let docWidth;
	let pixelSize = 6;
	let aspectRatio = "";

	onMount(() => {
		canv = document.querySelector("canvas");
		ctx = canv.getContext("2d");
		docHeight = document.body.scrollHeight;
		docWidth = document.body.scrollWidth;
		canv.width = Math.floor(docWidth / pixelSize);
		canv.height = Math.floor(docHeight / pixelSize);
		aspectRatio = `${docWidth} / ${docHeight}`;
		// timeout();
		clearPixel();
	});
	class Point {
		constructor(x, y) {
			this.x = x;
			this.y = y;
		}
	}

	function line(p1, p2) {
		/* this function calculates the points of the line with endpoints p1 &p2
		 */
		let points = [];
		let dx = Math.abs(p2.x - p1.x);
		let sx = p1.x < p2.x ? 1 : -1;
		let dy = -Math.abs(p2.y - p1.y);
		let sy = p1.y < p2.y ? 1 : -1;
		let err = dx + dy;

		let x1 = p1.x;
		let y1 = p1.y;
		while (true) {
			points.push(new Point(x1, y1));
			if (x1 == p2.x && y1 == p2.y) {
				break;
			}
			let e2 = 2 * err;
			if (e2 >= dy) {
				err += dy;
				x1 += sx;
			}

			if (e2 <= dx) {
				err += dx;
				y1 += sy;
			}
		}
		return points;
	}
	let mX = 0;
	let mY = 0;
	let scrollY = 0;
	let allPoints = []; //this is treated as a queue, where the first elements are removed at an interval.
	let previousHomePoint = null;
	function rerender() {
		ctx.fillStyle = "#aeff00";
		let point = new Point(
			Math.floor((mX - pixelSize / 2) / pixelSize),
			Math.floor((mY + scrollY - pixelSize / 2) / pixelSize)
		);
		let newPoints = [];
		if (previousHomePoint) {
			if (previousHomePoint.x == point.x && previousHomePoint.y == point.y)
				return;
			let linePoints = line(previousHomePoint, point);
			for (let i = 0; i < linePoints.length; i++) {
				allPoints.push(linePoints[i]);
				newPoints.push(linePoints[i]);
			}
		} else {
			allPoints.push(point);
			newPoints.push(point);
		}
		newPoints.forEach((p) => {
			ctx.fillRect(p.x, p.y, 1, 1);
		});
		previousHomePoint = point;
	}

	function clearPixel() {
		setTimeout(() => {
			if (allPoints.length > 100) {
				for (let i = 0; i < allPoints.length - 60; i++) {
					let p = allPoints.shift();
					if (p) ctx.clearRect(p.x, p.y, 1, 1);
				}
			}
			let p = allPoints.shift();
			if (p) ctx.clearRect(p.x, p.y, 1, 1);
			clearPixel();
		}, 1);
	}
</script>

<svelte:window
	on:mousemove={(e) => {
		mX = e.clientX;
		mY = e.clientY;
		rerender();
	}}
	on:resize={() => {
		aspectRatio = "";
		canv.height = 0;
		setTimeout(() => {
			docHeight = document.body.scrollHeight;
			docWidth = document.body.scrollWidth;
			canv.width = Math.floor(docWidth / pixelSize);
			canv.height = Math.floor(docHeight / pixelSize);
			aspectRatio = `${docWidth} / ${docHeight}`;
			ctx.clearRect(0, 0, canv.width, canv.height);
		}, 1);
	}}
/>
<svelte:body
	on:scroll={(e) => {
		scrollY = e.target.scrollTop;
		rerender();
	}}
/>
<canvas id="pix-canvas" style:aspect-ratio={aspectRatio}></canvas>

<style>
	#pix-canvas {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1000;
		pointer-events: none;
		width: 100vw;
		image-rendering: pixelated;
	}
</style>
