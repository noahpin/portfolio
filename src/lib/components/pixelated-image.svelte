<script>
	export let imageSrc = "";
	export let color1 = "#ff0000"; // Red
	export let color2 = "#0000ff"; // Blue
	export let maxPixelSize = 16;

	let filterId = "pixelateFilter";
	let gradientX = 1.0;
	let gradientY = 0.0;

	function updateGradient(event) {
		let rect = event.target.getBoundingClientRect();
		gradientX = (event.clientX - rect.left) / rect.width;
		gradientY = (event.clientY - rect.top) / rect.height;
	}
</script>

<svg
	width="100%"
	height="100%"
	viewBox="0 0 800 600"
	on:mousemove={updateGradient}
>
	<!-- SVG Filter Definition -->
	<defs>
		<filter id={filterId} x="0%" y="0%" width="100%" height="100%">
			<!-- Pixelation effect -->
			<feFlood flood-color="black" result="BLACK_BG" />
			<feImage
				xlink:href={imageSrc}
				result="SOURCE"
				x="0"
				y="0"
				width="100%"
				height="100%"
			/>

			<feColorMatrix
				in="SOURCE"
				type="matrix"
				values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 1 0"
				result="ORIGINAL"
			/>

			<!-- Convert brightness to grayscale -->
			<feColorMatrix type="saturate" values="0" in="ORIGINAL" result="GRAY" />

			<!-- Displacement map for pixelation -->
			<feTurbulence
				type="fractalNoise"
				baseFrequency={1 / maxPixelSize}
				numOctaves="2"
				result="TURBULENCE"
			/>
			<feDisplacementMap
				in="ORIGINAL"
				in2="TURBULENCE"
				scale={maxPixelSize}
				result="PIXELATED"
			/>

			<!-- Gradient mapping (brightness → color1 to color2) -->
			<feComponentTransfer in="PIXELATED">
				<feFuncR type="linear" slope={gradientX} intercept={1 - gradientX} />
				<feFuncG type="linear" slope={gradientY} intercept={1 - gradientY} />
				<feFuncB type="linear" slope="1" intercept="0" />
			</feComponentTransfer>
		</filter>
	</defs>

	<!-- Apply Filter to Image -->
	<image
		x="0"
		y="0"
		width="100%"
		height="100%"
		xlink:href={imageSrc}
		filter="url(#{filterId})"
	/>
</svg>
