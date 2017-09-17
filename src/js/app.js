/**
 * @author meatbags / https://github.com/meatbags
*/

import Timer from './modules/Timer';
import Scene from './modules/Scene';

const App = {
	init: function() {
		App.timer = new Timer();
		App.scene = new Scene();
		App.loop();
	},

	loop: function() {
		requestAnimationFrame(App.loop);
		App.timer.update();
		App.scene.update(App.timer.getDelta());
		App.scene.render();
	}
};

window.onload = App.init;
