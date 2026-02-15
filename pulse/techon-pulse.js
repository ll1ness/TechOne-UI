class TechOnPulse {
  constructor(element) {
    this.element = element;
    this.size = element.dataset.size || 'm';
    this.color = element.dataset.color || 'primary';
    this.speed = element.dataset.speed || 'normal';
    this.scale = element.dataset.scale || 'medium';
    this.type = element.dataset.type || 'ring';
    this.multiple = element.dataset.multiple === 'true';
    
    this.element.setAttribute('data-size', this.size);
    this.element.setAttribute('data-color', this.color);
    this.element.setAttribute('data-speed', this.speed);
    this.element.setAttribute('data-scale', this.scale);
    this.element.setAttribute('data-type', this.type);
    this.element.setAttribute('data-multiple', this.multiple);
    
    this.init();
  }

  init() {
    if (!this.element.querySelector('.to-pulse-content')) {
      const content = document.createElement('div');
      content.className = 'to-pulse-content';
      
      if (this.element.children.length > 0) {
        while (this.element.firstChild) {
          content.appendChild(this.element.firstChild);
        }
      } else {
        content.innerHTML = '●';
      }
      
      this.element.appendChild(content);
    }
    
    if (this.type !== 'dot') {
      const rings = this.multiple ? 3 : 1;
      for (let i = 0; i < rings; i++) {
        const ring = document.createElement('div');
        ring.className = 'to-pulse-ring';
        this.element.appendChild(ring);
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

  setSpeed(speed) {
    this.speed = speed;
    this.element.setAttribute('data-speed', speed);
  }

  setType(type) {
    this.type = type;
    this.element.setAttribute('data-type', type);
    this.element.innerHTML = '';
    this.init();
  }

  setMultiple(multiple) {
    this.multiple = multiple;
    this.element.setAttribute('data-multiple', multiple);
    this.element.innerHTML = '';
    this.init();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-pulse').forEach(pulse => {
    pulse.pulseInstance = new TechOnPulse(pulse);
  });
});