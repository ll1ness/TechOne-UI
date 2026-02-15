class TechOnTimeline {
  constructor(element) {
    this.element = element;
    this.direction = element.dataset.direction || 'column';
    this.items = Array.from(element.querySelectorAll('.to-timeline-item'));
    
    this.element.setAttribute('data-direction', this.direction);
    
    this.init();
  }

  init() {
    this.items.forEach((item, index) => {
      const state = item.dataset.state || 'default';
      item.setAttribute('data-state', state);
      
      if (!item.querySelector('.to-timeline-content')) {
        const content = document.createElement('div');
        content.className = 'to-timeline-content';
        
        const label = item.dataset.label;
        if (label) {
          const labelEl = document.createElement('div');
          labelEl.className = 'to-timeline-label';
          labelEl.textContent = label;
          content.appendChild(labelEl);
        }
        
        const description = item.dataset.description;
        if (description) {
          const descEl = document.createElement('div');
          descEl.className = 'to-timeline-description';
          descEl.textContent = description;
          content.appendChild(descEl);
        }
        
        const time = item.dataset.time;
        if (time) {
          const timeEl = document.createElement('div');
          timeEl.className = 'to-timeline-time';
          timeEl.innerHTML = `🕒 ${time}`;
          content.appendChild(timeEl);
        }
        
        if (item.children.length > 0) {
          while (item.firstChild) {
            content.appendChild(item.firstChild);
          }
        }
        
        item.appendChild(content);
      }
    });
  }

  setDirection(direction) {
    this.direction = direction;
    this.element.setAttribute('data-direction', direction);
  }

  addItem(data, index) {
    const item = document.createElement('div');
    item.className = 'to-timeline-item';
    item.dataset.state = data.state || 'default';
    
    if (data.label) item.dataset.label = data.label;
    if (data.description) item.dataset.description = data.description;
    if (data.time) item.dataset.time = data.time;
    
    if (index !== undefined) {
      this.items.splice(index, 0, item);
      this.element.insertBefore(item, this.items[index + 1] || null);
    } else {
      this.items.push(item);
      this.element.appendChild(item);
    }
    
    this.init();
  }

  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      this.items[index].remove();
      this.items.splice(index, 1);
    }
  }

  setItemState(index, state) {
    if (index >= 0 && index < this.items.length) {
      this.items[index].dataset.state = state;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-timeline').forEach(timeline => {
    timeline.timelineInstance = new TechOnTimeline(timeline);
  });
});