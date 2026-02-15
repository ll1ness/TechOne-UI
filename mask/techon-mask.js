class TechOnMask {
  constructor(element) {
    this.element = element;
    this.type = element.dataset.type || 'color';
    this.color = element.dataset.color || 'primary';
    this.opacity = element.dataset.opacity || '0.8';
    this.blur = element.dataset.blur === 'true';
    this.reveal = element.dataset.reveal || 'none';
    this.radius = element.dataset.radius || 'none';
    this.revealed = false;
    
    this.element.setAttribute('data-type', this.type);
    this.element.setAttribute('data-color', this.color);
    this.element.setAttribute('data-blur', this.blur);
    this.element.setAttribute('data-reveal', this.reveal);
    this.element.setAttribute('data-radius', this.radius);
    
    this.init();
  }

  init() {
    if (!this.element.querySelector('.to-mask-overlay')) {
      const overlay = document.createElement('div');
      overlay.className = 'to-mask-overlay';
      this.element.appendChild(overlay);
    }
    
    if (this.reveal === 'click') {
      this.element.addEventListener('click', () => {
        this.revealed = !this.revealed;
        this.element.setAttribute('data-revealed', this.revealed);
      });
    }
  }

  setType(type) {
    this.type = type;
    this.element.setAttribute('data-type', type);
  }

  setColor(color) {
    this.color = color;
    this.element.setAttribute('data-color', color);
  }

  setOpacity(opacity) {
    this.opacity = opacity;
    this.element.style.setProperty('--to-mask-opacity', opacity);
  }

  setReveal(reveal) {
    this.reveal = reveal;
    this.element.setAttribute('data-reveal', reveal);
  }

  reveal() {
    if (this.reveal === 'manual') {
      this.revealed = true;
      this.element.setAttribute('data-revealed', true);
    }
  }

  hide() {
    if (this.reveal === 'manual') {
      this.revealed = false;
      this.element.setAttribute('data-revealed', false);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-mask').forEach(mask => {
    mask.maskInstance = new TechOnMask(mask);
  });
});