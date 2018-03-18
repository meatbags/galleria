import { Timer } from './modules/performance';
import { Scene } from './modules/scene';

class App {
	constructor() {
		// main app
		this.mode = (window.location.port === '8080') ? 'dev' : 'production';
		this.setSize();
		this.timer = new Timer();
		this.scene = new Scene(this.width, this.height, '.canvas-target');
		this.events();
		this.resize();
		this.loading();
	}

	setSize() {
		// set size
		this.width = window.innerWidth;
		this.height = (window.innerHeight > 450) ? Math.max(450, window.innerHeight - 256) : window.innerHeight;
		this.top = window.innerHeight / 2 - this.height / 2;
		this.left = window.innerWidth / 2 - this.width / 2;
	}

	resize() {
		// resize canvas, nav
		this.setSize();

		// set doc
		$('.content').css({top: `${this.top}px`, left: `${this.left}px`});
		$('.menu').css({top:`${this.top}px`, right: `${this.left}px`});
		$('.label').css({bottom: `${this.top}px`, right: `${this.left}px`})

		// resize sce
		this.scene.resize(this.width, this.height);
	}

	events() {
		// menu
		$('.close-menu').on('click', () => {
			$('.menu-about').addClass('hidden');
			$('.menu, .label').removeClass('hidden');
		});

		$('.open-menu').on('click', () => {
			$('.menu-about').removeClass('hidden');
			$('.menu, .label').addClass('hidden');
		});

		// resize
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
		// wait while loading, this.mode != 'dev'
		if (!this.scene.isLoaded()) {
			requestAnimationFrame(() => { this.loading(); });
		} else {
			$('.loading').addClass('hidden');
			this.timer.reset();
			this.loop();
		}
	}

	loop() {
		// main app loop
		if (!this.paused) {
			if (!this.loopGuard) {
        // prevent async looping
        this.loopGuard = true;
        requestAnimationFrame(() => {
          this.loopGuard = false;
          this.loop();
        });
      }
			this.timer.update();
			const delta = this.timer.getDelta();
			this.scene.update(delta);
			this.scene.render(delta);
		}
	}
}

window.onload = () => { const app = new App(); };
