// TechOn UI - Main JavaScript

(function() {
  'use strict';

  function loadComponents() {
    const container = document.getElementById('components-container');
    if (!container) return;

    fetch('components/')
      .then(r => r.text())
      .then(text => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const links = doc.querySelectorAll('a[href$="/"]');
        
        const components = [];
        for (const link of links) {
          const name = link.textContent.replace('/', '');
          if (name && !name.startsWith('.')) {
            components.push({
              name: name,
              url: `components/${name}/index.html`
            });
          }
        }
        
        container.innerHTML = '';
        
        components.forEach(comp => {
          const preview = document.createElement('div');
          preview.className = 'component-preview';
          preview.innerHTML = `
            <div class="component-title">${comp.name}</div>
            <div class="component-content" data-component="${comp.name}">
              <span style="color:#666;">Loading...</span>
            </div>
          `;
          container.appendChild(preview);
          
          fetch(comp.url)
            .then(r => r.text())
            .then(html => {
              const compDoc = parser.parseFromString(html, 'text/html');
              const body = compDoc.querySelector('body');
              if (body) {
                const content = body.innerHTML;
                const contentEl = preview.querySelector('.component-content');
                contentEl.innerHTML = content;
                
                const scripts = contentEl.querySelectorAll('script');
                scripts.forEach(s => s.remove());
                
                requestAnimationFrame(() => {
                  scripts.forEach(s => {
                    const newScript = document.createElement('script');
                    newScript.textContent = s.textContent;
                    contentEl.appendChild(newScript);
                  });
                  if (window.TechOnUI && window.TechOnUI.init) {
                    window.TechOnUI.init();
                  }
                });
              }
            })
            .catch(() => {
              preview.querySelector('.component-content').innerHTML = 
                '<span class="error">Failed to load</span>';
            });
        });
      })
      .catch(e => {
        container.innerHTML = `<div class="error">Error: ${e.message}</div>`;
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
  } else {
    loadComponents();
  }
})();