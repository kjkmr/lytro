import Lytro from "./view/Lytro"
import Real from "./view/Real"
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import gsap from "gsap/gsap-core";

class App{
	constructor(){
		// content
		this.needsUpdate = false;
		this.lytro = new Lytro('./assets/images/lytro', document.getElementById('lytro'));
		this.real = new Real('./assets/images/real', document.getElementById('real'));
		// load
		this.load()
	}

	load() {
		this.lytro.load(() =>{
			this.real.load(() => {
				this.setup()
			})
		})
	}

	onClickScroll() {
		if (this.scrollTween) this.scrollTween.kill()
		const focus = this.params.focus == 0.0 ? 1.0 : 0.0
		this.scrollTween = gsap.to(this.params, {'focus': focus, duration:1.5, ease:'expo.inOut', onUpdate: this.updateParams.bind(this) })
	}

	setup() {

		// stats
		this.stats = new Stats()
		this.stats.showPanel(0)
		document.body.appendChild(this.stats.dom)
		// gui
		this.params = {
			focus: 0.0,
		}
		this.gui = new GUI()
		this.gui.add(this.params, 'focus', 0, 1.0).step(0.001).onChange(this.updateParams.bind(this)).listen()
		this.gui.add({
			'scroll': this.onClickScroll.bind(this)
		}, 'scroll')

		this.updateParams()
		this.update()
	}

	updateParams() {
		this.lytro.shift = this.params.focus
		this.real.shift = this.params.focus
		this.needsUpdate = true
	}

	update() {
		this.stats.begin()
		window.requestAnimationFrame(this.update.bind(this))
		if (this.needsUpdate) {
			this.lytro.update()
			this.real.update()
			this.needsUpdate = false
		}
		this.stats.end()
	}
}

window.onload = function(){
	new App();
	document.querySelector('body').classList.remove('loading')
}