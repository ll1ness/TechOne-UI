class TechOnToggleButton {
  constructor(element) {
    this.element = element;
    this.selected = element.dataset.selected === 'true';
    this.variant = element.dataset.variant || 'ghost';
    this.size = element.dataset.size || 'm';
    this.radius = element.dataset.radius || 'm';
    this.fillWidth = element.dataset.fillWidth === 'true';
    this.horizontal = element.dataset.horizontal || 'center';
    this.weight = element.dataset.weight || 'default';
    
    this.element.setAttribute('data-selected', this.selected);
    this.element.setAttribute('data-variant', this.variant);
    this.element.setAttribute('data-size', this.size);
    this.element.setAttribute('data-radius', this.radius);
    this.element.setAttribute('data-fill-width', this.fillWidth);
    this.element.setAttribute('data-horizontal', this.horizontal);
    this.element.setAttribute('data-weight', this.weight);
    
    this.init();
  }

  init() {
    this.element.addEventListener('click', (e) => {
      if (this.element.dataset.group) {
        // Handle group selection
        const group = document.querySelectorAll(`[data-group="${this.element.dataset.group}"]`);
        group.forEach(btn => {
          if (btn !== this.element) {
            btn.toggleInstance?.setSelected(false);
          }
        });
      }
      this.toggle();
    });
  }

  toggle() {
    this.selected = !this.selected;
    this.element.setAttribute('data-selected', this.selected);
    
    // Trigger custom event
    const event = new CustomEvent('toggle-change', {
      detail: { selected: this.selected, element: this.element }
    });
    this.element.dispatchEvent(event);
  }

  setSelected(selected) {
    this.selected = selected;
    this.element.setAttribute('data-selected', selected);
  }

  setVariant(variant) {
    this.variant = variant;
    this.element.setAttribute('data-variant', variant);
  }

  setSize(size) {
    this.size = size;
    this.element.setAttribute('data-size', size);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-toggle-button').forEach(toggle => {
    toggle.toggleInstance = new TechOnToggleButton(toggle);
  });
});