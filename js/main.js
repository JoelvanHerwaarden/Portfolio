/* ─── NAV SCROLL ─────────────────────────────────────────────── */
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);

  // Highlight active nav link
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

/* ─── HAMBURGER ──────────────────────────────────────────────── */
const hamburger = document.querySelector('.nav-hamburger');
const navLinksContainer = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const open = navLinksContainer.style.display === 'flex';
    navLinksContainer.style.cssText = open
      ? ''
      : 'display:flex;flex-direction:column;position:fixed;top:72px;left:0;right:0;background:white;padding:1.5rem 2rem;border-bottom:1px solid #e2e8f0;gap:1rem;z-index:99;';
  });
}

/* ─── INTERSECTION OBSERVER ──────────────────────────────────── */
const animEls = document.querySelectorAll('.anim');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.12 });
animEls.forEach(el => observer.observe(el));

/* ─── PROGRESS BARS ANIMATION ────────────────────────────────── */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.prog-bar').forEach(bar => {
        const w = bar.dataset.width;
        if (w) { setTimeout(() => { bar.style.width = w; }, 200); }
      });
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.progress-row').forEach(el => barObserver.observe(el));

/* ─── CONTACT FORM ───────────────────────────────────────────── */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = '✓ Message sent!';
    btn.style.background = '#16a34a';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3500);
  });
}

/* ─── SMOOTH SCROLL NAV ──────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (navLinksContainer.style.display === 'flex') navLinksContainer.style.cssText = '';
    }
  });
});
