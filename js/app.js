/** App entry */

import Nav from './ui/nav';
import Gallery from './modules/gallery';

class App {
  constructor() {
    this.modules = {
      gallery: new Gallery(),
      nav: new Nav(),
    };

    Object.keys(this.modules).forEach(key => {
      this.modules[key].bind(this);
    });
  }
}

window.onload = () => {
  const app = new App();
};
