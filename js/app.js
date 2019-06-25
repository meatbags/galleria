import Nav from './ui/nav';

class App {
  constructor() {
    this.nav = new Nav();
  }
}

window.onload = () => {
  const app = new App();
};
