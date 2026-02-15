class TechOnCard {
  constructor(element) {
    this.element = element;
    this.variant = element.dataset.variant || 'default';
    this.radius = element.dataset.radius || 'm';
    this.padding = element.dataset.padding || 'm';
    this.hover = element.dataset.hover === 'true';
    this.clickable = element.dataset.clickable === 'true';
    
    this.element.setAttribute('data-variant', this.variant);
    this.element.setAttribute('data-radius', this.radius);
    this.element.setAttribute('data-padding', this.padding);
    this.element.setAttribute('data-hover', this.hover);
    this.element.setAttribute('data-clickable', this.clickable);
    
    this.init();
  }

  init() {
    if (this.clickable) {
      this.element.addEventListener('click', (e) => {
        if (this.element.dataset.href) {
          window.location.href = this.element.dataset.href;
        }
      });
    }
  }

  setVariant(variant) {
    this.variant = variant;
    this.element.setAttribute('data-variant', variant);
  }

  setRadius(radius) {
    this.radius = radius;
    this.element.setAttribute('data-radius', radius);
  }

  setPadding(padding) {
    this.padding = padding;
    this.element.setAttribute('data-padding', padding);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-card').forEach(card => {
    card.cardInstance = new TechOnCard(card);
  });
});