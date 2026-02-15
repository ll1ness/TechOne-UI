class TechOnTable {
  constructor(element) {
    this.element = element;
    this.table = element.querySelector('.to-table');
    this.headers = Array.from(this.table.querySelectorAll('th[data-sortable="true"]'));
    this.striped = element.dataset.striped === 'true';
    this.hover = element.dataset.hover === 'true';
    this.size = element.dataset.size || 'm';
    this.border = element.dataset.border || 'full';
    
    this.table.setAttribute('data-striped', this.striped);
    this.table.setAttribute('data-hover', this.hover);
    this.table.setAttribute('data-size', this.size);
    this.table.setAttribute('data-border', this.border);
    
    this.init();
  }

  init() {
    this.headers.forEach(header => {
      header.addEventListener('click', () => this.sort(header));
    });
  }

  sort(header) {
    const index = this.headers.indexOf(header);
    const currentSort = header.dataset.sort;
    const tbody = this.table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Reset other headers
    this.headers.forEach(h => {
      if (h !== header) {
        delete h.dataset.sort;
      }
    });
    
    // Toggle sort direction
    if (currentSort === 'asc') {
      header.dataset.sort = 'desc';
    } else if (currentSort === 'desc') {
      delete header.dataset.sort;
    } else {
      header.dataset.sort = 'asc';
    }
    
    const sortDirection = header.dataset.sort;
    
    if (!sortDirection) {
      // Restore original order
      rows.sort((a, b) => a.dataset.index - b.dataset.index);
    } else {
      // Sort rows
      rows.sort((a, b) => {
        const aVal = a.children[index].textContent.trim();
        const bVal = b.children[index].textContent.trim();
        
        // Try numeric comparison
        const aNum = parseFloat(aVal);
        const bNum = parseFloat(bVal);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
        }
        
        // String comparison
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
    }
    
    // Reorder rows
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
  }

  setSize(size) {
    this.size = size;
    this.table.setAttribute('data-size', size);
  }

  setStriped(striped) {
    this.striped = striped;
    this.table.setAttribute('data-striped', striped);
  }

  setHover(hover) {
    this.hover = hover;
    this.table.setAttribute('data-hover', hover);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-table-wrapper').forEach(table => {
    table.tableInstance = new TechOnTable(table);
  });
});