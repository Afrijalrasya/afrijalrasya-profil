/* ═══════════════════════════════════════════════
   AFRIJAL RASYA PUTRA — Portfolio JavaScript
   ═══════════════════════════════════════════════ */

// ── NAV: Scroll + Hamburger ────────────────────
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});

// ── SCROLL REVEAL ─────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.scroll-reveal').forEach(el => {
  revealObserver.observe(el);
});

// ── SKILL BAR ANIMATION ───────────────────────
// Trigger skill bar fill when card becomes visible
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-card').forEach(card => {
  skillObserver.observe(card);
});

// ── SMOOTH SCROLL ─────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── CURSOR GLOW (subtle) ──────────────────────
// Add hover glow to project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// ── CERT VERTICAL CAROUSEL ────────────────────
const slides = document.querySelectorAll('.cert-slide');
const dots   = document.querySelectorAll('.cert-dot');
const prevBtn = document.getElementById('certPrev');
const nextBtn = document.getElementById('certNext');
let currentSlide = 0;

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
dots.forEach(dot => {
  dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.dot)));
});

// Auto-advance every 5s
let autoPlay = setInterval(() => goToSlide(currentSlide + 1), 5000);
document.getElementById('certCarousel')?.addEventListener('mouseenter', () => clearInterval(autoPlay));
document.getElementById('certCarousel')?.addEventListener('mouseleave', () => {
  autoPlay = setInterval(() => goToSlide(currentSlide + 1), 5000);
});

// ── COUNTER ANIMATION ─────────────────────────
const counters = document.querySelectorAll('.stat-number');
let countersStarted = false;

const startCounters = () => {
  if (countersStarted) return;
  countersStarted = true;

  counters.forEach(counter => {
    const target = parseInt(counter.textContent);
    const suffix = counter.textContent.replace(/\d/g, '');
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target + suffix;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current) + suffix;
      }
    }, 30);
  });
};

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) startCounters();
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);
