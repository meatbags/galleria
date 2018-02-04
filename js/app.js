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
		$('.pre-loading').fadeOut(1000);
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
		this.scene.resize(this.width, this.height);
		$('.nav').css({top: `${window.innerHeight / 2 + this.height / 2}px`});
		const top = window.innerHeight / 2 - this.height / 2 - 56;
		const left = window.innerWidth / 2 - this.width / 2 - 56;
		$('.content').css({top: `${top}px`, left: `${left}px`});
	}

	events() {
		// doc events
		// open, close menu

		$('.nav-menu').on('click', (e) => {
			const $target = $($(e.currentTarget).data('menu'));

			if ($target.hasClass('hidden')) {
				$('.menu').removeClass('active').addClass('hidden');
				$target.addClass('active').removeClass('hidden');
			} else {
				$('.menu').removeClass('active').addClass('hidden');
			}
		});

		$('.menu-close').on('click', () => {
			$('.menu').removeClass('active').addClass('hidden');
		});

		// on resize

		$(window).on('resize', () => { this.resize(); });

		// pause, resume

		$(window).on('focus', () => {
			this.paused = false;
			this.timer.reset();
			this.loop();
		});

		$(window).on('blur', () => {
			this.paused = true;
		});
	}

	loading() {
		// wait while loading

		this.timer.update();

		if (!this.scene.isLoaded() && this.mode != 'dev') {
			requestAnimationFrame(() => { this.loading(); });
		} else {
			$('#nav-default').removeClass('hidden');
			$('.loading').fadeOut(500);
			this.loop();
		}
	}

	loop() {
		// main loop

		if (!this.paused) {
			requestAnimationFrame(() => { this.loop(); });

			const delta = this.timer.getDelta();

			this.timer.update();
			this.scene.update(delta);
			this.scene.render(delta);
		}
	}
}

window.onload = () => { const app = new App(); };
