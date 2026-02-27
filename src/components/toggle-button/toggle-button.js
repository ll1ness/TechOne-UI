// TechOn Toggle Button Component
class TechOnToggleButton {
  constructor(element) {
    this.element = element;
    this.selected = element.getAttribute('data-selected') === 'true';

    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    });
  }

  toggle() {
    this.selected = !this.selected;
    this.element.setAttribute('data-selected', this.selected ? 'true' : 'false');
  }

  setSelected(selected) {
    this.selected = selected;
    this.element.setAttribute('data-selected', selected ? 'true' : 'false');
  }
}

// Initialize all toggle button components
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-toggle-button:not([data-initialized])').forEach(el => {
    new TechOnToggleButton(el);
    el.setAttribute('data-initialized', 'true');
  });
});