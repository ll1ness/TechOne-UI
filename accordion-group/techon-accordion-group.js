class TechOnAccordionGroup {
  constructor(element) {
    this.element = element;
    this.items = [];
    this.init();
  }

  init() {
    this.element.querySelectorAll('.to-accordion-group-item').forEach((item, index) => {
      const trigger = item.querySelector('.to-accordion-group-trigger');
      const content = item.querySelector('.to-accordion-group-content');
      const isOpen = item.getAttribute('data-open') === 'true';
      
      const itemInstance = {
        element: item,
        trigger: trigger,
        content: content,
        isOpen: isOpen,
        index: index
      };

      trigger.setAttribute('aria-expanded', isOpen);
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleItem(itemInstance);
      });

      this.items.push(itemInstance);
    });
  }

  toggleItem(item) {
    item.isOpen = !item.isOpen;
    item.element.setAttribute('data-open', item.isOpen);
    item.trigger.setAttribute('aria-expanded', item.isOpen);
  }

  openItem(index) {
    const item = this.items[index];
    if (item && !item.isOpen) {
      item.isOpen = true;
      item.element.setAttribute('data-open', true);
      item.trigger.setAttribute('aria-expanded', true);
    }
  }

  closeItem(index) {
    const item = this.items[index];
    if (item && item.isOpen) {
      item.isOpen = false;
      item.element.setAttribute('data-open', false);
      item.trigger.setAttribute('aria-expanded', false);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-accordion-group').forEach(group => {
    group.accordionGroupInstance = new TechOnAccordionGroup(group);
  });
});