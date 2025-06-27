// main.js - extracted from inline scripts for maintainability
// Sticky nav shadow on scroll
window.addEventListener('scroll', function() {
  const nav = document.querySelector('nav');
  if (nav && window.scrollY > 10) {
    nav.classList.add('shadow-lg');
  } else if (nav) {
    nav.classList.remove('shadow-lg');
  }
});
// Smooth scroll for nav links
const navLinks = document.querySelectorAll('nav a[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});
// Parallax effect for hero
window.addEventListener('scroll', function() {
  const bg = document.querySelector('.parallax-bg');
  if (bg) {
    bg.style.transform = `translateY(${window.scrollY * 0.2}px)`;
  }
});
// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const input = newsletterForm.querySelector('input[type=email]');
    if (input && input.value) {
      const msg = document.createElement('div');
      msg.className = 'bg-green-100 text-green-800 p-2 rounded mt-2';
      msg.textContent = 'Thank you for subscribing!';
      msg.setAttribute('aria-live', 'polite');
      newsletterForm.parentNode.insertBefore(msg, newsletterForm.nextSibling);
      newsletterForm.reset();
      setTimeout(() => msg.remove(), 5000);
    }
  });
}
// Contact form spinner and honeypot
const contactForm = document.querySelector('#contact form');
if (contactForm) {
  // Add honeypot field
  var honeypot = document.createElement('input');
  honeypot.type = 'text';
  honeypot.name = 'website';
  honeypot.style.display = 'none';
  honeypot.tabIndex = '-1';
  contactForm.appendChild(honeypot);
  contactForm.addEventListener('submit', function(e) {
    if (honeypot.value) {
      e.preventDefault();
      return false;
    }
    e.preventDefault();
    const spinner = document.getElementById('formSpinner');
    if (spinner) spinner.classList.remove('hidden');
    setTimeout(function() {
      if (spinner) spinner.classList.add('hidden');
      var msg = document.createElement('div');
      msg.className = 'bg-green-100 text-green-800 p-4 rounded mb-4';
      msg.textContent = 'Thank you! Your message has been sent.';
      msg.setAttribute('aria-live', 'polite');
      contactForm.parentNode.insertBefore(msg, contactForm);
      contactForm.reset();
      setTimeout(function() { msg.remove(); }, 6000);
    }, 1200);
  });
}
// Back-to-top button logic
window.addEventListener('scroll', function() {
  const btn = document.getElementById('backToTop');
  if (window.scrollY > 300) {
    btn.classList.add('show');
  } else {
    btn.classList.remove('show');
  }
});
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  backToTopBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}
// Swiper slider (should be loaded after Swiper.js)
if (window.Swiper) {
  new Swiper('.testimonial-swiper', {
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    autoplay: { delay: 5000 },
  });
}
// Privacy Policy Modal logic
const privacyPolicyLink = document.getElementById('privacy-policy-link');
const privacyPolicyModal = document.getElementById('privacy-policy-modal');
const closePrivacyPolicyBtn = document.getElementById('close-privacy-policy');

function openPrivacyPolicyModal() {
  privacyPolicyModal.classList.remove('hidden');
  privacyPolicyModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  // Focus trap: focus modal
  privacyPolicyModal.querySelector('[tabindex="0"]').focus();
}

function closePrivacyPolicyModal() {
  privacyPolicyModal.classList.add('hidden');
  privacyPolicyModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  privacyPolicyLink.focus();
}

privacyPolicyLink.addEventListener('click', (e) => {
  e.preventDefault();
  openPrivacyPolicyModal();
});

closePrivacyPolicyBtn.addEventListener('click', closePrivacyPolicyModal);

// Close modal on ESC key
privacyPolicyModal.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePrivacyPolicyModal();
  }
});

// Close modal when clicking outside the dialog
privacyPolicyModal.addEventListener('mousedown', (e) => {
  if (e.target === privacyPolicyModal) {
    closePrivacyPolicyModal();
  }
});
// Navbar mobile menu logic (ensure icons swap correctly)
const navToggle = document.getElementById('nav-toggle');
const navHamburger = document.getElementById('nav-hamburger');
const navClose = document.getElementById('nav-close');
const mobileMenu = document.getElementById('mobile-menu');
const navbarLinks = document.getElementById('navbar-links');

navToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('flex');
  if (isOpen) {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
    navHamburger.classList.remove('hidden');
    navClose.classList.add('hidden');
    navToggle.setAttribute('aria-expanded', 'false');
  } else {
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.add('flex');
    navHamburger.classList.add('hidden');
    navClose.classList.remove('hidden');
    navToggle.setAttribute('aria-expanded', 'true');
    // Focus first link in mobile menu
    setTimeout(() => {
      mobileMenu.querySelector('a').focus();
    }, 100);
  }
});
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const navHamburger = document.getElementById('nav-hamburger');
  const navClose = document.getElementById('nav-close');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.add('hidden');
        navHamburger.classList.remove('hidden');
        navClose.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      } else {
        mobileMenu.classList.remove('hidden');
        navHamburger.classList.add('hidden');
        navClose.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
      }
    });
    // Optional: close menu when clicking outside or on a link
    mobileMenu.addEventListener('click', function (e) {
      if (e.target === mobileMenu) {
        mobileMenu.classList.add('hidden');
        navHamburger.classList.remove('hidden');
        navClose.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
    });
    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        navHamburger.classList.remove('hidden');
        navClose.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      });
    });
  }
});
