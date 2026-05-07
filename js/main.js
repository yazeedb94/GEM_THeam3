// ── PARTICLES ──
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      animation-duration: ${Math.random() * 15 + 8}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: ${Math.random() * 0.6 + 0.2};
    `;
    container.appendChild(p);
  }
}

// ── NAV SCROLL ──
function initNav() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ── MOBILE MENU ──
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn   = document.getElementById('mobile-close');
  if (!hamburger) return;
  hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
  closeBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobileMenu.classList.remove('open'))
  );
}

// ── INTERSECTION OBSERVER (reveal) ──
function initReveal() {
  const items = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => obs.observe(el));
}

// ── COUNTER ANIMATION ──
function animateCounter(el, target, suffix = '') {
  const duration = 2000;
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el     = e.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => obs.observe(el));
}

// ── SMOOTH ACTIVE NAV ──
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--purple-light)' : '';
    });
  }, { passive: true });
}

// ── FORM SUBMIT ──
function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('form-submit-btn');
    const t   = typeof translations !== 'undefined' ? translations[currentLang] : {};
    btn.textContent = t['form.success'] || '✅ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #16a34a, #22c55e)';
    setTimeout(() => {
      btn.innerHTML = t['form.submit'] || 'Send Message →';
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  initLang();        // Language FIRST (sets dir/font)
  initParticles();
  initNav();
  initMobileMenu();
  initReveal();
  initCounters();
  initActiveNav();
  initForm();
});

