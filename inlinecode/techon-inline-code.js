class TechOnInlineCode {
  constructor(element) {
    this.element = element;
    this.variant = element.dataset.variant || 'default';
    this.size = element.dataset.size || 'm';
    this.radius = element.dataset.radius || 'm';
    this.copy = element.dataset.copy === 'true';
    this.value = element.textContent.trim();
    
    this.element.setAttribute('data-variant', this.variant);
    this.element.setAttribute('data-size', this.size);
    this.element.setAttribute('data-radius', this.radius);
    this.element.setAttribute('data-copy', this.copy);
    
    this.init();
  }

  init() {
    if (this.copy) {
      this.element.addEventListener('click', () => this.copyToClipboard());
    }
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.value).then(() => {
      this.element.setAttribute('data-copied', 'true');
      setTimeout(() => {
        this.element.removeAttribute('data-copied');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  }

  setVariant(variant) {
    this.variant = variant;
    this.element.setAttribute('data-variant', variant);
  }

  setSize(size) {
    this.size = size;
    this.element.setAttribute('data-size', size);
  }

  setValue(value) {
    this.value = value;
    this.element.textContent = value;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-inline-code').forEach(code => {
    code.codeInstance = new TechOnInlineCode(code);
  });
});