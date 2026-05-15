// TechOn Toggle Button Component
class TechOnToggleButton {
  constructor(element) {
    this.element = element;
    this.selected = element.getAttribute('data-selected') === 'true';
    this.group = element.closest('.to-toggle-group');

    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.group) {
        this.group.querySelectorAll('.to-toggle-button').forEach(btn => {
          if (btn !== this.element) {
            btn.setAttribute('data-selected', 'false');
          }
        });
      }
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