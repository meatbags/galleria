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
		App.loading();
	},

	loading: function() {
		App.timer.update();

		if (!App.scene.isLoaded()) {
			requestAnimationFrame(App.loading);
		} else {
			App.fadeOut('.loading');
			App.loop();
		}
	},

	fadeOut: function(selector) {
		$(selector).addClass('hidden');
		setTimeout(function(){
			$(selector).remove();
		}, 750);
	},

	loop: function() {
		requestAnimationFrame(App.loop);
		App.timer.update();
		App.scene.update(App.timer.getDelta());
		App.scene.render();
	}
};

window.onload = App.init;
