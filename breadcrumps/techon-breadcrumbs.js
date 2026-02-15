class TechOnBreadcrumbs {
  constructor(element) {
    this.element = element;
    this.items = Array.from(element.querySelectorAll('.to-breadcrumbs-item'));
    this.size = element.dataset.size || 'm';
    this.separator = element.dataset.separator || 'slash';
    
    this.element.setAttribute('data-size', this.size);
    this.element.setAttribute('data-separator', this.separator);
    
    this.init();
  }

  init() {
    // Add separators between items
    for (let i = this.items.length - 1; i > 0; i--) {
      const separator = document.createElement('span');
      separator.className = 'to-breadcrumbs-separator';
      this.element.insertBefore(separator, this.items[i]);
    }
    
    // Add click handlers for non-active items
    this.items.forEach(item => {
      if (!item.hasAttribute('data-active') && item.tagName === 'A') {
        item.addEventListener('click', (e) => {
          if (item.getAttribute('href') === '#') {
            e.preventDefault();
          }
        });
      }
    });
  }

  setSize(size) {
    this.size = size;
    this.element.setAttribute('data-size', size);
  }

  setSeparator(separator) {
    this.separator = separator;
    this.element.setAttribute('data-separator', separator);
  }

  updateItems(newItems) {
    // Remove all children
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
    
    // Add new items
    newItems.forEach((item, index) => {
      const itemEl = document.createElement(item.href ? 'a' : 'span');
      itemEl.className = 'to-breadcrumbs-item';
      
      if (item.href) {
        itemEl.href = item.href;
      }
      
      if (item.active) {
        itemEl.setAttribute('data-active', 'true');
      }
      
      if (item.icon) {
        const iconSpan = document.createElement('span');
        iconSpan.className = 'to-icon';
        iconSpan.textContent = item.icon;
        itemEl.appendChild(iconSpan);
      }
      
      if (item.label) {
        itemEl.appendChild(document.createTextNode(item.label));
      }
      
      this.element.appendChild(itemEl);
      
      // Add separator if not last
      if (index < newItems.length - 1) {
        const separator = document.createElement('span');
        separator.className = 'to-breadcrumbs-separator';
        this.element.appendChild(separator);
      }
    });
    
    this.items = Array.from(this.element.querySelectorAll('.to-breadcrumbs-item'));
    this.init();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-breadcrumbs').forEach(breadcrumbs => {
    breadcrumbs.breadcrumbsInstance = new TechOnBreadcrumbs(breadcrumbs);
  });
});