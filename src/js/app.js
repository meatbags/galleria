/**
 * @author meatbags / https://github.com/meatbags
*/

import Timer from './modules/Timer';
import Scene from './modules/Scene';

const App = {
	init: function() {
		App.timer = new Timer();
		App.scene = new Scene();
		App.loading();
	},

	loading: function() {
		App.timer.update();

		if (!App.scene.isLoaded()) {
			requestAnimationFrame(App.loading);
		} else {
			App.loop();
		}
	},

	loop: function() {
		requestAnimationFrame(App.loop);
		App.timer.update();
		App.scene.update(App.timer.getDelta());
		App.scene.render();
	}
};

window.onload = App.init;
