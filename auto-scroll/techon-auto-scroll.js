class TechOnAutoScroll {
  constructor(element) {
    this.element = element;
    this.track = element.querySelector('.to-auto-scroll-track');
    this.speed = element.dataset.speed || 'medium';
    this.hover = element.dataset.hover || 'slow';
    this.reverse = element.dataset.reverse === 'true';
    
    this.element.setAttribute('data-speed', this.speed);
    this.element.setAttribute('data-hover', this.hover);
    this.element.setAttribute('data-reverse', this.reverse);
    
    this.init();
  }

  init() {
    if (!this.track) return;
    
    const content = this.track.innerHTML;
    this.track.innerHTML = content + content;
  }

  setSpeed(speed) {
    this.speed = speed;
    this.element.setAttribute('data-speed', speed);
  }

  setHover(hover) {
    this.hover = hover;
    this.element.setAttribute('data-hover', hover);
  }

  setReverse(reverse) {
    this.reverse = reverse;
    this.element.setAttribute('data-reverse', reverse);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-auto-scroll').forEach(scroll => {
    scroll.autoScrollInstance = new TechOnAutoScroll(scroll);
  });
});