class TechOnArrow {
  constructor(element) {
    this.element = element;
    this.triggerSelector = element.dataset.trigger;
    this.scale = element.dataset.scale || '0.8';
    this.color = element.dataset.color || 'on-background';
    
    this.element.setAttribute('data-scale', this.scale);
    this.element.setAttribute('data-color', this.color);
    
    this.init();
  }

  init() {
    if (!this.triggerSelector) return;
    
    this.trigger = document.querySelector(this.triggerSelector);
    
    if (!this.trigger) return;
    
    this.setupTrigger();
  }

  setupTrigger() {
    this.trigger.addEventListener('mouseenter', () => {
      this.element.classList.add('to-arrow-triggered');
    });
    
    this.trigger.addEventListener('mouseleave', () => {
      this.element.classList.remove('to-arrow-triggered');
    });
  }

  setScale(scale) {
    this.scale = scale;
    this.element.setAttribute('data-scale', scale);
  }

  setColor(color) {
    this.color = color;
    this.element.setAttribute('data-color', color);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-arrow').forEach(arrow => {
    arrow.arrowInstance = new TechOnArrow(arrow);
  });
});