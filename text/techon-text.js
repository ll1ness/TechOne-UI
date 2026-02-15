class TechOnText {
  constructor(element) {
    this.element = element;
    this.size = element.dataset.size || 'm';
    this.weight = element.dataset.weight || 'regular';
    this.align = element.dataset.align || 'left';
    this.color = element.dataset.color || 'default';
    this.transform = element.dataset.transform || 'none';
    this.decoration = element.dataset.decoration || 'none';
    this.truncate = element.dataset.truncate === 'true';
    this.nowrap = element.dataset.nowrap === 'true';
    
    this.element.setAttribute('data-size', this.size);
    this.element.setAttribute('data-weight', this.weight);
    this.element.setAttribute('data-align', this.align);
    this.element.setAttribute('data-color', this.color);
    this.element.setAttribute('data-transform', this.transform);
    this.element.setAttribute('data-decoration', this.decoration);
    this.element.setAttribute('data-truncate', this.truncate);
    this.element.setAttribute('data-nowrap', this.nowrap);
  }

  setSize(size) {
    this.size = size;
    this.element.setAttribute('data-size', size);
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

  setText(text) {
    this.element.textContent = text;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-text').forEach(text => {
    text.textInstance = new TechOnText(text);
  });
});