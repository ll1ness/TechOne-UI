import './styles.css';
import { initAll } from './systems/init.js';

(async function() {
  const container = document.getElementById('components-container');
  
  async function loadComponents() {
    try {
      const response = await fetch('/src/components');
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const links = doc.querySelectorAll('a[href$="/"]');
      
      const components = [];
      for (const link of links) {
        const name = link.textContent.replace('/', '');
        if (name && !name.startsWith('.')) {
          components.push({
            name: name,
            url: `/src/components/${name}/index.html`
          });
        }
      }
      
      container.innerHTML = '';
      
      for (const comp of components) {
        const preview = document.createElement('div');
        preview.className = 'component-preview';
        preview.innerHTML = `
          <div class="component-title">${comp.name}</div>
          <div class="component-content" data-component="${comp.name}">
            <span style="color:#666;">Loading...</span>
          </div>
        `;
        container.appendChild(preview);
        
        try {
          const compResponse = await fetch(comp.url);
          const compHtml = await compResponse.text();
          const compDoc = parser.parseFromString(compHtml, 'text/html');
          const body = compDoc.querySelector('body');
          
          if (body) {
            const content = body.innerHTML;
            const contentEl = preview.querySelector('.component-content');
            contentEl.innerHTML = content;
            
            const scripts = contentEl.querySelectorAll('script');
            const scriptContents = [];
            scripts.forEach(s => {
              scriptContents.push(s.textContent);
              s.remove();
            });
            
            requestAnimationFrame(() => {
              scripts.forEach((s, i) => {
                const newScript = document.createElement('script');
                newScript.textContent = scriptContents[i];
                contentEl.appendChild(newScript);
              });
              initAll();
            });
          }
        } catch (e) {
          preview.querySelector('.component-content').innerHTML = 
            `<span class="error">Failed to load</span>`;
        }
      }
      
      if (container.children.length === 0) {
        container.innerHTML = '<div class="error">No components found</div>';
      }
    } catch (e) {
      container.innerHTML = `<div class="error">Error: ${e.message}</div>`;
    }
  }
  
  loadComponents();
})();

initAll();