/**
 * @author meatbags / https://github.com/meatbags
*/

import Timer from './modules/Timer';
import Scene from './modules/Scene';

const App = {
	init: function() {
		App.fadeOut('.pre-loading');
		App.timer = new Timer();
		App.scene = new Scene();
		App.bindControls();
		App.resize();
		App.loading();
	},

	loading: function() {
		App.timer.update();

		if (!App.scene.isLoaded()) {
			requestAnimationFrame(App.loading);
		} else {
			App.fadeIn('.nav__links');
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
		App.timer.update();
		App.scene.update(App.timer.getDelta());
		App.scene.render();
	}
};

window.onload = App.init;
