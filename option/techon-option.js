class TechOnOption {
  constructor(element) {
    this.element = element;
    this.type = element.dataset.type || 'default';
    this.value = element.dataset.value;
    this.selected = element.classList.contains('selected');
    this.disabled = element.classList.contains('disabled');
    this.group = element.dataset.group;
    
    this.init();
  }

  init() {
    this.element.addEventListener('click', (e) => {
      if (this.disabled) return;
      
      if (this.type === 'checkbox' || this.type === 'radio') {
        this.toggle();
      } else {
        this.select();
      }
      
      // Dispatch event
      const event = new CustomEvent('option-select', {
        detail: {
          value: this.value,
          selected: this.selected,
          element: this.element
        },
        bubbles: true
      });
      this.element.dispatchEvent(event);
    });

    // Handle keyboard navigation
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.element.click();
      }
    });

    // Make focusable
    if (!this.element.hasAttribute('tabindex')) {
      this.element.setAttribute('tabindex', '0');
    }
  }

  select() {
    if (this.type === 'radio' && this.group) {
      // Unselect other radio options in the same group
      document.querySelectorAll(`.to-option[data-group="${this.group}"]`).forEach(opt => {
        opt.classList.remove('selected');
        if (opt.optionInstance) {
          opt.optionInstance.selected = false;
        }
      });
    }
    
    this.element.classList.add('selected');
    this.selected = true;
  }

  deselect() {
    this.element.classList.remove('selected');
    this.selected = false;
  }

  toggle() {
    if (this.selected) {
      this.deselect();
    } else {
      this.select();
    }
  }

  enable() {
    this.disabled = false;
    this.element.classList.remove('disabled');
    this.element.removeAttribute('disabled');
  }

  disable() {
    this.disabled = true;
    this.element.classList.add('disabled');
    this.element.setAttribute('disabled', 'disabled');
  }

  setLabel(label) {
    const labelEl = this.element.querySelector('.to-option-label');
    if (labelEl) {
      labelEl.textContent = label;
    }
  }

  setDescription(description) {
    const descEl = this.element.querySelector('.to-option-description');
    if (descEl) {
      descEl.textContent = description;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-option').forEach(option => {
    option.optionInstance = new TechOnOption(option);
  });
});