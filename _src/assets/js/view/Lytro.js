import { Camera, LinearFilter, LoadingManager, Mesh, PlaneGeometry, Scene, ShaderMaterial, TextureLoader, Vector2, WebGLRenderer, WebGLRenderTarget } from 'three'
import lfpVert from '../shader/lfp.vert';
import lfpFrag from '../shader/lfp.frag';

// these settings are for Lytro Desktop version 4.
const offsetSetings = [
	new Vector2(0,0),
	new Vector2(-0.34641015529632568359,0.20000000298023223877),
	new Vector2(0,-0.40000000596046447754),
	new Vector2(-0.34641015529632568359,-0.20000000298023223877),
	new Vector2(0,0.40000000596046447754),
	new Vector2(0.34641015529632568359,-0.20000000298023223877),
	new Vector2(0.34641015529632568359,0.20000000298023223877),
]

const shiftSettings = {
	min: 0.016,
	max: 0.001
}

export default class Lytro {
	/**
	 * Constructor
	 */
	constructor(path, container) {
		this.path = path
		this.container = container
		this._shift = 0
	}

	/**
	 * getter & setter for shift
	 */
	get shift() {
		return this._shift
	}

	set shift(value) {
		this._shift = value
		this.uniforms.shift.value = shiftSettings.min + this._shift * (shiftSettings.max - shiftSettings.min)
	}

	/**
	 * load images
	 */
	load(callback) {
		this.stacks = []
		this.loadingManager = new LoadingManager(callback, this.onLoadingProgres.bind(this))
		for (let i=0; i<=6; i++) {
			const path = this.path+'/stack.image_0'+i+'.jpg'
			const stack = new TextureLoader(this.loadingManager).load(path)
			this.stacks.push(stack)
		}
	}

	/**
	 * on loading progress changed
	 * @param {*} item
	 * @param {Number} loaded
	 * @param {Number} total
	 */
	onLoadingProgres(item, loaded, total) {
		console.log('lytro loaded '+Math.round((loaded/total)*100)+'%')
	}

	/**
	 * setup
	 */
	setup() {
		this.camera = new Camera()
		this.camera.position.z = 1
		this.scene = new Scene()
		this.width = this.stacks[0].image.width
		this.height = this.stacks[0].image.height
		this.aspectRatio = this.width / this.height
		// frame buffer
		this.bufferTexture = new WebGLRenderTarget( this.width, this.height, {
			minFilter: LinearFilter,
			stencilBuffer: false,
			depthBuffer: false
		})
		// material
		this.uniforms = {
			stack0 : { type: "t", value: this.stacks[0] },
			stack1 : { type: "t", value: this.stacks[1] },
			stack2 : { type: "t", value: this.stacks[2] },
			stack3 : { type: "t", value: this.stacks[3] },
			stack4 : { type: "t", value: this.stacks[4] },
			stack5 : { type: "t", value: this.stacks[5] },
			stack6 : { type: "t", value: this.stacks[6] },
			stackUv0 : { type: "v2", value: new Vector2(offsetSetings[0].x, offsetSetings[0].y)},
			stackUv1 : { type: "v2", value: new Vector2(offsetSetings[1].x, offsetSetings[1].y)},
			stackUv2 : { type: "v2", value: new Vector2(offsetSetings[2].x, offsetSetings[2].y)},
			stackUv3 : { type: "v2", value: new Vector2(offsetSetings[3].x, offsetSetings[3].y)},
			stackUv4 : { type: "v2", value: new Vector2(offsetSetings[4].x, offsetSetings[4].y)},
			stackUv5 : { type: "v2", value: new Vector2(offsetSetings[5].x, offsetSetings[5].y)},
			stackUv6 : { type: "v2", value: new Vector2(offsetSetings[6].x, offsetSetings[6].y)},
			shift: { type: "f", value: 0.0 },
			aspectRatio: { type: "f", value: this.aspectRatio },
			resolution: { type: "v2", value: new Vector2() }
		}
		this.uniforms.stackUv0.value.x /= -this.aspectRatio
		this.uniforms.stackUv1.value.x /= -this.aspectRatio
		this.uniforms.stackUv2.value.x /= -this.aspectRatio
		this.uniforms.stackUv3.value.x /= -this.aspectRatio
		this.uniforms.stackUv4.value.x /= -this.aspectRatio
		this.uniforms.stackUv5.value.x /= -this.aspectRatio
		this.uniforms.stackUv6.value.x /= -this.aspectRatio
		this.material = new ShaderMaterial({
			uniforms: this.uniforms,
			vertexShader: lfpVert,
			fragmentShader: lfpFrag
		})
		// mesh
		this.mesh = new Mesh(new PlaneGeometry(2, 2), this.material)
		this.scene.add(this.mesh)
		// renderer
		this.renderer = new WebGLRenderer()
		// dom
		this.container.appendChild(this.renderer.domElement)
		// size
		this.setSize(640, 640)
	}


	/**
	 * on resize
	 */
	 setSize(w, h) {
		this.uniforms.resolution.value.x = w
		this.uniforms.resolution.value.y = h
		this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1)
		this.renderer.setSize(w, h, false)
		this.update()
	}

	/**
	 * update
	 */
	update() {
		this.render()
	}

	/**
	 * render
	 */
	render() {
		this.mesh.material = this.material
		this.renderer.setRenderTarget(null)
		this.renderer.render(this.scene, this.camera)
		this.renderer.render(this.scene, this.camera)
	}
}
