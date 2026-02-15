class TechOnElementType {
  constructor(element) {
    this.element = element;
    this.as = element.dataset.as || 'div';
    this.variant = element.dataset.variant;
    this.size = element.dataset.size;
    this.weight = element.dataset.weight;
    this.align = element.dataset.align;
    this.transform = element.dataset.transform;
    
    this.init();
  }

  init() {
    this.updateElement();
  }

  updateElement() {
    // Change the actual HTML element type
    const newElement = document.createElement(this.as);
    
    // Copy all attributes
    Array.from(this.element.attributes).forEach(attr => {
      if (attr.name !== 'data-as') {
        newElement.setAttribute(attr.name, attr.value);
      }
    });
    
    // Copy content
    newElement.innerHTML = this.element.innerHTML;
    
    // Replace in DOM
    this.element.parentNode.replaceChild(newElement, this.element);
    this.element = newElement;
  }

  setAs(type) {
    this.as = type;
    this.element.setAttribute('data-as', type);
    this.updateElement();
  }

  setVariant(variant) {
    this.variant = variant;
    if (variant) {
      this.element.setAttribute('data-variant', variant);
    } else {
      this.element.removeAttribute('data-variant');
    }
  }

  setSize(size) {
    this.size = size;
    if (size) {
      this.element.setAttribute('data-size', size);
    } else {
      this.element.removeAttribute('data-size');
    }
  }

  setWeight(weight) {
    this.weight = weight;
    if (weight) {
      this.element.setAttribute('data-weight', weight);
    } else {
      this.element.removeAttribute('data-weight');
    }
  }

  setAlign(align) {
    this.align = align;
    if (align) {
      this.element.setAttribute('data-align', align);
    } else {
      this.element.removeAttribute('data-align');
    }
  }

  setText(text) {
    this.element.textContent = text;
  }

  setHtml(html) {
    this.element.innerHTML = html;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-element-type').forEach(el => {
    el.elementTypeInstance = new TechOnElementType(el);
  });
});