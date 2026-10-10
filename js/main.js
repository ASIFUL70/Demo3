/**
 * Premium BBA Portfolio - Core JavaScript
 * Handles Navigation, Filtering, Modals, Form Validation, and Accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initActiveNavLink();
  initProjectFilters();
  initProjectModals();
  initContactForm();
});

/* ==========================================================================
   1. Mobile Navigation Menu
   ========================================================================== */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (!menuBtn || !mobileNav) return;

  menuBtn.addEventListener('click', () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileNav.classList.toggle('hidden');
    mobileNav.classList.toggle('block');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !mobileNav.contains(e.target) && !mobileNav.classList.contains('hidden')) {
      mobileNav.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   2. Active Navigation Link
   ========================================================================== */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.classList.add('text-sky-700', 'font-semibold');
      link.classList.remove('text-slate-600', 'hover:text-slate-900');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ==========================================================================
   3. Project Category Filtering
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const emptyState = document.getElementById('no-projects-message');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      // Update active button state
      filterBtns.forEach(b => {
        b.classList.remove('bg-slate-900', 'text-white');
        b.classList.add('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200');
        b.setAttribute('aria-pressed', 'false');
      });

      btn.classList.remove('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200');
      btn.classList.add('bg-slate-900', 'text-white');
      btn.setAttribute('aria-pressed', 'true');

      let visibleCount = 0;

      // Filter project cards
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.classList.remove('hidden');
          card.classList.add('block');
          visibleCount++;
        } else {
          card.classList.add('hidden');
          card.classList.remove('block');
        }
      });

      // Handle empty filter state
      if (emptyState) {
        if (visibleCount === 0) {
          emptyState.classList.remove('hidden');
        } else {
          emptyState.classList.add('hidden');
        }
      }
    });
  });
}

/* ==========================================================================
   4. Project Details Modal (Case Study View)
   ========================================================================== */
function initProjectModals() {
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const closeBtns = document.querySelectorAll('[data-modal-close]');
  let lastFocusedElement = null;

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-modal-target');
      const modal = document.getElementById(targetId);

      if (modal) {
        lastFocusedElement = trigger;
        openModal(modal);
      }
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      if (modal) {
        closeModal(modal, lastFocusedElement);
      }
    });
  });

  // Close modal when clicking backdrop or pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModalEl = document.querySelector('.modal-backdrop:not(.hidden)');
      if (openModalEl) {
        closeModal(openModalEl, lastFocusedElement);
      }
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      closeModal(e.target, lastFocusedElement);
    }
  });
}

function openModal(modal) {
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.classList.add('overflow-hidden');

  const focusableEls = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusableEls.length) {
    focusableEls[0].focus();
  }
}

function closeModal(modal, restoreFocusTarget) {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');

  if (restoreFocusTarget) {
    restoreFocusTarget.focus();
  }
}

/* ==========================================================================
   5. Contact Form Validation & Mailto Fallback
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const feedbackEl = document.getElementById('form-feedback');
  const mailtoBtn = document.getElementById('mailto-fallback-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    feedbackEl.innerHTML = '';
    feedbackEl.className = 'mt-4 text-sm font-medium p-4 rounded-md hidden';

    // Clear previous inline errors
    clearErrors([nameInput, emailInput, subjectInput, messageInput]);

    // Validation checks
    if (!nameInput.value.trim()) {
      showFieldError(nameInput, 'Please enter your full name.');
      isValid = false;
    }

    if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
      showFieldError(emailInput, 'Please enter a valid email address.');
      isValid = false;
    }

    if (!subjectInput.value.trim()) {
      showFieldError(subjectInput, 'Please select or enter a subject.');
      isValid = false;
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      showFieldError(messageInput, 'Message must be at least 10 characters long.');
      isValid = false;
    }

    if (isValid) {
      // Form is valid: Prepare mailto link & show standard static form submission guidance
      const mailSubject = encodeURIComponent(`Portfolio Inquiry: ${subjectInput.value.trim()}`);
      const mailBody = encodeURIComponent(`Name: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}`);
      const mailtoUrl = `mailto:alex.morgan.bba@example.com?subject=${mailSubject}&body=${mailBody}`;

      feedbackEl.className = 'mt-4 text-sm font-medium p-4 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 block';
      feedbackEl.innerHTML = `
        <div class="flex items-start">
          <svg class="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          <div>
            <p class="font-bold">Form validated successfully!</p>
            <p class="mt-1">Since this is a static demonstration portfolio, your message is ready to send directly via your default email client.</p>
            <a href="${mailtoUrl}" class="inline-flex items-center mt-3 px-4 py-2 bg-emerald-700 text-white rounded font-medium hover:bg-emerald-800 transition-colors">
              Open Email Client to Send Message
            </a>
          </div>
        </div>
      `;

      if (mailtoBtn) {
        mailtoBtn.href = mailtoUrl;
        mailtoBtn.classList.remove('hidden');
      }

      form.reset();
    } else {
      feedbackEl.className = 'mt-4 text-sm font-medium p-4 rounded-md bg-rose-50 text-rose-800 border border-rose-200 block';
      feedbackEl.textContent = 'Please correct the highlighted errors before submitting.';
    }
  });

  // Realtime mailto link generator update
  [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        if (mailtoBtn) {
          const mailSubject = encodeURIComponent(`Portfolio Inquiry: ${subjectInput.value.trim() || 'General'}`);
          const mailBody = encodeURIComponent(`Name: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}`);
          mailtoBtn.href = `mailto:alex.morgan.bba@example.com?subject=${mailSubject}&body=${mailBody}`;
        }
      });
    }
  });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showFieldError(input, message) {
  input.classList.add('border-rose-500', 'focus:ring-rose-500');
  input.classList.remove('border-slate-300', 'focus:ring-sky-500');

  const errorEl = document.getElementById(`${input.id}-error`);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
  }
}

function clearErrors(inputs) {
  inputs.forEach(input => {
    if (!input) return;
    input.classList.remove('border-rose-500', 'focus:ring-rose-500');
    input.classList.add('border-slate-300');

    const errorEl = document.getElementById(`${input.id}-error`);
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.add('hidden');
    }
  });
}
