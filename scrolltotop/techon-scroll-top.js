class TechOnScrollTop {
  constructor(element) {
    this.element = element;
    this.threshold = parseInt(element.dataset.threshold) || 300;
    this.position = element.dataset.position || 'right';
    this.size = element.dataset.size || 'm';
    this.variant = element.dataset.variant || 'solid';
    this.radius = element.dataset.radius || 'full';
    this.progress = element.dataset.progress === 'true';
    this.scrollContainer = element.dataset.container 
      ? document.querySelector(element.dataset.container) 
      : window;
    
    this.element.setAttribute('data-position', this.position);
    this.element.setAttribute('data-size', this.size);
    this.element.setAttribute('data-variant', this.variant);
    this.element.setAttribute('data-radius', this.radius);
    this.element.setAttribute('data-progress', this.progress);
    
    this.init();
  }

  init() {
    this.element.addEventListener('click', () => this.scrollToTop());
    
    this.scrollContainer.addEventListener('scroll', () => this.checkVisibility());
    this.scrollContainer.addEventListener('resize', () => this.checkVisibility());
    
    this.checkVisibility();
    
    if (this.progress) {
      this.updateProgress();
    }
  }

  checkVisibility() {
    const scrollTop = this.scrollContainer === window
      ? window.pageYOffset || document.documentElement.scrollTop
      : this.scrollContainer.scrollTop;
    
    if (scrollTop > this.threshold) {
      this.element.classList.add('visible');
    } else {
      this.element.classList.remove('visible');
    }
  }

  scrollToTop() {
    if (this.scrollContainer === window) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      this.scrollContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  updateProgress() {
    const update = () => {
      const scrollTop = this.scrollContainer === window
        ? window.pageYOffset || document.documentElement.scrollTop
        : this.scrollContainer.scrollTop;
      
      const scrollHeight = this.scrollContainer === window
        ? document.documentElement.scrollHeight - window.innerHeight
        : this.scrollContainer.scrollHeight - this.scrollContainer.clientHeight;
      
      const progress = (scrollTop / scrollHeight) * 360;
      this.element.style.background = `conic-gradient(var(--to-scroll-top-bg) ${progress}deg, transparent ${progress}deg)`;
    };
    
    this.scrollContainer.addEventListener('scroll', update);
    this.scrollContainer.addEventListener('resize', update);
  }

  setThreshold(threshold) {
    this.threshold = threshold;
    this.checkVisibility();
  }

  setPosition(position) {
    this.position = position;
    this.element.setAttribute('data-position', position);
  }

  setVariant(variant) {
    this.variant = variant;
    this.element.setAttribute('data-variant', variant);
  }

  hide() {
    this.element.classList.remove('visible');
  }

  show() {
    this.element.classList.add('visible');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-scroll-top').forEach(scrollTop => {
    scrollTop.scrollTopInstance = new TechOnScrollTop(scrollTop);
  });
});