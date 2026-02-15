class TechOnSkeleton {
  constructor(element) {
    this.element = element;
    this.variant = element.dataset.variant || 'text';
    this.size = element.dataset.size || 'm';
    this.width = element.dataset.width || '100';
    this.radius = element.dataset.radius || 'm';
    this.animation = element.dataset.animation || 'shimmer';
    this.count = parseInt(element.dataset.count) || 1;
    
    this.element.setAttribute('data-variant', this.variant);
    this.element.setAttribute('data-size', this.size);
    this.element.setAttribute('data-width', this.width);
    this.element.setAttribute('data-radius', this.radius);
    this.element.setAttribute('data-animation', this.animation);
    
    this.init();
  }

  init() {
    if (this.count > 1) {
      this.renderMultiple();
    }
  }

  renderMultiple() {
    const parent = this.element.parentNode;
    const wrapper = document.createElement('div');
    wrapper.className = 'to-skeleton-wrapper';
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = '8px';
    
    for (let i = 0; i < this.count; i++) {
      const clone = this.element.cloneNode(true);
      clone.dataset.count = '1';
      wrapper.appendChild(clone);
    }
    
    parent.replaceChild(wrapper, this.element);
  }

  setVariant(variant) {
    this.variant = variant;
    this.element.setAttribute('data-variant', variant);
  }

  setSize(size) {
    this.size = size;
    this.element.setAttribute('data-size', size);
  }

  setWidth(width) {
    this.width = width;
    this.element.setAttribute('data-width', width);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-skeleton').forEach(skeleton => {
    skeleton.skeletonInstance = new TechOnSkeleton(skeleton);
  });
});