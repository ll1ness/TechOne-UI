class TechOnEmojiPicker {
  constructor(element) {
    this.element = element;
    this.trigger = element.querySelector('.to-emoji-picker-trigger');
    this.dropdown = element.querySelector('.to-emoji-picker-dropdown');
    this.searchInput = element.querySelector('.to-emoji-picker-search input');
    this.content = element.querySelector('.to-emoji-picker-content');
    this.categories = Array.from(element.querySelectorAll('.to-emoji-picker-category') || []);
    this.skinTones = Array.from(element.querySelectorAll('.to-emoji-skin-tone') || []);
    
    this.currentCategory = 'smileys';
    this.currentSkinTone = 'default';
    this.recentEmojis = [];
    this.emojiData = this.getEmojiData();
    
    if (!this.dropdown || !this.content) return;
    
    this.init();
  }

  init() {
    if (this.trigger) {
      this.trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }
    
    document.addEventListener('click', (e) => {
      if (this.dropdown && !this.element.contains(e.target)) {
        this.close();
      }
    });
    
    if (this.searchInput) {
      this.searchInput.addEventListener('input', () => this.search());
    }
    
    if (this.categories.length) {
      this.categories.forEach(cat => {
        cat.addEventListener('click', () => {
          this.currentCategory = cat.dataset.category;
          this.updateActiveCategory();
          this.renderEmojis();
        });
      });
    }
    
    if (this.skinTones.length) {
      this.skinTones.forEach(tone => {
        tone.addEventListener('click', () => {
          this.currentSkinTone = tone.dataset.tone;
          this.updateSkinTone();
          if (this.renderEmojis) this.renderEmojis();
        });
      });
    }
    
    this.renderEmojis();
  }

  toggle() {
    if (!this.dropdown) return;
    if (this.dropdown.classList.contains('open')) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (this.dropdown) {
      this.dropdown.classList.add('open');
    }
  }

  close() {
    if (this.dropdown) {
      this.dropdown.classList.remove('open');
    }
  }

  updateActiveCategory() {
    if (!this.categories.length) return;
    this.categories.forEach(cat => {
      if (cat.dataset.category === this.currentCategory) {
        cat.classList.add('active');
      } else {
        cat.classList.remove('active');
      }
    });
  }

  updateSkinTone() {
    if (!this.skinTones.length) return;
    this.skinTones.forEach(tone => {
      if (tone.dataset.tone === this.currentSkinTone) {
        tone.classList.add('active');
      } else {
        tone.classList.remove('active');
      }
    });
  }

  search() {
    if (!this.searchInput || !this.content) return;
    const term = this.searchInput.value.toLowerCase();
    if (term.length < 2) {
      this.renderEmojis();
      return;
    }
    
    const results = [];
    for (const [category, emojis] of Object.entries(this.emojiData)) {
      emojis.forEach(emoji => {
        if (emoji.name.toLowerCase().includes(term) || (emoji.keywords && emoji.keywords.some(k => k.includes(term)))) {
          results.push(emoji);
        }
      });
    }
    
    this.renderSearchResults(results);
  }

  renderEmojis() {
    if (!this.content) return;
    
    let html = '';
    const emojis = this.emojiData[this.currentCategory] || [];
    
    const groups = {};
    emojis.forEach(emoji => {
      if (!groups[emoji.group]) {
        groups[emoji.group] = [];
      }
      groups[emoji.group].push(emoji);
    });
    
    for (const [group, items] of Object.entries(groups)) {
      html += `
        <div class="to-emoji-picker-group">
          <div class="to-emoji-picker-group-title">${group}</div>
          <div class="to-emoji-picker-grid">
            ${items.map(emoji => `
              <div class="to-emoji-item" data-emoji="${emoji.char}" title="${emoji.name}">
                ${emoji.char}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
    
    this.content.innerHTML = html;
    
    this.content.querySelectorAll('.to-emoji-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const emoji = item.dataset.emoji;
        this.selectEmoji(emoji);
      });
    });
  }

  renderSearchResults(results) {
    if (!this.content) return;
    
    if (results.length === 0) {
      this.content.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">No emojis found</div>';
      return;
    }
    
    this.content.innerHTML = `
      <div class="to-emoji-picker-group">
        <div class="to-emoji-picker-group-title">Search Results</div>
        <div class="to-emoji-picker-grid">
          ${results.map(emoji => `
            <div class="to-emoji-item" data-emoji="${emoji.char}" title="${emoji.name}">
              ${emoji.char}
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    this.content.querySelectorAll('.to-emoji-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const emoji = item.dataset.emoji;
        this.selectEmoji(emoji);
      });
    });
  }

  selectEmoji(emoji) {
    this.recentEmojis = [emoji, ...this.recentEmojis.filter(e => e !== emoji)].slice(0, 10);
    
    const event = new CustomEvent('emoji-select', {
      detail: { emoji: emoji }
    });
    this.element.dispatchEvent(event);
    
    this.close();
  }

  getEmojiData() {
    return {
      'smileys': [
        { char: '😀', name: 'Grinning Face', group: 'Smileys', keywords: ['happy', 'smile'] },
        { char: '😃', name: 'Grinning Face with Big Eyes', group: 'Smileys' },
        { char: '😄', name: 'Grinning Face with Smiling Eyes', group: 'Smileys' },
        { char: '😁', name: 'Beaming Face with Smiling Eyes', group: 'Smileys' },
        { char: '😆', name: 'Grinning Squinting Face', group: 'Smileys' },
        { char: '😅', name: 'Grinning Face with Sweat', group: 'Smileys' },
        { char: '😂', name: 'Face with Tears of Joy', group: 'Smileys' },
        { char: '🤣', name: 'Rolling on the Floor Laughing', group: 'Smileys' },
        { char: '😊', name: 'Smiling Face with Smiling Eyes', group: 'Smileys' },
        { char: '😇', name: 'Smiling Face with Halo', group: 'Smileys' },
        { char: '🙂', name: 'Slightly Smiling Face', group: 'Smileys' },
        { char: '😉', name: 'Winking Face', group: 'Smileys' },
        { char: '😌', name: 'Relieved Face', group: 'Smileys' },
        { char: '😍', name: 'Smiling Face with Heart-Eyes', group: 'Smileys' },
        { char: '🥰', name: 'Smiling Face with Hearts', group: 'Smileys' },
        { char: '😘', name: 'Face Blowing a Kiss', group: 'Smileys' }
      ],
      'gestures': [
        { char: '👍', name: 'Thumbs Up', group: 'Gestures', keywords: ['like', 'good'] },
        { char: '👎', name: 'Thumbs Down', group: 'Gestures' },
        { char: '👌', name: 'OK Hand', group: 'Gestures' },
        { char: '✌️', name: 'Victory Hand', group: 'Gestures' },
        { char: '🤞', name: 'Crossed Fingers', group: 'Gestures' },
        { char: '🤟', name: 'Love-You Gesture', group: 'Gestures' },
        { char: '🤘', name: 'Sign of the Horns', group: 'Gestures' },
        { char: '👋', name: 'Waving Hand', group: 'Gestures' },
        { char: '👏', name: 'Clapping Hands', group: 'Gestures' },
        { char: '🙌', name: 'Raising Hands', group: 'Gestures' },
        { char: '👐', name: 'Open Hands', group: 'Gestures' },
        { char: '🤲', name: 'Palms Up Together', group: 'Gestures' }
      ],
      'food': [
        { char: '🍎', name: 'Red Apple', group: 'Food', keywords: ['fruit', 'apple'] },
        { char: '🍐', name: 'Pear', group: 'Food' },
        { char: '🍊', name: 'Tangerine', group: 'Food' },
        { char: '🍋', name: 'Lemon', group: 'Food' },
        { char: '🍌', name: 'Banana', group: 'Food' },
        { char: '🍉', name: 'Watermelon', group: 'Food' },
        { char: '🍇', name: 'Grapes', group: 'Food' },
        { char: '🍓', name: 'Strawberry', group: 'Food' },
        { char: '🫐', name: 'Blueberries', group: 'Food' },
        { char: '🍈', name: 'Melon', group: 'Food' },
        { char: '🍒', name: 'Cherries', group: 'Food' },
        { char: '🍑', name: 'Peach', group: 'Food' },
        { char: '🥭', name: 'Mango', group: 'Food' },
        { char: '🍍', name: 'Pineapple', group: 'Food' },
        { char: '🥥', name: 'Coconut', group: 'Food' },
        { char: '🥝', name: 'Kiwi Fruit', group: 'Food' }
      ],
      'animals': [
        { char: '🐶', name: 'Dog Face', group: 'Animals', keywords: ['pet', 'dog'] },
        { char: '🐱', name: 'Cat Face', group: 'Animals' },
        { char: '🐭', name: 'Mouse Face', group: 'Animals' },
        { char: '🐹', name: 'Hamster', group: 'Animals' },
        { char: '🐰', name: 'Rabbit Face', group: 'Animals' },
        { char: '🦊', name: 'Fox', group: 'Animals' },
        { char: '🐻', name: 'Bear', group: 'Animals' },
        { char: '🐼', name: 'Panda', group: 'Animals' },
        { char: '🐨', name: 'Koala', group: 'Animals' },
        { char: '🐯', name: 'Tiger Face', group: 'Animals' },
        { char: '🦁', name: 'Lion', group: 'Animals' },
        { char: '🐮', name: 'Cow Face', group: 'Animals' }
      ],
      'travel': [
        { char: '🚗', name: 'Automobile', group: 'Travel', keywords: ['car'] },
        { char: '🚕', name: 'Taxi', group: 'Travel' },
        { char: '🚙', name: 'SUV', group: 'Travel' },
        { char: '🚌', name: 'Bus', group: 'Travel' },
        { char: '🚎', name: 'Trolleybus', group: 'Travel' },
        { char: '🏎️', name: 'Racing Car', group: 'Travel' },
        { char: '🚓', name: 'Police Car', group: 'Travel' },
        { char: '🚑', name: 'Ambulance', group: 'Travel' },
        { char: '🚒', name: 'Fire Engine', group: 'Travel' },
        { char: '🚐', name: 'Minibus', group: 'Travel' },
        { char: '🚚', name: 'Delivery Truck', group: 'Travel' },
        { char: '🚛', name: 'Articulated Lorry', group: 'Travel' }
      ],
      'symbols': [
        { char: '❤️', name: 'Red Heart', group: 'Symbols', keywords: ['love'] },
        { char: '🧡', name: 'Orange Heart', group: 'Symbols' },
        { char: '💛', name: 'Yellow Heart', group: 'Symbols' },
        { char: '💚', name: 'Green Heart', group: 'Symbols' },
        { char: '💙', name: 'Blue Heart', group: 'Symbols' },
        { char: '💜', name: 'Purple Heart', group: 'Symbols' },
        { char: '🖤', name: 'Black Heart', group: 'Symbols' },
        { char: '🤍', name: 'White Heart', group: 'Symbols' },
        { char: '💔', name: 'Broken Heart', group: 'Symbols' },
        { char: '❣️', name: 'Heart Exclamation', group: 'Symbols' },
        { char: '💕', name: 'Two Hearts', group: 'Symbols' },
        { char: '💞', name: 'Revolving Hearts', group: 'Symbols' }
      ]
    };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-emoji-picker').forEach(picker => {
    picker.emojiPickerInstance = new TechOnEmojiPicker(picker);
  });
});