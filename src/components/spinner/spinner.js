// TechOn Spinner Component
class TechOnSpinner {
  constructor(element) {
    this.element = element;
    this.size = element.dataset.size || 'm';
    this.color = element.dataset.color || 'primary';
    this.element.setAttribute('data-size', this.size);
    this.element.setAttribute('data-color', this.color);
  }
}

// Initialize all spinner components
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-spinner:not([data-initialized])').forEach(el => {
    new TechOnSpinner(el);
    el.setAttribute('data-initialized', 'true');
  });
});