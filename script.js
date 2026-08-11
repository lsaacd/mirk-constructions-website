// RDG CONSTRUCTIONS INTERACTIVE SCRIPT

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });
  }

  // 2. Services Carousel Scrolling Logic
  const btnLeft = document.getElementById('slideLeft');
  const btnRight = document.getElementById('slideRight');
  const slider = document.getElementById('servicesSlider');

  if (btnLeft && btnRight && slider) {
    // Scroll amount per click (approx one card width + gap)
    const scrollAmount = 345; 

    btnLeft.addEventListener('click', () => {
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    btnRight.addEventListener('click', () => {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // 3. Handle Form Submission
  const quoteForm = document.getElementById('quoteForm');
  const formSuccessMessage = document.getElementById('formSuccessMessage');

  if (quoteForm && formSuccessMessage) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate form sending
      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

      setTimeout(() => {
        quoteForm.classList.add('hidden');
        formSuccessMessage.classList.remove('hidden');
      }, 1200);
    });
  }
});
