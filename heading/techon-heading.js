class TechOnHeading {
  constructor(element) {
    this.element = element;
    this.level = element.dataset.level || '1';
    this.weight = element.dataset.weight || 'bold';
    this.align = element.dataset.align || 'left';
    this.color = element.dataset.color || 'default';
    this.transform = element.dataset.transform || 'none';
    this.truncate = element.dataset.truncate === 'true';
    
    this.element.setAttribute('data-level', this.level);
    this.element.setAttribute('data-weight', this.weight);
    this.element.setAttribute('data-align', this.align);
    this.element.setAttribute('data-color', this.color);
    this.element.setAttribute('data-transform', this.transform);
    this.element.setAttribute('data-truncate', this.truncate);
    
    this.setTag();
  }

  setTag() {
    const tagName = `h${this.level}`;
    const newElement = document.createElement(tagName);
    
    while (this.element.firstChild) {
      newElement.appendChild(this.element.firstChild);
    }
    
    newElement.className = this.element.className;
    Array.from(this.element.attributes).forEach(attr => {
      if (attr.name !== 'class') {
        newElement.setAttribute(attr.name, attr.value);
      }
    });
    
    this.element.parentNode.replaceChild(newElement, this.element);
    this.element = newElement;
  }

  setLevel(level) {
    this.level = level;
    this.element.setAttribute('data-level', level);
    this.setTag();
  }

  setWeight(weight) {
    this.weight = weight;
    this.element.setAttribute('data-weight', weight);
  }

  setAlign(align) {
    this.align = align;
    this.element.setAttribute('data-align', align);
  }

  setColor(color) {
    this.color = color;
    this.element.setAttribute('data-color', color);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-heading').forEach(heading => {
    heading.headingInstance = new TechOnHeading(heading);
  });
});