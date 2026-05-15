// TechOn Dropdown Component
class TechOnDropdown {
  constructor(element) {
    this.element = element;
    this.trigger = element.querySelector('.to-dropdown-trigger');
    this.menu = element.querySelector('.to-dropdown-menu');
    this.open = false;

    this.element.setAttribute('data-open', 'false');

    if (this.trigger) {
      this.trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }

    document.addEventListener('click', (e) => {
      if (!this.element.contains(e.target) && this.open) {
        this.close();
      }
    });
  }

  toggle() {
    this.open = !this.open;
    this.element.setAttribute('data-open', this.open ? 'true' : 'false');
  }

  close() {
    this.open = false;
    this.element.setAttribute('data-open', 'false');
  }

  selectItem(item) {
    const value = item.textContent.trim();
    const valueEl = this.trigger?.querySelector('.to-dropdown-value');
    if (valueEl) valueEl.textContent = value;
    this.close();
  }
}