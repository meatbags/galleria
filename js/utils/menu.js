/**
 * Hook up menus.
 **/

class Menu {
  constructor() {
    // hook up menus
    document.querySelectorAll('.nav-menu .item').forEach(item => {
      item.onclick = () => { this.toggleMenu(item); };
    });
    document.querySelectorAll('.close-menu').forEach(item => {
      item.onclick = () => { this.closeMenu(item); };
    });
  }

  closeMenu(item) {
    const target = document.querySelector(item.dataset.selector);
    if (target) {
      target.classList.remove('active');
    }
  }

  toggleMenu(item) {
    const target = document.querySelector(item.dataset.selector);
    const open = target && target.classList.contains('active');
    document.querySelectorAll('.menu').forEach(e => { e.classList.remove('active'); });
    if (!open && target) {
      target.classList.add('active');
    }
  }
}

export { Menu };
