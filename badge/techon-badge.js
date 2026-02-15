class TechOnBadge {
  constructor(element) {
    this.element = element;
    this.variant = element.dataset.variant || 'neutral';
    this.size = element.dataset.size || 'm';
    this.radius = element.dataset.radius || 'm';
    
    this.element.setAttribute('data-variant', this.variant);
    this.element.setAttribute('data-size', this.size);
    this.element.setAttribute('data-radius', this.radius);
    
    this.init();
  }

  init() {
    const icon = this.element.dataset.icon;
    if (icon && !this.element.querySelector('.to-badge-icon')) {
      const iconSpan = document.createElement('span');
      iconSpan.className = 'to-badge-icon';
      iconSpan.textContent = icon;
      this.element.insertBefore(iconSpan, this.element.firstChild);
    }
  }

  setVariant(variant) {
    this.variant = variant;
    this.element.setAttribute('data-variant', variant);
  }

  setSize(size) {
    this.size = size;
    this.element.setAttribute('data-size', size);
  }

  setRadius(radius) {
    this.radius = radius;
    this.element.setAttribute('data-radius', radius);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-badge').forEach(badge => {
    badge.badgeInstance = new TechOnBadge(badge);
  });
});