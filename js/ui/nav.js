/** Navigation */

class Nav {
  constructor() {
    this.el = {
      navItems: document.querySelectorAll('.nav__item'),
    };

    // bind nav
    this.el.navItems.forEach(el => {
      el.addEventListener('click', () => {
        if (el.dataset.target) {
          const target = document.querySelector(el.dataset.target);
          console.log(target);
          if (target) {
            document.querySelectorAll('.page.active').forEach(el => { el.classList.remove('active'); });
            target.classList.add('active');
          }
        }
      });
    })
  }
}

export default Nav;
