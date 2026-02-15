class TechOnSegmented {
  constructor(element) {
    this.element = element;
    this.items = Array.from(element.querySelectorAll('.to-segmented-item'));
    this.size = element.dataset.size || 'm';
    this.radius = element.dataset.radius || 'm';
    this.fill = element.dataset.fill === 'true';
    this.vertical = element.dataset.vertical === 'true';
    
    this.element.setAttribute('data-size', this.size);
    this.element.setAttribute('data-radius', this.radius);
    this.element.setAttribute('data-fill', this.fill);
    this.element.setAttribute('data-vertical', this.vertical);
    
    this.init();
  }

  init() {
    this.items.forEach(item => {
      item.addEventListener('click', (e) => {
        if (item.hasAttribute('disabled')) return;
        
        const value = item.dataset.value;
        this.selectItem(item);
        
        // Trigger custom event
        const event = new CustomEvent('segmented-change', {
          detail: { value: value, element: item }
        });
        this.element.dispatchEvent(event);
      });
    });
  }

  selectItem(targetItem) {
    this.items.forEach(item => {
      item.setAttribute('data-selected', item === targetItem);
    });
  }

  selectByValue(value) {
    const item = this.items.find(i => i.dataset.value === value);
    if (item) {
      this.selectItem(item);
    }
  }

  selectByIndex(index) {
    if (index >= 0 && index < this.items.length) {
      this.selectItem(this.items[index]);
    }
  }

  getSelected() {
    return this.items.find(i => i.dataset.selected === 'true');
  }

  setSize(size) {
    this.size = size;
    this.element.setAttribute('data-size', size);
  }

  setRadius(radius) {
    this.radius = radius;
    this.element.setAttribute('data-radius', radius);
  }

  addItem(data) {
    const item = document.createElement('button');
    item.className = 'to-segmented-item';
    item.dataset.value = data.value;
    
    if (data.icon) {
      const iconSpan = document.createElement('span');
      iconSpan.className = 'to-icon';
      iconSpan.textContent = data.icon;
      item.appendChild(iconSpan);
    }
    
    if (data.label) {
      item.appendChild(document.createTextNode(data.label));
    }
    
    if (data.selected) {
      item.dataset.selected = 'true';
    }
    
    if (data.disabled) {
      item.setAttribute('disabled', '');
    }
    
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
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-segmented').forEach(segmented => {
    segmented.segmentedInstance = new TechOnSegmented(segmented);
  });
});