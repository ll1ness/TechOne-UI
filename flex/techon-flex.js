class TechOnFlex {
  constructor(element) {
    this.element = element;
    this.direction = element.dataset.direction || 'row';
    this.wrap = element.dataset.wrap || 'nowrap';
    this.justify = element.dataset.justify || 'start';
    this.align = element.dataset.align || 'stretch';
    this.gap = element.dataset.gap || 'm';
    this.padding = element.dataset.padding || 'none';
    this.fill = element.dataset.fill === 'true';
    
    this.element.setAttribute('data-direction', this.direction);
    this.element.setAttribute('data-wrap', this.wrap);
    this.element.setAttribute('data-justify', this.justify);
    this.element.setAttribute('data-align', this.align);
    this.element.setAttribute('data-gap', this.gap);
    this.element.setAttribute('data-padding', this.padding);
    this.element.setAttribute('data-fill', this.fill);
  }

  setDirection(direction) {
    this.direction = direction;
    this.element.setAttribute('data-direction', direction);
  }

  setJustify(justify) {
    this.justify = justify;
    this.element.setAttribute('data-justify', justify);
  }

  setAlign(align) {
    this.align = align;
    this.element.setAttribute('data-align', align);
  }

  setGap(gap) {
    this.gap = gap;
    this.element.setAttribute('data-gap', gap);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-flex').forEach(flex => {
    flex.flexInstance = new TechOnFlex(flex);
  });
});