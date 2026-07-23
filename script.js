/* ============================================
   INVITACIÓN WEB – Mauricio & Ana Paola
   5 de Septiembre 2026
   ============================================ */

// ── PARÁMETROS URL ────────────────────────────
function getParam(name) {
  const url = new URLSearchParams(window.location.search);
  return url.get(name);
}

function initGuest() {
  const nombre    = getParam('nombre') || getParam('name') || 'Invitado Especial';
  const invitados = getParam('invitados') || getParam('pases') || '1';
  const nameEl    = document.getElementById('guestName');
  const countEl   = document.getElementById('guestCount');
  if (nameEl)  nameEl.textContent  = decodeURIComponent(nombre).replace(/\+/g, ' ');
  if (countEl) countEl.textContent = invitados;
}

// ── FULLSCREEN ────────────────────────────────
function requestFullscreen() {
  const el = document.documentElement;
  if (el.requestFullscreen)            el.requestFullscreen();
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  else if (el.mozRequestFullScreen)    el.mozRequestFullScreen();
  else if (el.msRequestFullscreen)     el.msRequestFullscreen();
}

// ── MÚSICA ────────────────────────────────────
function initMusic() {
  const btn     = document.getElementById('musicBtn');
  const audio   = document.getElementById('bgMusic');
  const iconPlay  = btn.querySelector('.music-icon-play');
  const iconPause = btn.querySelector('.music-icon-pause');
  const waves   = btn.querySelector('.music-waves');
  let playing = false;

  btn.addEventListener('click', () => {
    if (!playing) {
      audio.play().then(() => {
        playing = true;
        iconPlay.classList.add('hidden');
        iconPause.classList.remove('hidden');
        waves.classList.add('active');
        btn.classList.add('playing');
      }).catch(() => {});
    } else {
      audio.pause();
      playing = false;
      iconPlay.classList.remove('hidden');
      iconPause.classList.add('hidden');
      waves.classList.remove('active');
      btn.classList.remove('playing');
    }
  });

  // Mostrar botón al entrar
  window._showMusicBtn = () => {
    btn.classList.remove('hidden');
    // intento autoplay
    audio.volume = 0.5;
    audio.play().then(() => {
      playing = true;
      iconPlay.classList.add('hidden');
      iconPause.classList.remove('hidden');
      waves.classList.add('active');
      btn.classList.add('playing');
    }).catch(() => {});
  };
}

// ── COVER / ENTRADA ───────────────────────────
function initCover() {
  const cover    = document.getElementById('cover');
  const enterBtn = document.getElementById('enterBtn');
  const main     = document.getElementById('main');
  if (!cover || !enterBtn || !main) return;

  enterBtn.addEventListener('click', () => {
    requestFullscreen();
    cover.classList.add('fade-out');
    main.classList.remove('hidden');
    setTimeout(() => {
      cover.style.display = 'none';
      window.scrollTo({ top: 0, behavior: 'instant' });
      initReveal();
      initTimeline();
      initIconAnimations();
      initEventCards();
      if (window._showMusicBtn) window._showMusicBtn();
    }, 820);
  });
}

// ── COUNTDOWN ─────────────────────────────────
function initCountdown() {
  const weddingDate = new Date('2026-09-05T17:30:00');
  const daysEl    = document.getElementById('days');
  const hoursEl   = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  if (!daysEl) return;

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const diff = weddingDate - new Date();
    if (diff <= 0) {
      [daysEl, hoursEl, minutesEl, secondsEl].forEach(e => e.textContent = '00');
      return;
    }
    animateNumber(daysEl,    pad(Math.floor(diff / 86400000)));
    animateNumber(hoursEl,   pad(Math.floor((diff % 86400000) / 3600000)));
    animateNumber(minutesEl, pad(Math.floor((diff % 3600000) / 60000)));
    animateNumber(secondsEl, pad(Math.floor((diff % 60000) / 1000)));
  }
  tick();
  setInterval(tick, 1000);
}

function animateNumber(el, newVal) {
  if (el.textContent === newVal) return;
  el.classList.add('flip');
  setTimeout(() => {
    el.textContent = newVal;
    el.classList.remove('flip');
  }, 250);
}

// ── REVEAL ON SCROLL ──────────────────────────
function initReveal() {
  const elements = document.querySelectorAll('.reveal, .reveal-text');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));

  setTimeout(() => {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) el.classList.add('visible');
    });
  }, 100);
}

// ── TIMELINE ALTERNADO ────────────────────────
function initTimeline() {
  const items = document.querySelectorAll('.tl-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(items).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 150);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(item => observer.observe(item));
}

// ── ANIMACIÓN ICONOS ITINERARIO ───────────────
function initIconPulse() {
  const icons = document.querySelectorAll('.tl-icon svg');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('icon-pop');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  icons.forEach(icon => observer.observe(icon));
}

// ── PARALLAX HERO ─────────────────────────────
function initParallax() {
  const hero = document.querySelector('.hero-photo');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    hero.style.transform = `translateY(${window.scrollY * 0.2}px)`;
  }, { passive: true });
}

// ── ANIMACIÓN ICONOS ITINERARIO ───────────────
function initIconAnimations() {
  const icons = document.querySelectorAll('.reveal-icon');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const idx = Array.from(icons).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('icon-visible');
        }, idx * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  icons.forEach(icon => observer.observe(icon));
}

// ── ANIMACIÓN TARJETAS DE EVENTO ──────────────
function initEventCards() {
  const cards = document.querySelectorAll('.event-card');
  cards.forEach((card, i) => {
    card.style.setProperty('--delay', `${i * 0.1}s`);
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('card-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  cards.forEach(c => observer.observe(c));
}

// ── INIT ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initGuest();
  initCover();
  initCountdown();
  initParallax();
  initMusic();
});
