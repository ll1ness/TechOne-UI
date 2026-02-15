class TechOnTag {
  constructor(element) {
    this.element = element;
    this.variant = element.dataset.variant || 'default';
    this.size = element.dataset.size || 'm';
    this.radius = element.dataset.radius || 'm';
    this.closable = element.dataset.closable === 'true';
    
    this.element.setAttribute('data-variant', this.variant);
    this.element.setAttribute('data-size', this.size);
    this.element.setAttribute('data-radius', this.radius);
    
    this.init();
  }

  init() {
    if (this.closable && !this.element.querySelector('.to-tag-close')) {
      const closeBtn = document.createElement('span');
      closeBtn.className = 'to-tag-close';
      closeBtn.innerHTML = '✕';
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.close();
      });
      this.element.appendChild(closeBtn);
    }
  }

  close() {
    this.element.style.animation = 'to-tag-fade-out 0.2s ease forwards';
    setTimeout(() => {
      this.element.remove();
    }, 200);
  }

  setVariant(variant) {
    this.variant = variant;
    this.element.setAttribute('data-variant', variant);
  }

  setSize(size) {
    this.size = size;
    this.element.setAttribute('data-size', size);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-tag').forEach(tag => {
    tag.tagInstance = new TechOnTag(tag);
  });
});

const style = document.createElement('style');
style.textContent = `
  @keyframes to-tag-fade-out {
    0% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(0.8); }
  }
`;
document.head.appendChild(style);