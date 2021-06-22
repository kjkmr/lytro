import Lytro from "./view/Lytro"
import Real from "./view/Real"
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import gsap from "gsap/gsap-core";

class App{
	constructor(){
		// content
		this.needsUpdate = false;
		this.lytro1 = new Lytro('./assets/images/lytro1', document.getElementById('lytro'), 0.016, 0.001);
		this.lytro2 = new Lytro('./assets/images/lytro2', document.getElementById('lytro'), -0.004, -0.011);
		this.real1 = new Real('./assets/images/real1', document.getElementById('real'));
		this.real2 = new Real('./assets/images/real2', document.getElementById('real'));
		// load
		this.load()
	}

	load() {
		this.lytro1.load(() =>{
			this.lytro2.load(() =>{
				this.real1.load(() => {
					this.real2.load(() => {
						this.setup()
					})
				})
			})
		})
	}

	onClickScroll(duration=1.0) {
		if (this.scrollTween) this.scrollTween.kill()
		const focus = this.params.focus == 0.0 ? 1.0 : 0.0
		this.scrollTween = gsap.to(this.params, {'focus': focus, duration:duration, ease:'cubic.inOut', onUpdate: this.updateParams.bind(this) })
	}

	setup() {

		this.lytro2.setup()
		this.lytro1.setup()
		this.real2.setup()
		this.real1.setup()

		// stats
		this.stats = new Stats()
		this.stats.showPanel(0)
		document.body.appendChild(this.stats.dom)
		// gui
		this.params = {
			focus: 1.0,
		}
		this.gui = new GUI()
		this.gui.add(this.params, 'focus', 0, 1.0).step(0.001).onChange(this.updateParams.bind(this)).listen()
		this.gui.add({
			'scroll': this.onClickScroll.bind(this)
		}, 'scroll')

		this.updateParams()
		this.update()
		this.onClickScroll(3)
		document.querySelector('body').classList.remove('loading')
	}

	updateParams() {
		this.lytro1.shift = this.params.focus
		this.lytro2.shift = this.params.focus
		this.real1.shift = this.params.focus
		this.real2.shift = this.params.focus
		this.needsUpdate = true
	}

	update() {
		this.stats.begin()
		window.requestAnimationFrame(this.update.bind(this))
		if (this.needsUpdate) {
			this.lytro1.update()
			this.lytro2.update()
			this.real1.update()
			this.real2.update()
			this.needsUpdate = false
		}
		this.stats.end()
	}
}

window.onload = function(){
	new App();
}