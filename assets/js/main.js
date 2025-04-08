/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')
function linkAction(){
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className
    for(let i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}
skillsHeader.forEach((el) => el.addEventListener('click', toggleSkills))

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)
        tabContents.forEach(tc => tc.classList.remove('qualification__active'))
        target.classList.add('qualification__active')
        tabs.forEach(t => t.classList.remove('qualification__active'))
        tab.classList.add('qualification__active')
    })
})

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
}
modalBtns.forEach((btn, i) => btn.addEventListener('click', () => modal(i)))
modalCloses.forEach(close => close.addEventListener('click', () => {
    modalViews.forEach(view => view.classList.remove('active-modal'))
}))

/*==================== CERTIFICADOS MODAL ====================*/
const certModalViews = document.querySelectorAll('.qualification__modal'),
      certModalBtns = document.querySelectorAll('.qualification__button-cert'),
      certModalCloses = document.querySelectorAll('.qualification__modal-close')

let showCertModal = function(modalClick){
    certModalViews[modalClick].classList.add('active-modal')
}

certModalBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        showCertModal(i)
    })
})

certModalCloses.forEach((close) => {
    close.addEventListener('click', () => {
        certModalViews.forEach((modal) => {
            modal.classList.remove('active-modal')
        })
    })
})

// PORTFOLIO Swiper
let swiperPortfolio = new Swiper('.portfolio__container', {
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

// TESTIMONIALES Swiper
let swiperTestimonial = new Swiper('.testimonial__container', {
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


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute('id');
    const link = document.querySelector(".nav__link[href='#" + sectionId + "']");

    if(link){
      if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
        link.classList.add('active-link');
      } else {
        link.classList.remove('active-link');
      }
    }
  });
}
window.addEventListener('scroll', scrollActive);



/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const nav = document.getElementById('header')
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== SHOW SOCIAL BANNER ONLY IN HOME ====================*/
const banner = document.getElementById('social-banner');
const homeSection = document.getElementById('home');

function toggleBannerOnScroll() {
    const homeRect = homeSection.getBoundingClientRect();
    
    if (homeRect.top <= window.innerHeight && homeRect.bottom >= 0) {
        banner.classList.add('show');
    } else {
        banner.classList.remove('show');
    }
}
window.addEventListener('scroll', toggleBannerOnScroll);
document.addEventListener('DOMContentLoaded', toggleBannerOnScroll)

/*==================== DARK / LIGHT / AGUS THEME ====================*/
const themeButton = document.getElementById('theme-button')
const agusThemeButton = document.getElementById('agus-theme-button');
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'
const agusThemeClass = 'agus-theme'

// Guardados
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')
const selectedAgusTheme = localStorage.getItem('selected-agus-theme')

// Funciones para guardar
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-sun' : 'uil-moon'

// Cargar tema guardado
if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-sun' ? 'add' : 'remove'](iconTheme)
}
if (selectedAgusTheme === 'true') {
  document.body.classList.add(agusThemeClass)
}

// Activar modo Agus
agusThemeButton.addEventListener('click', () => {
  document.body.classList.remove(darkTheme)
  themeButton.classList.remove(iconTheme)
  document.body.classList.toggle(agusThemeClass)
  localStorage.setItem('selected-agus-theme', document.body.classList.contains(agusThemeClass))
  localStorage.setItem('selected-theme', 'light')
  localStorage.setItem('selected-icon', 'uil-sun')
})

// Activar modo oscuro
themeButton.addEventListener('click', () => {
  document.body.classList.remove(agusThemeClass)
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)
  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.setItem('selected-icon', getCurrentIcon())
  localStorage.setItem('selected-agus-theme', false)
})


/*==================== FORM CONFIRMATION MESSAGE ====================*/
const form = document.getElementById('contact-form');
const message = document.getElementById('form-message');
form.addEventListener('submit', async (e) => {
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

/*==================== FADE IN ON SCROLL ====================*/
const fadeElements = document.querySelectorAll('.fade-in-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.1 });
fadeElements.forEach(el => observer.observe(el));

/*==================== SCROLL REVEAL ANIMATION ====================*/
/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
  distance: '50px',
  duration: 1000,
  delay: 200,
  reset: false,
});

// Animación de aparición para texto e imagen
sr.reveal('.home__data', { origin: 'left' });
sr.reveal('.home__img', { origin: 'right' });

/*==================== CAMBIO DE IDIOMA ====================*/
const languageButton = document.getElementById('language-button');
let currentLang = localStorage.getItem('selected-lang') || 'es';

function updateLanguage(lang) {
  document.querySelectorAll('[data-es], [data-en]').forEach(el => {
    el.innerHTML = el.getAttribute(`data-${lang}`);
  });
  localStorage.setItem('selected-lang', lang);
  currentLang = lang;
}

languageButton.addEventListener('click', () => {
  const newLang = currentLang === 'es' ? 'en' : 'es';
  updateLanguage(newLang);
});

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  updateLanguage(currentLang);
});
