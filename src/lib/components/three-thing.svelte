<script>
	import * as THREE from "three";
	import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
	import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
	import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
	import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
	import { onMount } from "svelte";

	let camera, renderer, composer;
	let object;

	onMount(() => {
		init();
	});

	function init() {
		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, 400);
		renderer.setAnimationLoop(animate);
		container.appendChild(renderer.domElement);

		//

		camera = new THREE.PerspectiveCamera(
			70,
			window.innerWidth / 400,
			1,
			1000
		);
		camera.position.z = 400;

		const scene = new THREE.Scene();
		scene.fog = new THREE.Fog(0x000000, 1, 1000);

		object = new THREE.Object3D();
		scene.add(object);

		const geometry = new THREE.SphereGeometry(1, 4, 4);
		const material = new THREE.MeshPhongMaterial({
			color: 0xffffff,
			flatShading: true,
		});

		for (let i = 0; i < 100; i++) {
			const mesh = new THREE.Mesh(geometry, material);
			mesh.position
				.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
				.normalize();
			mesh.position.multiplyScalar(Math.random() * 400);
			mesh.rotation.set(
				Math.random() * 2,
				Math.random() * 2,
				Math.random() * 2
			);
			mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
			object.add(mesh);
		}

		scene.add(new THREE.AmbientLight(0xcccccc));

		const light = new THREE.DirectionalLight(0xffffff, 3);
		light.position.set(1, 1, 1);
		scene.add(light);

		// postprocessing

		composer = new EffectComposer(renderer);
		composer.addPass(new RenderPass(scene, camera));

		const DotScreenShader = {
			name: "DotScreenShader",

			uniforms: {
				tDiffuse: { value: null },
                resolution: { value: new THREE.Vector2(
                    window.innerWidth,
                    400
                ) },
                pixelRatio: { value: window.devicePixelRatio },
			},

			vertexShader: /* glsl */ `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

			fragmentShader: /* glsl */ `

		uniform sampler2D tDiffuse;
        uniform vec2 resolution;
        uniform float pixelRatio;

		varying vec2 vUv;

		bool getValue(float brightness, vec2 pos) {
            
            // do the simple math first
            if (brightness > 16.0/17.0) return false;
            if (brightness < 01.0/17.0) return true;
            
    vec2 pixel = floor(mod((pos.xy+0.5) * 1., 4.0));
            int x = int(pixel.x);
            int y = int(pixel.y);
            bool result = false;
            
            // compute the 16 values by hand, store when it's a match
                if (x == 0 && y == 0) result = brightness < 16.0/17.0;
            else if (x == 2 && y == 2) result = brightness < 15.0/17.0;
            else if (x == 2 && y == 0) result = brightness < 14.0/17.0;
            else if (x == 0 && y == 2) result = brightness < 13.0/17.0;
            else if (x == 1 && y == 1) result = brightness < 12.0/17.0;
            else if (x == 3 && y == 3) result = brightness < 11.0/17.0;
            else if (x == 3 && y == 1) result = brightness < 10.0/17.0;
            else if (x == 1 && y == 3) result = brightness < 09.0/17.0;
            else if (x == 1 && y == 0) result = brightness < 08.0/17.0;
            else if (x == 3 && y == 2) result = brightness < 07.0/17.0;
            else if (x == 3 && y == 0) result = brightness < 06.0/17.0;
            else if (x == 0 && y == 1) result =	brightness < 05.0/17.0;
            else if (x == 1 && y == 2) result = brightness < 04.0/17.0;
            else if (x == 2 && y == 3) result = brightness < 03.0/17.0;
            else if (x == 2 && y == 1) result = brightness < 02.0/17.0;
            else if (x == 0 && y == 3) result = brightness < 01.0/17.0;
                
            return result;
        }

		void main() {

			vec4 color = texture2D( tDiffuse, vUv );

			float average = ( color.r + color.g + color.b ) / 3.0;
            vec2 uv = vec2(vUv.x, vUv.y);
            vec2 fc =  ((uv + 1.)) * resolution.xy;
            vec2 pos = (fc - resolution.xy) * 0.5;
			gl_FragColor = getValue(average, pos) ? vec4(0., 0., 0., 1.) : vec4(110. / 255., 1., 0., 1.);

		}`,
		};

		const effect1 = new ShaderPass(DotScreenShader);
		composer.addPass(effect1);

		const effect3 = new OutputPass();
		composer.addPass(effect3);

		//

		window.addEventListener("resize", onWindowResize);
	}

	function onWindowResize() {
		camera.aspect = window.innerWidth / 400;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, 400);
        composer.setSize(window.innerWidth, 400);
        composer.passes.forEach(pass => {
            if (pass instanceof ShaderPass && pass.uniforms['resolution']) {
            pass.uniforms['resolution'].value.set(window.innerWidth, 400);
            }
        });
	}

	function animate() {
		object.rotation.x += 0.005;
		object.rotation.y += 0.01;

		composer.render();
	}
    let container;
</script>
<div class="three-container">
    <div class="inner-container"  bind:this={container}></div>
</div>

<style>
    .three-container {
		position: relative;
		width: 100% !important;
		gap: 0;
        height : 400px;
        overflow: hidden;
		z-index: 10;
		bottom: 0;
		margin-top: 0;
        padding: 8px;
        box-sizing: border-box;
    }
    .inner-container {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    :global(.three-container * ) {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
