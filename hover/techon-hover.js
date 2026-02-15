class TechOnHover {
  constructor(element) {
    this.element = element;
    this.effect = element.dataset.effect || 'scale';
    this.intensity = element.dataset.intensity || 'medium';
    this.duration = element.dataset.duration || 'normal';
    this.color = element.dataset.color;
    
    this.element.setAttribute('data-effect', this.effect);
    this.element.setAttribute('data-intensity', this.intensity);
    this.element.setAttribute('data-duration', this.duration);
    
    if (this.color) {
      this.element.style.setProperty('--to-hover-color', this.color);
    }
  }

  setEffect(effect) {
    this.effect = effect;
    this.element.setAttribute('data-effect', effect);
  }

  setIntensity(intensity) {
    this.intensity = intensity;
    this.element.setAttribute('data-intensity', intensity);
  }

  setDuration(duration) {
    this.duration = duration;
    this.element.setAttribute('data-duration', duration);
  }

  setColor(color) {
    this.color = color;
    this.element.style.setProperty('--to-hover-color', color);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-hover').forEach(hover => {
    hover.hoverInstance = new TechOnHover(hover);
  });
});