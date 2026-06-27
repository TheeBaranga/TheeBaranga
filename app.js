document.addEventListener('DOMContentLoaded', () => {
  // ════════════ THEME ENGINE ════════════
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle');
  // Load persistent theme (Defaulting to Dark Theme)
  const cachedTheme = localStorage.getItem('theme');
  const isDarkMode = cachedTheme ? (cachedTheme === 'dark') : true;
  if (isDarkMode) {
    htmlEl.classList.add('dark');
  } else {
    htmlEl.classList.remove('dark');
  }
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = htmlEl.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
  // ════════════ MOBILE NAVIGATION ════════════
  const menuToggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
  if (menuToggleBtn && mobileMenu) {
    menuToggleBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      menuToggleBtn.setAttribute('aria-expanded', isOpen);
    });
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuToggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
  // ════════════ SCROLL LISTENERS (HEADER & HIGHLIGHTS) ════════════
  const header = document.querySelector('.site-header');
  const sections = ['contact', 'blog', 'reviews', 'about', 'work', 'focus', 'hero'];
  const navLinks = document.querySelectorAll('.nav-list a.nl');
  function updateScrollState() {
    const scrollY = window.scrollY;
    // Toggle header scrolled styling
    if (header) {
      if (scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    // Determine active section link
    let activeSectionId = 'hero';
    const atBottom = (window.innerHeight + scrollY) >= document.body.scrollHeight - 60;
    if (atBottom) {
      activeSectionId = 'contact';
    } else {
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop - 130) {
          activeSectionId = id;
          break;
        }
      }
    }
    // Toggle active classes
    navLinks.forEach(link => {
      const href = link.getAttribute('href').substring(1);
      if (href === activeSectionId) {
        link.classList.add('on');
      } else {
        link.classList.remove('on');
      }
    });
  }
  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState(); // Trigger initial check
  // ════════════ SCROLL REVEAL (INTERSECTION OBSERVER) ════════════
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));
  // ════════════ DYNAMIC YEAR ════════════
  const yrEl = document.getElementById('yr');
  if (yrEl) yrEl.textContent = new Date().getFullYear();
});
