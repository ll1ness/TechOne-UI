// TechOn Dialog Component
class TechOnDialog {
  constructor(element) {
    this.element = element;
    this.overlay = element.querySelector('.to-dialog-overlay');
    this.closeBtn = element.querySelector('.to-dialog-close');
    this.openBtn = document.querySelector(element.dataset.trigger);

    this.openBtn?.addEventListener('click', () => this.open());
    this.closeBtn?.addEventListener('click', () => this.close());
    this.overlay?.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });
  }

  open() {
    this.element.style.display = 'block';
  }

  close() {
    this.element.style.display = 'none';
  }
}

// Initialize all dialog components
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-dialog-wrapper:not([data-initialized])').forEach(el => {
    new TechOnDialog(el);
    el.setAttribute('data-initialized', 'true');
  });
});