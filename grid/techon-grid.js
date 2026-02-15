class TechOnGrid {
  constructor(element) {
    this.element = element;
    this.columns = element.dataset.columns || '12';
    this.gap = element.dataset.gap || 'm';
    this.padding = element.dataset.padding || 'none';
    
    this.element.setAttribute('data-columns', this.columns);
    this.element.setAttribute('data-gap', this.gap);
    this.element.setAttribute('data-padding', this.padding);
  }

  setColumns(columns) {
    this.columns = columns;
    this.element.setAttribute('data-columns', columns);
  }

  setGap(gap) {
    this.gap = gap;
    this.element.setAttribute('data-gap', gap);
  }

  setPadding(padding) {
    this.padding = padding;
    this.element.setAttribute('data-padding', padding);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-grid').forEach(grid => {
    grid.gridInstance = new TechOnGrid(grid);
  });
});