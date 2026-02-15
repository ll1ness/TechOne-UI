class TechOnButton {
  constructor(element) {
    this.element = element;
    this.variant = element.dataset.variant || 'primary';
    this.size = element.dataset.size || 'm';
    this.fillWidth = element.dataset.fillWidth === 'true';
    
    this.element.setAttribute('data-variant', this.variant);
    this.element.setAttribute('data-size', this.size);
    this.element.setAttribute('data-fill-width', this.fillWidth);
  }

  setVariant(variant) {
    this.variant = variant;
    this.element.setAttribute('data-variant', variant);
  }

  setSize(size) {
    this.size = size;
    this.element.setAttribute('data-size', size);
  }

  setFillWidth(fillWidth) {
    this.fillWidth = fillWidth;
    this.element.setAttribute('data-fill-width', fillWidth);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-button').forEach(button => {
    button.buttonInstance = new TechOnButton(button);
  });
});