class TechOnBanner {
  constructor(element) {
    this.element = element;
    this.radius = element.dataset.radius;
    this.solid = element.dataset.solid;
    this.horizontal = element.dataset.horizontal;
    
    if (this.radius) {
      this.element.setAttribute('data-radius', this.radius);
    }
    
    if (this.solid) {
      this.element.setAttribute('data-solid', this.solid);
    }
    
    if (this.horizontal) {
      this.element.setAttribute('data-horizontal', this.horizontal);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-banner').forEach(banner => {
    banner.bannerInstance = new TechOnBanner(banner);
  });
});