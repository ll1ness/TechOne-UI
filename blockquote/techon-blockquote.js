class TechOnBlockquote {
  constructor(element) {
    this.element = element;
    this.variant = element.dataset.variant || 'default';
    this.size = element.dataset.size || 'm';
    
    this.element.setAttribute('data-variant', this.variant);
    this.element.setAttribute('data-size', this.size);
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
  document.querySelectorAll('.to-blockquote').forEach(blockquote => {
    blockquote.blockquoteInstance = new TechOnBlockquote(blockquote);
  });
});