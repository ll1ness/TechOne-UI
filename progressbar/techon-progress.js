class TechOnProgress {
  constructor(element) {
    this.element = element;
    this.track = element.querySelector('.to-progress-track');
    this.fill = element.querySelector('.to-progress-fill');
    this.valueEl = element.querySelector('.to-progress-value');
    this.value = parseFloat(element.dataset.value) || 0;
    this.max = parseFloat(element.dataset.max) || 100;
    this.color = element.dataset.color || 'primary';
    this.size = element.dataset.size || 'm';
    this.radius = element.dataset.radius || 'm';
    this.striped = element.dataset.striped === 'true';
    this.animated = element.dataset.animated === 'true';
    this.showLabel = element.dataset.showLabel !== 'false';
    
    this.element.setAttribute('data-color', this.color);
    this.element.setAttribute('data-size', this.size);
    this.element.setAttribute('data-radius', this.radius);
    this.element.setAttribute('data-striped', this.striped);
    this.element.setAttribute('data-animated', this.animated);
    
    this.init();
  }

  init() {
    this.updateProgress();
  }

  updateProgress() {
    if (this.fill) {
      const percentage = (this.value / this.max) * 100;
      this.fill.style.width = `${percentage}%`;
    }
    
    if (this.valueEl) {
      this.valueEl.textContent = `${Math.round((this.value / this.max) * 100)}%`;
    }
  }

  setValue(value) {
    this.value = Math.min(value, this.max);
    this.updateProgress();
  }

  setMax(max) {
    this.max = max;
    this.updateProgress();
  }

  setColor(color) {
    this.color = color;
    this.element.setAttribute('data-color', color);
  }

  setStriped(striped) {
    this.striped = striped;
    this.element.setAttribute('data-striped', striped);
  }

  setAnimated(animated) {
    this.animated = animated;
    this.element.setAttribute('data-animated', animated);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-progress').forEach(progress => {
    progress.progressInstance = new TechOnProgress(progress);
  });
});