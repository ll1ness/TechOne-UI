class TechOnDropdown {
  constructor(element) {
    this.element = element;
    this.trigger = element.querySelector('.to-dropdown-trigger');
    this.menu = element.querySelector('.to-dropdown-menu');
    this.items = Array.from(element.querySelectorAll('.to-dropdown-item'));
    this.position = element.dataset.position || 'left';
    this.open = element.dataset.open === 'true';
    
    this.menu.setAttribute('data-position', this.position);
    this.element.setAttribute('data-open', this.open);
    
    this.init();
  }

  init() {
    if (this.trigger) {
      this.trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }

    this.items.forEach(item => {
      item.addEventListener('click', (e) => {
        const value = item.dataset.value;
        const disabled = item.dataset.disabled === 'true';
        
        if (!disabled) {
          this.selectItem(item);
          this.close();
          
          const event = new CustomEvent('dropdown-select', {
            detail: { value: value, element: item }
          });
          this.element.dispatchEvent(event);
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!this.element.contains(e.target)) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.open) {
        this.close();
      }
    });
  }

  toggle() {
    this.open = !this.open;
    this.element.setAttribute('data-open', this.open);
  }

  open() {
    this.open = true;
    this.element.setAttribute('data-open', true);
  }

  close() {
    this.open = false;
    this.element.setAttribute('data-open', false);
  }

  selectItem(item) {
    this.items.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  }

  setPosition(position) {
    this.position = position;
    this.menu.setAttribute('data-position', position);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-dropdown').forEach(dropdown => {
    dropdown.dropdownInstance = new TechOnDropdown(dropdown);
  });
});