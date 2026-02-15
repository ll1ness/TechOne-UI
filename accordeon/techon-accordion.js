class TechOnAccordion {
  constructor(element) {
    this.element = element;
    this.trigger = element.querySelector('.to-accordion-trigger');
    this.content = element.querySelector('.to-accordion-content');
    this.isOpen = element.getAttribute('data-open') === 'true';
    this.updateAriaExpanded();
    this.trigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    });
  }

  updateAriaExpanded() {
    this.trigger.setAttribute('aria-expanded', this.isOpen);
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.element.setAttribute('data-open', this.isOpen);
    this.updateAriaExpanded();
  }

  open() {
    if (!this.isOpen) {
      this.isOpen = true;
      this.element.setAttribute('data-open', true);
      this.updateAriaExpanded();
    }
  }

  close() {
    if (this.isOpen) {
      this.isOpen = false;
      this.element.setAttribute('data-open', false);
      this.updateAriaExpanded();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-accordion').forEach(accordion => {
    accordion.accordionInstance = new TechOnAccordion(accordion);
  });
});