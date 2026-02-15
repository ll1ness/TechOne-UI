class TechOnSpinner {
  constructor(element) {
    this.element = element;
    this.size = element.dataset.size || 'm';
    this.color = element.dataset.color || 'default';
    this.speed = element.dataset.speed || 'normal';
    this.label = element.dataset.label;
    
    this.element.setAttribute('data-size', this.size);
    this.element.setAttribute('data-color', this.color);
    this.element.setAttribute('data-speed', this.speed);
    
    this.init();
  }

  init() {
    if (!this.element.querySelector('.to-spinner-circle')) {
      const circle = document.createElement('span');
      circle.className = 'to-spinner-circle';
      this.element.appendChild(circle);
    }
    
    if (this.label && !this.element.querySelector('.to-spinner-label')) {
      const labelSpan = document.createElement('span');
      labelSpan.className = 'to-spinner-label';
      labelSpan.textContent = this.label;
      this.element.appendChild(labelSpan);
    }
  }

  setSize(size) {
    this.size = size;
    this.element.setAttribute('data-size', size);
  }

  setColor(color) {
    this.color = color;
    this.element.setAttribute('data-color', color);
  }

  setSpeed(speed) {
    this.speed = speed;
    this.element.setAttribute('data-speed', speed);
  }

  setLabel(label) {
    this.label = label;
    const labelSpan = this.element.querySelector('.to-spinner-label');
    if (labelSpan) {
      labelSpan.textContent = label;
    } else if (label) {
      this.init();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-spinner').forEach(spinner => {
    spinner.spinnerInstance = new TechOnSpinner(spinner);
  });
});