class TechOnDialog {
  constructor(element) {
    this.element = element;
    this.overlay = element.querySelector('.to-dialog-overlay');
    this.dialog = element.querySelector('.to-dialog');
    this.closeBtn = element.querySelector('.to-dialog-close');
    this.openBtn = document.querySelector(element.dataset.trigger);
    this.size = element.dataset.size || 'm';
    
    this.element.setAttribute('data-size', this.size);
    
    this.init();
  }

  init() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) {
          this.close();
        }
      });
    }

    if (this.openBtn) {
      this.openBtn.addEventListener('click', () => this.open());
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  }

  open() {
    this.element.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.element.style.display = 'none';
    document.body.style.overflow = '';
  }

  isOpen() {
    return this.element.style.display !== 'none';
  }

  setSize(size) {
    this.size = size;
    this.element.setAttribute('data-size', size);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-dialog-wrapper').forEach(dialog => {
    dialog.dialogInstance = new TechOnDialog(dialog);
  });
});