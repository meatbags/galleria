import { Timer } from './modules/performance';
import { Scene } from './modules/scene';

class App {
	constructor() {
		// main app

		this.mode = (window.location.port === '8080') ? 'dev' : 'production';
		this.timer = new Timer();
		this.scene = new Scene();

		// set up controls, events

		this.events();

		// set, go to loading screen

		this.resize();
		$('.pre-loading').fadeOut(1000);
		this.loading();
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
			this.loop();
		});

		$(window).on('blur', () => {
			this.paused = true;
		});
	}

	resize() {
		// resize canvas, nav

		const width = Math.floor(window.innerWidth / 2);
		const height = 520;

		this.scene.resize(width, height);
		$('.nav').css({top: `${window.innerHeight / 2 + height / 2}px`});
	}

	loading() {
		// wait while loading

		this.timer.update();

		if (!this.scene.isLoaded() && this.mode != 'dev') {
			requestAnimationFrame(() => { this.loading(); });
		} else {
			$('#nav-default').removeClass('hidden');
			$('.loading').fadeOut(1000);
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
