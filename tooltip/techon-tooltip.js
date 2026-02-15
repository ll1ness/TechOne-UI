class TechOnTooltip {
  constructor(element) {
    this.element = element;
    this.content = element.querySelector('.to-tooltip-content');
    this.position = element.dataset.position || 'top';
    this.delay = parseInt(element.dataset.delay) || 0;
    this.width = element.dataset.width || 'auto';
    
    this.content.setAttribute('data-position', this.position);
    this.content.setAttribute('data-width', this.width);
    
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

  setPosition(position) {
    this.position = position;
    this.content.setAttribute('data-position', position);
  }

  setContent(text) {
    this.content.textContent = text;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-tooltip').forEach(tooltip => {
    tooltip.tooltipInstance = new TechOnTooltip(tooltip);
  });
});