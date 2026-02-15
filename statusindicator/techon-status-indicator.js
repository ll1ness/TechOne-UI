class TechOnStatusIndicator {
  constructor(element) {
    this.element = element;
    this.size = element.dataset.size || 'm';
    this.color = element.dataset.color || 'neutral';
    this.pulse = element.dataset.pulse === 'true';
    this.bordered = element.dataset.bordered === 'true';
    this.label = element.dataset.label;
    this.labelPosition = element.dataset.labelPosition || 'right';
    
    this.element.setAttribute('data-size', this.size);
    this.element.setAttribute('data-color', this.color);
    this.element.setAttribute('data-pulse', this.pulse);
    this.element.setAttribute('data-bordered', this.bordered);
    this.element.setAttribute('data-label-position', this.labelPosition);
    
    this.init();
  }

  init() {
    if (!this.element.querySelector('.to-status-dot')) {
      const dot = document.createElement('span');
      dot.className = 'to-status-dot';
      this.element.appendChild(dot);
    }
    
    if (this.label && !this.element.querySelector('.to-status-indicator-text')) {
      const labelSpan = document.createElement('span');
      labelSpan.className = 'to-status-indicator-text';
      labelSpan.textContent = this.label;
      
      if (this.labelPosition === 'right') {
        this.element.appendChild(labelSpan);
      } else {
        this.element.insertBefore(labelSpan, this.element.firstChild);
      }
    }
  }

  setColor(color) {
    this.color = color;
    this.element.setAttribute('data-color', color);
  }

  setSize(size) {
    this.size = size;
    this.element.setAttribute('data-size', size);
  }

  setPulse(pulse) {
    this.pulse = pulse;
    this.element.setAttribute('data-pulse', pulse);
  }

  setLabel(label) {
    this.label = label;
    const labelSpan = this.element.querySelector('.to-status-indicator-text');
    if (labelSpan) {
      labelSpan.textContent = label;
    } else if (label) {
      this.init();
    }
  }

  setBordered(bordered) {
    this.bordered = bordered;
    this.element.setAttribute('data-bordered', bordered);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-status-indicator').forEach(indicator => {
    indicator.statusInstance = new TechOnStatusIndicator(indicator);
  });
});