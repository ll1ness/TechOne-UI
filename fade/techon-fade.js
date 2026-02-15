class TechOnFade {
  constructor(element) {
    this.element = element;
    this.direction = element.dataset.direction;
    this.effect = element.dataset.effect;
    this.duration = element.dataset.duration || 'normal';
    this.distance = element.dataset.distance || 'medium';
    this.loop = element.dataset.loop === 'true';
    this.stagger = element.dataset.stagger === 'true';
    this.trigger = element.dataset.trigger;
    
    this.element.setAttribute('data-duration', this.duration);
    this.element.setAttribute('data-distance', this.distance);
    if (this.direction) this.element.setAttribute('data-direction', this.direction);
    if (this.effect) this.element.setAttribute('data-effect', this.effect);
    if (this.loop) this.element.setAttribute('data-loop', 'true');
    if (this.stagger) this.element.setAttribute('data-stagger', 'true');
    
    this.init();
  }

  init() {
    if (this.trigger) {
      this.setupTrigger();
    } else {
      // Auto-play on mount
      this.play();
    }
  }

  setupTrigger() {
    const triggerEl = document.querySelector(this.trigger);
    if (!triggerEl) return;
    
    triggerEl.addEventListener('click', () => {
      this.toggle();
    });
    
    triggerEl.addEventListener('mouseenter', () => {
      if (this.element.dataset.triggerType === 'hover') {
        this.play();
      }
    });
    
    triggerEl.addEventListener('mouseleave', () => {
      if (this.element.dataset.triggerType === 'hover') {
        this.reverse();
      }
    });
  }

  play() {
    this.element.classList.remove('to-fade-exit');
    this.element.classList.add('to-fade-enter');
  }

  reverse() {
    this.element.classList.remove('to-fade-enter');
    this.element.classList.add('to-fade-exit');
  }

  toggle() {
    if (this.element.classList.contains('to-fade-enter')) {
      this.reverse();
    } else {
      this.play();
    }
  }

  setDirection(direction) {
    this.direction = direction;
    if (direction) {
      this.element.setAttribute('data-direction', direction);
    } else {
      this.element.removeAttribute('data-direction');
    }
  }

  setEffect(effect) {
    this.effect = effect;
    if (effect) {
      this.element.setAttribute('data-effect', effect);
    } else {
      this.element.removeAttribute('data-effect');
    }
  }

  setDuration(duration) {
    this.duration = duration;
    this.element.setAttribute('data-duration', duration);
  }

  setLoop(loop) {
    this.loop = loop;
    this.element.setAttribute('data-loop', loop);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-fade').forEach(fade => {
    fade.fadeInstance = new TechOnFade(fade);
  });
});