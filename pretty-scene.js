import {ThreeScene} from "https://cdn.skypack.dev/three-elements"

import * as THREE from "https://cdn.skypack.dev/three"
import { EffectComposer } from "https://cdn.skypack.dev/three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "https://cdn.skypack.dev/three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "https://cdn.skypack.dev/three/examples/jsm/postprocessing/UnrealBloomPass"
//import { ShaderPass } from "https://cdn.skypack.dev/three/examples/jsm/postprocessing/ShaderPass"
//import { VignetteShader } from "https://cdn.skypack.dev/three/examples/jsm/shaders/VignetteShader"

class PrettyScene extends ThreeScene {
  mountedCallback() {
    super.mountedCallback()

		const { game, camera } = this
		const { renderer, width, height } = game
		const scene = this.object


		this.composer = new EffectComposer(renderer)

		/* Add normal render pass */
		const renderPass = new RenderPass(scene, camera)
		renderPass.enabled = true
		this.composer.addPass(renderPass)

		const strength = 0.3
		const radius = 0
		const threshold = 0.3
		/* Add bloom pass */
		const bloom = new UnrealBloomPass(
			new THREE.Vector2(width, height),
			strength,
			radius,
			threshold
		)
		this.composer.addPass(bloom)

		/* Vignette */
		//const vignette = new ShaderPass(VignetteShader)
		//this.composer.addPass(vignette)
	}

	render() {
		this.composer && this.composer.render()
	}
}

customElements.define("pretty-scene", PrettyScene)
