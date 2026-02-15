class TechOnMasonry {
  constructor(element) {
    this.element = element;
    this.columns = parseInt(element.dataset.columns) || 3;
    this.gap = element.dataset.gap || 'm';
    this.animated = element.dataset.animated === 'true';
    this.centered = element.dataset.centered === 'true';
    this.stagger = element.dataset.stagger === 'true';
    this.items = Array.from(element.children);
    
    this.element.setAttribute('data-columns', this.columns);
    this.element.setAttribute('data-gap', this.gap);
    this.element.setAttribute('data-animated', this.animated);
    this.element.setAttribute('data-centered', this.centered);
    this.element.setAttribute('data-stagger', this.stagger);
    
    this.init();
  }

  init() {
    this.layout();
    window.addEventListener('resize', () => this.layout());
  }

  layout() {
    const containerWidth = this.element.offsetWidth;
    const columnCount = this.getColumnCount(containerWidth);
    
    if (columnCount === 1) {
      // Simple vertical layout
      this.element.style.display = 'block';
      this.items.forEach(item => {
        item.style.width = '100%';
        item.style.marginBottom = this.getGapPixels();
      });
    } else {
      // Masonry layout
      this.element.style.display = 'flex';
      
      // Create columns
      const columns = Array.from({ length: columnCount }, () => []);
      
      // Distribute items
      this.items.forEach((item, index) => {
        const columnIndex = index % columnCount;
        columns[columnIndex].push(item);
      });
      
      // Clear and rebuild
      this.element.innerHTML = '';
      
      columns.forEach(columnItems => {
        const column = document.createElement('div');
        column.className = 'to-masonry-column';
        
        columnItems.forEach(item => {
          const wrapper = document.createElement('div');
          wrapper.className = 'to-masonry-item';
          wrapper.appendChild(item.cloneNode(true));
          column.appendChild(wrapper);
        });
        
        this.element.appendChild(column);
      });
      
      this.items = Array.from(this.element.querySelectorAll('.to-masonry-item'));
    }
  }

  getColumnCount(containerWidth) {
    if (containerWidth < 640) return 1;
    if (containerWidth < 768) return 2;
    if (containerWidth < 1024) return 3;
    return this.columns;
  }

  getGapPixels() {
    const gaps = {
      'xs': 4,
      's': 8,
      'm': 16,
      'l': 24,
      'xl': 32
    };
    return gaps[this.gap] || 16;
  }

  setColumns(columns) {
    this.columns = columns;
    this.element.setAttribute('data-columns', columns);
    this.layout();
  }

  setGap(gap) {
    this.gap = gap;
    this.element.setAttribute('data-gap', gap);
    this.layout();
  }

  addItem(item) {
    this.items.push(item);
    this.layout();
  }

  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      this.items[index].remove();
      this.items.splice(index, 1);
      this.layout();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-masonry').forEach(masonry => {
    masonry.masonryInstance = new TechOnMasonry(masonry);
  });
});