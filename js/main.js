AOS.init({ duration: 800, once: true, offset: 60 });

// Nav scroll shadow
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger
const hamburger = document.querySelector('.nav__hamburger');
const mobileMenu = document.querySelector('.nav__mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
});

document.querySelectorAll('.nav__mobile-link, .nav__mobile-menu .btn').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

// FAQ accordion
document.querySelectorAll('.faq-item__btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-item__btn').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.style.maxHeight = '0';
    });
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// Carrossel
(function () {
  const track = document.getElementById('carouselTrack');
  if (!track) return;

  const items = Array.from(track.children);
  const prevBtn = document.querySelector('.carousel__btn--prev');
  const nextBtn = document.querySelector('.carousel__btn--next');
  let current = 0;

  function getPerPage() {
    return window.innerWidth <= 768 ? 2 : 3;
  }

  function update() {
    const perPage = getPerPage();
    const itemWidth = track.parentElement.offsetWidth / perPage;
    track.style.transform = `translateX(-${current * itemWidth}px)`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= items.length - perPage;
  }

  prevBtn.addEventListener('click', () => { if (current > 0) { current--; update(); } });
  nextBtn.addEventListener('click', () => {
    const perPage = getPerPage();
    if (current < items.length - perPage) { current++; update(); }
  });

  window.addEventListener('resize', () => {
    const perPage = getPerPage();
    if (current > items.length - perPage) current = Math.max(0, items.length - perPage);
    update();
  });

  update();
})();
