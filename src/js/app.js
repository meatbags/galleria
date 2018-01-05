/**
 * @author meatbags / https://github.com/meatbags
**/

import { Timer } from './modules/performance';
import { Scene } from './modules/scene';

const App = {
	init: function() {
		App.mode = (window.location.port === '8080') ? 'dev' : 'production';
		App.timer = new Timer();
		App.scene = new Scene();

		// setup
		App.bindControls();
		App.resize();
		App.fadeOut('.pre-loading');
		App.loading();
	},

	loading: function() {
		App.timer.update();

		if (!App.scene.isLoaded() && App.mode != 'dev') {
			requestAnimationFrame(App.loading);
		} else {
			App.fadeIn('#nav-default');
			App.fadeOut('.loading');
			App.loop();
		}
	},

	bindControls: function() {
		$('.nav-menu').on('click', function() {
			const target = $(this).data('menu');
			App.toggleMenu(target);
		});
		$('.menu-close').on('click', function() {
			const target = $(this).data('menu');
			App.closeMenu(target);
		});
		window.addEventListener('resize', App.resize);
	},

	resize: function() {
		const top = $('canvas').offset().top + $('canvas').height();
		$('.nav').css({top: top + 'px'});
		App.scene.resize();
	},

	toggleMenu: function(selector) {
		if ($(selector).hasClass('hidden')) {
			$('.menu').each(function(i, e){
				$(e).removeClass('active');
				if (!$(e).hasClass('hidden')) {
					$(e).addClass('hidden');
				}
			});
			$(selector).removeClass('hidden');
			$(selector).addClass('active');
		} else {
			App.closeMenu(selector);
		}
	},

	closeMenu: function(selector) {
		if (!$(selector).hasClass('hidden')) {
			$(selector).addClass('hidden');
		}
		$(selector).removeClass('active');
	},

	fadeIn: function(selector) {
		$(selector).removeClass('hidden');
	},

	fadeOut: function(selector) {
		$(selector).addClass('hidden');
		setTimeout(function(){
			$(selector).remove();
		}, 1000);
	},

	loop: function() {
		requestAnimationFrame(App.loop);
		const delta = App.timer.getDelta();
		App.timer.update();
		App.scene.update(delta);
		App.scene.render(delta);
	}
};

window.onload = App.init;
