import { Camera, LinearFilter, LoadingManager, Mesh, PlaneGeometry, Scene, ShaderMaterial, TextureLoader, Vector2, WebGLRenderer, WebGLRenderTarget } from 'three'
import realVert from '../shader/real.vert';
import realFrag from '../shader/real.frag';


const shiftSettings = {
	min: 0.0,
	max: 7.0
}
export default class Real {
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
		this.loadingManager = new LoadingManager(() => {
			this.setup()
			callback()
		}, this.onLoadingProgres.bind(this))
		for (let i=0; i<=7; i++) {
			const path = this.path+'/0'+i+'.jpg'
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
		console.log('real loaded '+Math.round((loaded/total)*100)+'%')
	}

	/**
	 * setup
	 */
	setup() {
		console.log('real setup')
		this.camera = new Camera()
		this.camera.position.z = 1
		this.scene = new Scene()
		console.log(this.stacks[0])
		this.width = this.stacks[0].image.width
		this.height = this.stacks[0].image.height
		this.aspectRatio = this.width / this.height
		// material
		this.uniforms = {
			stack0 : { type: "t", value: this.stacks[0] },
			stack1 : { type: "t", value: this.stacks[1] },
			stack2 : { type: "t", value: this.stacks[2] },
			stack3 : { type: "t", value: this.stacks[3] },
			stack4 : { type: "t", value: this.stacks[4] },
			stack5 : { type: "t", value: this.stacks[5] },
			stack6 : { type: "t", value: this.stacks[6] },
			stack7 : { type: "t", value: this.stacks[7] },
			shift: { type: "f", value: 0.0 },
			aspectRatio: { type: "f", value: this.aspectRatio },
			resolution: { type: "v2", value: new Vector2() }
		}
		this.material = new ShaderMaterial({
			uniforms: this.uniforms,
			vertexShader: realVert,
			fragmentShader: realFrag
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
		console.log('real.render')
		this.mesh.material = this.material
		this.renderer.render(this.scene, this.camera)
	}
}
