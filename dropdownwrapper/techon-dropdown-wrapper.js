class TechOnDropdownWrapper {
  constructor(element) {
    this.element = element;
    this.trigger = element.querySelector('.to-dropdown-wrapper-trigger');
    this.menu = element.querySelector('.to-dropdown-wrapper-menu');
    this.position = element.dataset.position || 'bottom-left';
    this.width = element.dataset.width || 'm';
    this.radius = element.dataset.radius || 'm';
    this.animated = element.dataset.animated === 'true';
    this.closeOnSelect = element.dataset.closeOnSelect !== 'false';
    this.searchable = element.dataset.searchable === 'true';
    
    this.menu.setAttribute('data-position', this.position);
    this.element.setAttribute('data-width', this.width);
    this.element.setAttribute('data-radius', this.radius);
    this.element.setAttribute('data-animated', this.animated);
    
    this.init();
  }

  init() {
    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    this.menu.addEventListener('click', (e) => {
      const item = e.target.closest('.to-dropdown-wrapper-item');
      if (item && !item.classList.contains('disabled')) {
        this.selectItem(item);
        if (this.closeOnSelect) {
          this.close();
        }
      }
    });

    document.addEventListener('click', (e) => {
      if (!this.element.contains(e.target)) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    if (this.searchable) {
      this.addSearch();
    }
  }

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.element.classList.add('open');
    
    // Adjust position if needed
    const rect = this.menu.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
      this.menu.style.left = 'auto';
      this.menu.style.right = '0';
    }
    
    this.trigger.setAttribute('aria-expanded', 'true');
  }

  close() {
    this.element.classList.remove('open');
    this.trigger.setAttribute('aria-expanded', 'false');
  }

  isOpen() {
    return this.element.classList.contains('open');
  }

  selectItem(item) {
    const oldActive = this.menu.querySelector('.active');
    if (oldActive) {
      oldActive.classList.remove('active');
    }
    
    item.classList.add('active');
    
    const value = item.dataset.value;
    const event = new CustomEvent('dropdown-select', {
      detail: { value: value, element: item }
    });
    this.element.dispatchEvent(event);
  }

  addSearch() {
    const searchDiv = document.createElement('div');
    searchDiv.className = 'to-dropdown-wrapper-search';
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Search...';
    
    input.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const items = this.menu.querySelectorAll('.to-dropdown-wrapper-item');
      
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
    
    searchDiv.appendChild(input);
    this.menu.insertBefore(searchDiv, this.menu.firstChild);
  }

  setPosition(position) {
    this.position = position;
    this.menu.setAttribute('data-position', position);
  }

  addItem(item) {
    const itemEl = document.createElement('div');
    itemEl.className = 'to-dropdown-wrapper-item';
    
    if (item.icon) {
      const iconSpan = document.createElement('span');
      iconSpan.className = 'to-dropdown-wrapper-icon';
      iconSpan.textContent = item.icon;
      itemEl.appendChild(iconSpan);
    }
    
    const textSpan = document.createElement('span');
    textSpan.textContent = item.label;
    itemEl.appendChild(textSpan);
    
    if (item.shortcut) {
      const shortcutSpan = document.createElement('span');
      shortcutSpan.className = 'to-dropdown-wrapper-shortcut';
      shortcutSpan.textContent = item.shortcut;
      itemEl.appendChild(shortcutSpan);
    }
    
    if (item.value) {
      itemEl.dataset.value = item.value;
    }
    
    if (item.disabled) {
      itemEl.classList.add('disabled');
    }
    
    this.menu.appendChild(itemEl);
  }

  addDivider() {
    const divider = document.createElement('div');
    divider.className = 'to-dropdown-wrapper-divider';
    this.menu.appendChild(divider);
  }

  addHeader(text) {
    const header = document.createElement('div');
    header.className = 'to-dropdown-wrapper-header';
    header.textContent = text;
    this.menu.appendChild(header);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-dropdown-wrapper').forEach(dropdown => {
    dropdown.dropdownWrapperInstance = new TechOnDropdownWrapper(dropdown);
  });
});