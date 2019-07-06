/** App entry */

import Nav from './ui/nav';
import Logo from './ui/logo';
import Gallery from './modules/gallery';

class App {
  constructor() {
    this.modules = {
      gallery: new Gallery(),
      logo: new Logo(),
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
