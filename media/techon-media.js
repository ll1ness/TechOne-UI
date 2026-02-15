class TechOnMedia {
  constructor(element) {
    this.element = element;
    this.type = element.dataset.type || 'image';
    this.src = element.dataset.src;
    this.poster = element.dataset.poster;
    this.aspect = element.dataset.aspect;
    this.fit = element.dataset.fit || 'cover';
    this.controls = element.dataset.controls === 'true';
    this.autoplay = element.dataset.autoplay === 'true';
    this.loop = element.dataset.loop === 'true';
    this.muted = element.dataset.muted === 'true';
    
    this.element.setAttribute('data-aspect', this.aspect);
    this.element.setAttribute('data-fit', this.fit);
    
    this.init();
  }

  init() {
    if (this.type === 'video' && this.controls) {
      this.setupVideoControls();
    }
  }

  setupVideoControls() {
    const video = this.element.querySelector('video');
    if (!video) return;

    const controls = document.createElement('div');
    controls.className = 'to-media-controls';

    const playBtn = document.createElement('button');
    playBtn.className = 'to-media-control';
    playBtn.innerHTML = '▶';
    playBtn.onclick = () => {
      if (video.paused) {
        video.play();
        playBtn.innerHTML = '⏸';
      } else {
        video.pause();
        playBtn.innerHTML = '▶';
      }
    };

    const timeCurrent = document.createElement('span');
    timeCurrent.className = 'to-media-time';
    timeCurrent.textContent = '0:00';

    const progress = document.createElement('div');
    progress.className = 'to-media-progress';
    
    const progressFill = document.createElement('div');
    progressFill.className = 'to-media-progress-fill';
    progress.appendChild(progressFill);

    const timeDuration = document.createElement('span');
    timeDuration.className = 'to-media-time';
    timeDuration.textContent = '0:00';

    const muteBtn = document.createElement('button');
    muteBtn.className = 'to-media-control';
    muteBtn.innerHTML = video.muted ? '🔇' : '🔊';
    muteBtn.onclick = () => {
      video.muted = !video.muted;
      muteBtn.innerHTML = video.muted ? '🔇' : '🔊';
    };

    const fullscreenBtn = document.createElement('button');
    fullscreenBtn.className = 'to-media-control';
    fullscreenBtn.innerHTML = '⛶';
    fullscreenBtn.onclick = () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        this.element.requestFullscreen();
      }
    };

    controls.appendChild(playBtn);
    controls.appendChild(timeCurrent);
    controls.appendChild(progress);
    controls.appendChild(timeDuration);
    controls.appendChild(muteBtn);
    controls.appendChild(fullscreenBtn);

    this.element.appendChild(controls);

    video.addEventListener('timeupdate', () => {
      const percent = (video.currentTime / video.duration) * 100;
      progressFill.style.width = `${percent}%`;
      timeCurrent.textContent = this.formatTime(video.currentTime);
    });

    video.addEventListener('loadedmetadata', () => {
      timeDuration.textContent = this.formatTime(video.duration);
    });

    progress.addEventListener('click', (e) => {
      const rect = progress.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      video.currentTime = pos * video.duration;
    });
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  play() {
    const video = this.element.querySelector('video');
    if (video) video.play();
  }

  pause() {
    const video = this.element.querySelector('video');
    if (video) video.pause();
  }

  setSrc(src) {
    this.src = src;
    const media = this.element.querySelector('img, video, iframe');
    if (media) {
      if (media.tagName === 'IMG' || media.tagName === 'VIDEO') {
        media.src = src;
      } else if (media.tagName === 'IFRAME') {
        media.src = src;
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-media').forEach(media => {
    media.mediaInstance = new TechOnMedia(media);
  });
});