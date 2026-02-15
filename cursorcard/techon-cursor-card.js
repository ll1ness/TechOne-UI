class TechOnCursorCard {
  constructor(element) {
    this.element = element;
    this.trigger = element.querySelector('.to-cursor-card-trigger');
    this.content = element.querySelector('.to-cursor-card-content');
    this.offset = parseInt(element.dataset.offset) || 20;
    this.position = element.dataset.position || 'top';
    
    this.content.setAttribute('data-position', this.position);
    
    this.init();
  }

  init() {
    this.trigger.addEventListener('mouseenter', (e) => this.show(e));
    this.trigger.addEventListener('mousemove', (e) => this.move(e));
    this.trigger.addEventListener('mouseleave', () => this.hide());
  }

  show(e) {
    this.content.classList.add('visible');
    this.move(e);
  }

  hide() {
    this.content.classList.remove('visible');
  }

  move(e) {
    const rect = this.trigger.getBoundingClientRect();
    const contentRect = this.content.getBoundingClientRect();
    
    let x = e.clientX;
    let y = e.clientY;
    
    switch(this.position) {
      case 'top':
        x = e.clientX - contentRect.width / 2;
        y = e.clientY - contentRect.height - this.offset;
        break;
      case 'bottom':
        x = e.clientX - contentRect.width / 2;
        y = e.clientY + this.offset;
        break;
      case 'left':
        x = e.clientX - contentRect.width - this.offset;
        y = e.clientY - contentRect.height / 2;
        break;
      case 'right':
        x = e.clientX + this.offset;
        y = e.clientY - contentRect.height / 2;
        break;
    }
    
    // Keep within viewport
    x = Math.max(this.offset, Math.min(window.innerWidth - contentRect.width - this.offset, x));
    y = Math.max(this.offset, Math.min(window.innerHeight - contentRect.height - this.offset, y));
    
    this.content.style.left = `${x}px`;
    this.content.style.top = `${y}px`;
  }

  setPosition(position) {
    this.position = position;
    this.content.setAttribute('data-position', position);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-cursor-card').forEach(card => {
    card.cursorCardInstance = new TechOnCursorCard(card);
  });
});