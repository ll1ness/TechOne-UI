class TechOnSmartLink {
  constructor(element) {
    this.element = element;
    this.href = element.getAttribute('href');
    this.external = element.dataset.external === 'true';
    this.download = element.dataset.download === 'true';
    this.prefetch = element.dataset.prefetch === 'true';
    this.active = element.dataset.active === 'true';
    this.disabled = element.dataset.disabled === 'true';
    
    this.element.setAttribute('data-external', this.external);
    this.element.setAttribute('data-download', this.download);
    this.element.setAttribute('data-prefetch', this.prefetch);
    this.element.setAttribute('data-active', this.active);
    this.element.setAttribute('data-disabled', this.disabled);
    
    this.init();
  }

  init() {
    if (this.external || (this.href && this.href.startsWith('http'))) {
      this.element.setAttribute('target', '_blank');
      this.element.setAttribute('rel', 'noopener noreferrer');
    }
    
    if (this.prefetch && this.href) {
      this.prefetchResource();
    }
    
    this.element.addEventListener('click', (e) => {
      if (this.disabled) {
        e.preventDefault();
        return;
      }
      
      if (this.download) {
        // Handle download tracking if needed
        console.log('Downloading:', this.href);
      }
    });
  }

  prefetchResource() {
    if (!this.href) return;
    
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = this.href;
    document.head.appendChild(link);
  }

  setActive(active) {
    this.active = active;
    this.element.setAttribute('data-active', active);
  }

  setDisabled(disabled) {
    this.disabled = disabled;
    this.element.setAttribute('data-disabled', disabled);
  }

  setHref(href) {
    this.href = href;
    this.element.setAttribute('href', href);
    
    if (this.prefetch) {
      this.prefetchResource();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-smart-link').forEach(link => {
    link.smartLinkInstance = new TechOnSmartLink(link);
  });
});