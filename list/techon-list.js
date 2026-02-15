class TechOnList {
  constructor(element) {
    this.element = element;
    this.type = element.dataset.type || 'unordered';
    this.size = element.dataset.size || 'm';
    this.divided = element.dataset.divided === 'true';
    this.hover = element.dataset.hover === 'true';
    this.striped = element.dataset.striped === 'true';
    this.bordered = element.dataset.bordered === 'true';
    this.radius = element.dataset.radius || 'm';
    this.variant = element.dataset.variant || 'default';
    this.items = Array.from(element.querySelectorAll('.to-list-item'));
    
    this.element.setAttribute('data-type', this.type);
    this.element.setAttribute('data-size', this.size);
    this.element.setAttribute('data-divided', this.divided);
    this.element.setAttribute('data-hover', this.hover);
    this.element.setAttribute('data-striped', this.striped);
    this.element.setAttribute('data-bordered', this.bordered);
    this.element.setAttribute('data-radius', this.radius);
    this.element.setAttribute('data-variant', this.variant);
    
    this.init();
  }

  init() {
    if (this.type === 'unordered' || this.type === 'ordered') {
      // Let browser handle native list styling
      return;
    }
    
    this.items.forEach((item, index) => {
      if (!item.querySelector('.to-list-item-marker') && this.type !== 'none') {
        const marker = document.createElement('span');
        marker.className = 'to-list-item-marker';
        
        if (this.type === 'icon' && item.dataset.icon) {
          marker.innerHTML = item.dataset.icon;
        } else if (this.type === 'number') {
          marker.textContent = `${index + 1}.`;
        } else {
          marker.innerHTML = '•';
        }
        
        const content = document.createElement('span');
        content.className = 'to-list-item-content';
        
        while (item.firstChild) {
          content.appendChild(item.firstChild);
        }
        
        item.appendChild(marker);
        item.appendChild(content);
      }
    });
  }

  addItem(text, icon) {
    const item = document.createElement('li');
    item.className = 'to-list-item';
    
    if (icon) {
      item.dataset.icon = icon;
    }
    
    const content = document.createElement('span');
    content.className = 'to-list-item-content';
    content.textContent = text;
    item.appendChild(content);
    
    this.element.appendChild(item);
    this.items.push(item);
    this.init();
  }

  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      this.items[index].remove();
      this.items.splice(index, 1);
    }
  }

  setType(type) {
    this.type = type;
    this.element.setAttribute('data-type', type);
    this.element.innerHTML = '';
    this.items = [];
    this.init();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-list').forEach(list => {
    list.listInstance = new TechOnList(list);
  });
});