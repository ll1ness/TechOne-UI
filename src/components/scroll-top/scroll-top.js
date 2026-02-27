// TechOn Scroll Top Component
class TechOnScrollTop {
  constructor(element) {
    this.element = element;
    this.threshold = parseInt(element.dataset.threshold) || 300;

    window.addEventListener('scroll', () => this.checkVisibility());
    this.element.addEventListener('click', () => this.scrollToTop());
  }

  checkVisibility() {
    if (window.pageYOffset > this.threshold) {
      this.element.classList.add('visible');
    } else {
      this.element.classList.remove('visible');
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Initialize all scroll top components
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-scroll-top:not([data-initialized])').forEach(el => {
    new TechOnScrollTop(el);
    el.setAttribute('data-initialized', 'true');
  });
});