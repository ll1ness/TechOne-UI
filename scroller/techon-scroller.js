class TechOnScroller {
  constructor(element) {
    this.element = element;
    this.orientation = element.dataset.orientation || 'vertical';
    this.hide = element.dataset.hide || 'false';
    this.size = element.dataset.size || 'm';
    this.radius = element.dataset.radius || 'm';
    this.showShadows = element.dataset.showShadows === 'true';
    this.showButtons = element.dataset.showButtons === 'true';
    
    this.element.setAttribute('data-orientation', this.orientation);
    this.element.setAttribute('data-hide', this.hide);
    this.element.setAttribute('data-size', this.size);
    this.element.setAttribute('data-radius', this.radius);
    this.element.setAttribute('data-show-shadows', this.showShadows);
    
    this.init();
  }

  init() {
    if (this.showButtons) {
      this.createScrollButtons();
    }
    
    if (this.orientation === 'horizontal') {
      this.element.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          this.element.scrollLeft += e.deltaY;
        }
      });
    }
  }

  createScrollButtons() {
    const leftBtn = document.createElement('button');
    leftBtn.className = 'to-scroller-button left';
    leftBtn.innerHTML = '←';
    leftBtn.onclick = () => this.scrollLeft();
    
    const rightBtn = document.createElement('button');
    rightBtn.className = 'to-scroller-button right';
    rightBtn.innerHTML = '→';
    rightBtn.onclick = () => this.scrollRight();
    
    this.element.parentElement.style.position = 'relative';
    this.element.parentElement.appendChild(leftBtn);
    this.element.parentElement.appendChild(rightBtn);
  }

  scrollLeft() {
    this.element.scrollBy({
      left: -200,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.element.scrollBy({
      left: 200,
      behavior: 'smooth'
    });
  }

  scrollTo(element) {
    if (typeof element === 'number') {
      this.element.scrollTo({
        top: element,
        behavior: 'smooth'
      });
    } else if (element instanceof HTMLElement) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }

  scrollToTop() {
    this.element.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  scrollToBottom() {
    this.element.scrollTo({
      top: this.element.scrollHeight,
      behavior: 'smooth'
    });
  }

  setHideMode(mode) {
    this.hide = mode;
    this.element.setAttribute('data-hide', mode);
  }

  setSize(size) {
    this.size = size;
    this.element.setAttribute('data-size', size);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-scroller').forEach(scroller => {
    scroller.scrollerInstance = new TechOnScroller(scroller);
  });
});