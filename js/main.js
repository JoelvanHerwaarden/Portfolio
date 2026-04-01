/* ==============================================
   main.js — Constructief Modelleur Website
   ============================================== */

(function () {
  'use strict';

  /* -----------------------------------------------
     NAV: scroll state
  ----------------------------------------------- */
  const nav = document.getElementById('nav');

  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* -----------------------------------------------
     NAV: hamburger menu (mobile)
  ----------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav__links');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);

    // Animate hamburger to X
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  /* -----------------------------------------------
     SMOOTH SCROLL for anchor links
  ----------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navHeight = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* -----------------------------------------------
     SCROLL REVEAL
  ----------------------------------------------- */
  const revealElements = document.querySelectorAll(
    '.dienst-card, .detail-block, .project-card, .contact__inner, .section-label, .diensten__title, .projecten__title'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger cards in a grid
          const siblings = Array.from(entry.target.parentElement.children).filter(
            c => c.classList.contains(entry.target.classList[0])
          );
          const idx = siblings.indexOf(entry.target);
          const delay = Math.min(idx * 80, 320);

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  /* -----------------------------------------------
     DIENST CARDS: click highlight + active nav
  ----------------------------------------------- */
  document.querySelectorAll('.dienst-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const href = card.getAttribute('href');
      const target = document.querySelector(href);
      if (!target) return;

      // Briefly flash target border
      target.style.transition = 'box-shadow 0.3s ease';
      target.style.boxShadow  = '0 0 0 2px var(--accent)';
      setTimeout(() => {
        target.style.boxShadow = '';
      }, 1200);
    });
  });

  /* -----------------------------------------------
     HERO: subtle parallax on grid bg
  ----------------------------------------------- */
  const gridBg = document.querySelector('.hero__grid-bg');
  if (gridBg && window.matchMedia('(min-width: 900px)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      gridBg.style.transform = `translateY(${y * 0.15}px)`;
    }, { passive: true });
  }

  /* -----------------------------------------------
     TOOL TAGS: hover glow in hero
  ----------------------------------------------- */
  const toolSpans = document.querySelectorAll('.hero__tools span');
  let toolTimer;

  function cycleTool(idx) {
    toolSpans.forEach(s => s.style.opacity = '0.3');
    if (toolSpans[idx]) {
      toolSpans[idx].style.opacity = '0.9';
    }
    toolTimer = setTimeout(() => cycleTool((idx + 1) % toolSpans.length), 1400);
  }

  if (toolSpans.length) {
    toolTimer = setTimeout(() => cycleTool(0), 2000);
  }

  /* -----------------------------------------------
     ACTIVE NAV LINK on scroll (section highlight)
  ----------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - nav.offsetHeight - 60;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });

    navAnchors.forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === `#${current}`) {
        a.style.color = '#fff';
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* -----------------------------------------------
     CURSOR: accent dot on desktop
  ----------------------------------------------- */
  if (window.matchMedia('(pointer: fine)').matches) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      width: 6px; height: 6px;
      border-radius: 50%;
      background: #fd5e53;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: transform 0.15s ease, opacity 0.15s ease;
      opacity: 0;
    `;
    document.body.appendChild(dot);

    let mx = 0, my = 0;
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
      dot.style.opacity = '0.7';
    });

    // Hide when leaving window
    document.addEventListener('mouseleave', () => dot.style.opacity = '0');

    // Grow on interactive elements
    document.querySelectorAll('a, button, .dienst-card, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.style.transform = 'translate(-50%, -50%) scale(3)';
        dot.style.opacity   = '0.4';
      });
      el.addEventListener('mouseleave', () => {
        dot.style.transform = 'translate(-50%, -50%) scale(1)';
        dot.style.opacity   = '0.7';
      });
    });
  }

})();
