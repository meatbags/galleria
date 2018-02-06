import { Timer } from './modules/performance';
import { Scene } from './modules/scene';

class App {
	constructor() {
		// main app

		this.mode = (window.location.port === '8080') ? 'dev' : 'production';
		this.setSize();

		// set up scene

		this.timer = new Timer();
		this.scene = new Scene(this.width, this.height, '.canvas-target');

		// set up controls, events

		this.events();

		// set, go to loading screen

		this.resize();
		this.loading();
	}

	setSize() {
		// set size

		this.width = (window.innerWidth > 900) ? Math.max(900, window.innerWidth - 256) : window.innerWidth;
		this.height = (window.innerHeight > 450) ? Math.max(450, window.innerHeight - 256) : window.innerHeight;
	}
	
	resize() {
		// resize canvas, nav

		this.setSize();
		const top = window.innerHeight / 2 - this.height / 2;
		const left = window.innerWidth / 2 - this.width / 2;

		// reposition doc

		$('.content').css({top: `${top}px`, left: `${left}px`});
		$('.menu').css({top:`${top}px`, right: `${left}px`});
		$('.label').css({bottom: `${top}px`, right: `${left}px`})

		// resize scene

		this.scene.resize(this.width, this.height);
	}

	events() {
		// menu events

		$('.close-menu').on('click', () => {
			$('.menu-about').addClass('hidden');
			$('.menu, .label').removeClass('hidden');
		});

		$('.open-menu').on('click', () => {
			$('.menu-about').removeClass('hidden');
			$('.menu, .label').addClass('hidden');
		});

		// on resize

		$(window).on('resize', () => { this.resize(); });

		// pause, resume on blur

		$(window).on('focus', () => {
			if (this.paused) {
				this.paused = false;
				this.timer.reset();
				this.loop();
			}
		});

		$(window).on('blur', () => {
			this.paused = true;
		});
	}

	loading() {
		// wait while loading
 		//this.mode != 'dev'
		if (!this.scene.isLoaded()) {
			requestAnimationFrame(() => { this.loading(); });
		} else {
			$('.loading').addClass('hidden');
			this.timer.reset();
			this.loop();
		}
	}

	loop() {
		// main loop

		if (!this.paused) {
			requestAnimationFrame(() => { this.loop(); });

			this.timer.update();
			const delta = this.timer.getDelta();

			this.scene.update(delta);
			this.scene.render(delta);
		}
	}
}

window.onload = () => { const app = new App(); };
