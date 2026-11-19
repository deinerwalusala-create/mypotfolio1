/* ============================================
   DEINER WALUSALA – DATA SCIENCE PORTFOLIO
   Vanilla JavaScript | Interactive Features
   ============================================ */

(function () {
  'use strict';

  /* ---------- DOM References ---------- */
  const loader = document.getElementById('loader');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navLinks');
  const themeToggle = document.getElementById('themeToggle');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('backToTop');
  const typingText = document.getElementById('typingText');
  const yearSpan = document.getElementById('year');
  const projectsGrid = document.getElementById('projectsGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const cursorFollower = document.getElementById('cursor-follower');

  /* ---------- Project Data ---------- */
  const projectsData = [
    {
      title: 'Student Performance Analytics',
      description: 'An analytical project designed to examine student academic performance, attendance, study habits and academic risk factors.',
      tech: ['Python', 'Pandas', 'Streamlit', 'Matplotlib'],
      features: [
        'Student performance analysis',
        'Attendance analysis',
        'Department & gender filtering',
        'Identification of at-risk students',
        'Interactive analytical dashboard'
      ]
    },
    {
      title: 'Business Sales Analytics',
      description: 'An analytical project focused on understanding business sales performance and identifying trends through data analysis.',
      tech: ['Python', 'Pandas', 'Matplotlib'],
      features: [
        'Sales performance analysis',
        'Data cleaning',
        'Revenue analysis',
        'Trend identification',
        'Data visualization'
      ]
    },
    {
      title: 'Cybersecurity Data Analysis',
      description: 'A statistical analysis project exploring cybersecurity awareness, employee training and security performance.',
      tech: ['PSPP', 'SPSS', 'Statistical Analysis'],
      features: [
        'Data preparation',
        'Variable labeling',
        'Frequency distributions',
        'Descriptive statistics',
        'Pre/post-training comparisons',
        'Statistical interpretation'
      ]
    }
  ];

  /* ---------- Loader ---------- */
  function initLoader() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
      }, 800);
    });
    // Fallback if load event already fired
    if (document.readyState === 'complete') {
      setTimeout(() => loader.classList.add('hidden'), 800);
    }
  }

  /* ---------- Dynamic Year ---------- */
  function setYear() {
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  }

  /* ---------- Theme Toggle ---------- */
  function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
      updateThemeIcon(saved);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    if (!themeToggle) return;

    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
  }

  /* ---------- Typing Effect ---------- */
  function initTyping() {
    if (!typingText) return;

    const phrases = [
      'Aspiring Data Scientist',
      'Data Analyst',
      'Python Programmer',
      'Machine Learning Enthusiast',
      'Statistical Computing Enthusiast'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout;

    function type() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400;
      }

      typingTimeout = setTimeout(type, typeSpeed);
    }

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      typingText.textContent = phrases[0];
      return;
    }

    type();
  }

  /* ---------- Mobile Navigation ---------- */
  function initMobileNav() {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
      const expanded = hamburger.classList.contains('active');
      hamburger.setAttribute('aria-expanded', expanded);
    });

    // Close on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Section Pages ---------- */
  function initPageNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const pageIds = new Set(Array.from(sections, section => section.id));
    const requestedPage = new URLSearchParams(window.location.search).get('page') || 'home';
    const currentPage = pageIds.has(requestedPage) ? requestedPage : 'home';

    sections.forEach(section => {
      section.hidden = section.id !== currentPage;
    });

    navLinks.forEach(link => {
      const isCurrentPage = link.dataset.page === currentPage;
      link.classList.toggle('active', isCurrentPage);
      if (isCurrentPage) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    if (currentPage !== requestedPage) {
      const url = new URL(window.location.href);
      url.searchParams.set('page', currentPage);
      window.history.replaceState(null, '', url);
    }

    if (currentPage !== 'home') {
      const pageLink = document.querySelector(`.nav-link[data-page="${currentPage}"]`);
      if (pageLink) document.title = `${pageLink.textContent.trim()} | Deiner Walusala`;
    }
  }

  /* ---------- Scroll Progress ---------- */
  function initScrollProgress() {
    if (!scrollProgress) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgress.style.width = percent + '%';
    }, { passive: true });
  }

  /* ---------- Back to Top ---------- */
  function initBackToTop() {
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Navbar Scrolled State ---------- */
  function initNavbarScroll() {
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ---------- Reveal Animations (IntersectionObserver) ---------- */
  function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      reveals.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  /* ---------- Project Filtering ---------- */
  function initProjectFilters() {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        const cards = document.querySelectorAll('.project-card');

        cards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('hidden');
            card.style.animation = 'none';
            // Force reflow for animation restart
            void card.offsetWidth;
            card.style.animation = 'modalIn 0.4s ease';
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ---------- Project Details Modal ---------- */
  function initProjectModal() {
    if (!modal || !modalClose) return;

    const viewBtns = document.querySelectorAll('.view-details');

    viewBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.project, 10);
        const project = projectsData[index];
        if (!project) return;

        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.description;

        const techContainer = document.getElementById('modalTech');
        techContainer.innerHTML = project.tech.map(t => `<span>${t}</span>`).join('');

        const featuresContainer = document.getElementById('modalFeatures');
        featuresContainer.innerHTML = project.features.map(f => `<li>${f}</li>`).join('');

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  /* ---------- Contact Form Validation ---------- */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const fields = {
      fullName: { el: document.getElementById('fullName'), error: document.getElementById('nameError'), name: 'Name' },
      email: { el: document.getElementById('email'), error: document.getElementById('emailError'), name: 'Email' },
      subject: { el: document.getElementById('subject'), error: document.getElementById('subjectError'), name: 'Subject' },
      message: { el: document.getElementById('message'), error: document.getElementById('messageError'), name: 'Message' }
    };

    function clearErrors() {
      Object.values(fields).forEach(f => {
        f.error.textContent = '';
        f.el.style.borderColor = '';
      });
    }

    function validateField(key) {
      const field = fields[key];
      const value = field.el.value.trim();
      let valid = true;

      if (!value) {
        field.error.textContent = `${field.name} is required.`;
        field.el.style.borderColor = '#EF4444';
        valid = false;
      } else if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        field.error.textContent = 'Please enter a valid email address.';
        field.el.style.borderColor = '#EF4444';
        valid = false;
      } else if (key === 'fullName' && value.length < 2) {
        field.error.textContent = 'Name must be at least 2 characters.';
        field.el.style.borderColor = '#EF4444';
        valid = false;
      } else if (key === 'message' && value.length < 10) {
        field.error.textContent = 'Message must be at least 10 characters.';
        field.el.style.borderColor = '#EF4444';
        valid = false;
      } else {
        field.el.style.borderColor = '';
        field.error.textContent = '';
      }

      return valid;
    }

    // Real-time validation on blur
    Object.keys(fields).forEach(key => {
      fields[key].el.addEventListener('blur', () => validateField(key));
      fields[key].el.addEventListener('input', () => {
        if (fields[key].error.textContent) {
          validateField(key);
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      let allValid = true;
      Object.keys(fields).forEach(key => {
        if (!validateField(key)) allValid = false;
      });

      if (allValid) {
        // In a real implementation, you would send data to Formspree or similar.
        // For now, show a clear message that the form is ready but not wired.
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check"></i> READY TO SEND (Configure Formspree)';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  }

  /* ---------- Floating Particles (Hero) ---------- */
  function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const count = window.innerWidth < 768 ? 15 : 35;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
      particle.style.animationDelay = (Math.random() * 10) + 's';
      particle.style.width = particle.style.height = (Math.random() * 2 + 1) + 'px';
      particle.style.opacity = Math.random() * 0.4 + 0.1;
      if (Math.random() > 0.5) {
        particle.style.background = 'var(--secondary)';
      }
      container.appendChild(particle);
    }
  }

  /* ---------- Custom Cursor Follower ---------- */
  function initCursorFollower() {
    if (!cursorFollower) return;

    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      cursorFollower.style.left = cursorX + 'px';
      cursorFollower.style.top = cursorY + 'px';
      requestAnimationFrame(animate);
    }

    animate();

    // Hover effect on interactive elements
    const interactiveEls = document.querySelectorAll('a, button, .project-card, .skill-category, .interest-card, .achievement-card');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.6)';
        cursorFollower.style.borderColor = 'var(--secondary)';
      });
      el.addEventListener('mouseleave', () => {
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.borderColor = 'var(--primary)';
      });
    });
  }

  /* ---------- Initialise All ---------- */
  function init() {
    document.body.style.overflow = 'hidden'; // prevent scroll during loader
    initLoader();
    setYear();
    initTheme();
    initPageNavigation();
    initTyping();
    initMobileNav();
    initScrollProgress();
    initBackToTop();
    initNavbarScroll();
    initReveal();
    initProjectFilters();
    initProjectModal();
    initContactForm();
    initParticles();
    initCursorFollower();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();