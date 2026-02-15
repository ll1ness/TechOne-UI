class TechOnHoverCard {
  constructor(element) {
    this.element = element;
    this.content = element.querySelector('.to-hover-card-content');
    this.side = element.dataset.side || 'bottom';
    this.width = element.dataset.width || 'm';
    this.radius = element.dataset.radius || 'm';
    this.delay = parseInt(element.dataset.delay) || 0;
    this.sticky = element.dataset.sticky === 'true';
    
    this.content.setAttribute('data-side', this.side);
    this.element.setAttribute('data-width', this.width);
    this.element.setAttribute('data-radius', this.radius);
    this.element.setAttribute('data-delay', this.delay);
    this.element.setAttribute('data-sticky', this.sticky);
    
    this.init();
  }

  init() {
    if (this.delay > 0) {
      let timeout;
      
      this.element.addEventListener('mouseenter', () => {
        timeout = setTimeout(() => {
          this.content.style.opacity = '1';
          this.content.style.visibility = 'visible';
        }, this.delay);
      });
      
      this.element.addEventListener('mouseleave', () => {
        clearTimeout(timeout);
        this.content.style.opacity = '0';
        this.content.style.visibility = 'hidden';
      });
    }
  }

  setSide(side) {
    this.side = side;
    this.content.setAttribute('data-side', side);
  }

  setWidth(width) {
    this.width = width;
    this.element.setAttribute('data-width', width);
  }

  show() {
    this.content.style.opacity = '1';
    this.content.style.visibility = 'visible';
  }

  hide() {
    this.content.style.opacity = '0';
    this.content.style.visibility = 'hidden';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-hover-card').forEach(card => {
    card.hoverCardInstance = new TechOnHoverCard(card);
  });
});