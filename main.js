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
// Newsletter form simple handler (replace with real integration as needed)
const newsletterFormSimple = document.getElementById('newsletter-form');
if (newsletterFormSimple) {
  newsletterFormSimple.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    const successMsg = document.getElementById('newsletter-success');
    if (emailInput.value && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailInput.value)) {
      successMsg.classList.remove('hidden');
      emailInput.value = '';
      setTimeout(() => successMsg.classList.add('hidden'), 5000);
    } else {
      emailInput.classList.add('border-red-500');
      setTimeout(() => emailInput.classList.remove('border-red-500'), 2000);
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
// Contact form validation feedback
const contactFormValidation = document.querySelector('form[autocomplete="off"]');
if (contactFormValidation) {
  contactFormValidation.addEventListener('submit', function (e) {
    let valid = true;
    const name = contactFormValidation.querySelector('#contact-name');
    const email = contactFormValidation.querySelector('#contact-email');
    const message = contactFormValidation.querySelector('#contact-message');
    const nameError = contactFormValidation.querySelector('#name-error');
    const emailError = contactFormValidation.querySelector('#email-error');
    const messageError = contactFormValidation.querySelector('#message-error');
    // Name
    if (!name.value.trim()) {
      nameError.classList.remove('hidden');
      valid = false;
    } else {
      nameError.classList.add('hidden');
    }
    // Email
    if (!email.value.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
      emailError.classList.remove('hidden');
      valid = false;
    } else {
      emailError.classList.add('hidden');
    }
    // Message
    if (!message.value.trim()) {
      messageError.classList.remove('hidden');
      valid = false;
    } else {
      messageError.classList.add('hidden');
    }
    if (!valid) {
      e.preventDefault();
    }
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
// Accessibility and focus trap for mobile menu
function trapFocus(element) {
  const focusableEls = element.querySelectorAll('a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];
  function handleTab(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          e.preventDefault();
          lastFocusableEl.focus();
        }
      } else {
        if (document.activeElement === lastFocusableEl) {
          e.preventDefault();
          firstFocusableEl.focus();
        }
      }
    }
    if (e.key === 'Escape') {
      element.classList.add('hidden');
      document.getElementById('nav-hamburger').classList.remove('hidden');
      document.getElementById('nav-close').classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      document.getElementById('nav-toggle').focus();
      element.removeEventListener('keydown', handleTab);
    }
  }
  element.addEventListener('keydown', handleTab);
}

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
        // Focus trap
        setTimeout(() => {
          const firstLink = mobileMenu.querySelector('a');
          if (firstLink) firstLink.focus();
          trapFocus(mobileMenu);
        }, 100);
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

  // Rotating hero image from stock images
  (function() {
    // List of stock images (add/remove as needed)
    const stockImages = [
      'img/stock/afro-woman-holding-bucket-with-cleaning-items.jpg',
      'img/stock/freepik__a-black-woman-age-25-with-curly-hair-holding-a-blu__36735.png',
      'img/stock/freepik__a-black-woman-age-25-with-curly-hair-holding-a-blu__36736.png',
      'img/stock/freepik__a-black-woman-age-25-with-curly-hair-holding-a-blu__36737.png',
      'img/stock/freepik__a-black-woman-age-25-with-curly-hair-holding-a-blu__36738.png',
      'img/stock/front-view-man-cleaning-indoors.jpg',
      'img/stock/full-shot-man-pushing-elevator-button.jpg',
      'img/stock/full-shot-men-cleaning-office.jpg',
      'img/stock/hand-holding-stand-with-cleaning-products.jpg',
      'img/stock/hero-cleaning.jpg',
      'img/stock/side-view-adult-male-cleaning-window.jpg',
      'img/stock/side-view-man-cleaning-table.jpg',
      'img/stock/woman-is-holding-cleaning-product-gloves-rags-basin-white-wall.jpg'
    ];
    // Default timer in hours (can be changed to 3, 6, 2, 24, etc.)
    const TIMER_HOURS = 6; // Change this value as needed
    const TIMER_MS = TIMER_HOURS * 60 * 60 * 1000;
    // Use localStorage to persist the current image and timestamp
    function getCurrentIndex() {
      const data = JSON.parse(localStorage.getItem('heroImageData') || '{}');
      const now = Date.now();
      if (!data.timestamp || !data.index || now - data.timestamp > TIMER_MS) {
        // Pick a new random image index
        let newIndex = Math.floor(Math.random() * stockImages.length);
        // Avoid repeating the same image
        if (data.index !== undefined && stockImages.length > 1 && newIndex === data.index) {
          newIndex = (newIndex + 1) % stockImages.length;
        }
        localStorage.setItem('heroImageData', JSON.stringify({ index: newIndex, timestamp: now }));
        return newIndex;
      }
      return data.index;
    }
    function setHeroImage() {
      const heroImg = document.querySelector('.parallax-bg');
      if (heroImg) {
        const idx = getCurrentIndex();
        heroImg.src = stockImages[idx];
      }
    }
    document.addEventListener('DOMContentLoaded', setHeroImage);
  })();
});
