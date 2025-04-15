document.addEventListener('DOMContentLoaded', () => {
  /*==================== MENÚ ====================*/
  const navToggle = document.getElementById('nav-toggle'),
        navMenu = document.getElementById('nav-menu'),
        navClose = document.getElementById('nav-close');

  const dropdown = document.querySelector('.nav__dropdown');
  const dropdownLink = dropdown?.querySelector('.nav__link');
  const submenu = dropdown?.querySelector('.nav__submenu');
  const arrow = dropdown?.querySelector('.nav__arrow');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show-menu');
    });
  }

  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  }

  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        navMenu.classList.remove('show-menu');
        submenu?.classList.remove('show-submenu');
        arrow?.classList.remove('arrow-rotated');
      }
    });
  });

  // ✅ Cierra el menú si se hace clic fuera
  document.addEventListener('click', e => {
    const isClickInside = navMenu.contains(e.target) || navToggle.contains(e.target);
    if (!isClickInside && navMenu.classList.contains('show-menu')) {
      navMenu.classList.remove('show-menu');
      submenu?.classList.remove('show-submenu');
      arrow?.classList.remove('arrow-rotated');
    }
  });

  if (dropdownLink && submenu && arrow) {
    dropdownLink.addEventListener('click', e => {
      if (window.innerWidth < 768) {
        e.preventDefault();
        submenu.classList.toggle('show-submenu');
        arrow.classList.toggle('arrow-rotated');
      }
    });
  }

  /*==================== SKILLS ====================*/
  const skillsContent = document.getElementsByClassName('skills__content');
  const skillsHeader = document.querySelectorAll('.skills__header');

  function toggleSkills() {
    let itemClass = this.parentNode.className;
    for (let i = 0; i < skillsContent.length; i++) {
      skillsContent[i].className = 'skills__content skills__close';
    }
    if (itemClass === 'skills__content skills__close') {
      this.parentNode.className = 'skills__content skills__open';
    }
  }

  skillsHeader.forEach(el => el.addEventListener('click', toggleSkills));

  /*==================== TABS ====================*/
  const tabs = document.querySelectorAll('[data-target]');
  const tabContents = document.querySelectorAll('[data-content]');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = document.querySelector(tab.dataset.target);
      tabContents.forEach(tc => tc.classList.remove('qualification__active'));
      tabs.forEach(t => t.classList.remove('qualification__active'));
      target.classList.add('qualification__active');
      tab.classList.add('qualification__active');
    });
  });

  /*==================== MODALES ====================*/
  const modalViews = document.querySelectorAll('.services__modal'),
        modalBtns = document.querySelectorAll('.services__button'),
        modalCloses = document.querySelectorAll('.services__modal-close');

  modalBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      modalViews[i].classList.add('active-modal');
    });
  });

  modalCloses.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.services__modal').classList.remove('active-modal');
    });
  });

  modalViews.forEach(modal => {
    modal.addEventListener('click', e => {
      if (!e.target.closest('.services__modal-content')) {
        modal.classList.remove('active-modal');
      }
    });
  });

  /*==================== CERTIFICADOS ====================*/
  const certModals = document.querySelectorAll('.qualification__modal'),
        certBtns = document.querySelectorAll('.qualification__button-cert'),
        certCloses = document.querySelectorAll('.qualification__modal-close');

  certBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      certModals[i].classList.add('active-modal');
    });
  });

  certCloses.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.qualification__modal').classList.remove('active-modal');
    });
  });

  certModals.forEach(modal => {
    modal.addEventListener('click', e => {
      if (!e.target.closest('.qualification__modal-content')) {
        modal.classList.remove('active-modal');
      }
    });
  });

  /*==================== SWIPER ====================*/
  new Swiper('.portfolio__container', {
    cssMode: true,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next-portfolio',
      prevEl: '.swiper-button-prev-portfolio',
    },
    pagination: {
      el: '.swiper-pagination-portfolio',
      clickable: true,
    },
  });

  new Swiper('.testimonial__container', {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,
    pagination: {
      el: '.swiper-pagination-testimonial',
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      568: { slidesPerView: 2 }
    }
  });

  /*==================== SCROLL SECTIONS ACTIVE ====================*/
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionTop = current.offsetTop - 50;
      const sectionHeight = current.offsetHeight;
      const sectionId = current.getAttribute('id');
      const link = document.querySelector(`.nav__link[href="#${sectionId}"]`);
      if (link) {
        link.classList.toggle('active-link', scrollY > sectionTop && scrollY <= sectionTop + sectionHeight);
      }
    });
  });

  /*==================== HEADER BG ====================*/
  window.addEventListener('scroll', () => {
    document.getElementById('header').classList.toggle('scroll-header', window.scrollY >= 80);
    document.getElementById('scroll-up')?.classList.toggle('show-scroll', window.scrollY >= 560);
  });

  /*==================== SOCIAL BANNER ====================*/
  const banner = document.getElementById('social-banner');
  const home = document.getElementById('home');
  if (home && banner) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => banner.classList.toggle('show', entry.isIntersecting));
    }, { threshold: 0.3 });
    observer.observe(home);
  }

  /*==================== THEMES ====================*/
  const themeBtn = document.getElementById('theme-button');
  const agusBtn = document.getElementById('agus-theme-button');
  const darkTheme = 'dark-theme';
  const agusTheme = 'agus-theme';

  const selectedTheme = localStorage.getItem('selected-theme');
  const selectedIcon = localStorage.getItem('selected-icon');
  const selectedAgusTheme = localStorage.getItem('selected-agus-theme');

  if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeBtn?.classList[selectedIcon === 'uil-sun' ? 'add' : 'remove']('uil-sun');
  }
  if (selectedAgusTheme === 'true') {
    document.body.classList.add(agusTheme);
  }

  agusBtn?.addEventListener('click', () => {
    document.body.classList.remove(darkTheme);
    themeBtn?.classList.remove('uil-sun');
    document.body.classList.toggle(agusTheme);
    localStorage.setItem('selected-agus-theme', document.body.classList.contains(agusTheme));
    localStorage.setItem('selected-theme', 'light');
    localStorage.setItem('selected-icon', 'uil-sun');
  });

  themeBtn?.addEventListener('click', () => {
    document.body.classList.remove(agusTheme);
    document.body.classList.toggle(darkTheme);
    themeBtn.classList.toggle('uil-sun');
    localStorage.setItem('selected-theme', document.body.classList.contains(darkTheme) ? 'dark' : 'light');
    localStorage.setItem('selected-icon', themeBtn.classList.contains('uil-sun') ? 'uil-sun' : 'uil-moon');
    localStorage.setItem('selected-agus-theme', false);
  });

  /*==================== FORM ====================*/
  const form = document.getElementById('contact-form');
  const message = document.getElementById('form-message');
  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      form.reset();
      message.style.display = 'block';
    }
  });

  /*==================== FADE IN ====================*/
  const fadeElements = document.querySelectorAll('.fade-in-up');
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('in-view'));
  }, { threshold: 0.1 });
  fadeElements.forEach(el => fadeObserver.observe(el));

  /*==================== SCROLL REVEAL ====================*/
  ScrollReveal().reveal('.home__data', { origin: 'left', distance: '50px', duration: 1000, delay: 200 });
  ScrollReveal().reveal('.home__img', { origin: 'right', distance: '50px', duration: 1000, delay: 200 });

  /*==================== CAMBIO DE IDIOMA ====================*/
  const languageButton = document.getElementById('language-button');
  let currentLang = localStorage.getItem('selected-lang') || 'es';

  function updateLanguage(lang) {
    document.querySelectorAll('[data-es], [data-en]').forEach(el => {
      el.innerHTML = el.getAttribute(`data-${lang}`) || el.innerHTML;
    });
    localStorage.setItem('selected-lang', lang);
    currentLang = lang;
  }

  languageButton?.addEventListener('click', () => {
    updateLanguage(currentLang === 'es' ? 'en' : 'es');
  });

  updateLanguage(currentLang);
});
