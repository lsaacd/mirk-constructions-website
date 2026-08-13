// MIRK CONSTRUCTION INTERACTIVE SCRIPT

document.addEventListener('DOMContentLoaded', () => {
  // 0. Language Toggle Logic with LocalStorage persistence & Placeholder support
  const langButtons = document.querySelectorAll('.lang-btn');
  const translatableElements = document.querySelectorAll('[data-es]');
  const placeholderElements = document.querySelectorAll('[data-es-placeholder]');

  // Store original English text & placeholders on load
  translatableElements.forEach(el => {
    if (!el.dataset.en) {
      el.dataset.en = el.innerHTML;
    }
  });

  placeholderElements.forEach(el => {
    if (!el.dataset.enPlaceholder) {
      el.dataset.enPlaceholder = el.placeholder;
    }
  });

  function setLanguage(lang, force = false) {
    const currentLang = localStorage.getItem('mirk_lang') || 'en';
    if (!force && currentLang === lang && document.documentElement.lang === lang) {
      updateButtonState(lang);
      return;
    }

    localStorage.setItem('mirk_lang', lang);
    document.documentElement.lang = lang;

    updateButtonState(lang);

    // Update text / innerHTML
    translatableElements.forEach(el => {
      if (lang === 'es' && el.dataset.es) {
        el.innerHTML = el.dataset.es;
      } else if (lang === 'en' && el.dataset.en) {
        el.innerHTML = el.dataset.en;
      }
    });

    // Update input placeholders
    placeholderElements.forEach(el => {
      if (lang === 'es' && el.dataset.esPlaceholder) {
        el.placeholder = el.dataset.esPlaceholder;
      } else if (lang === 'en' && el.dataset.enPlaceholder) {
        el.placeholder = el.dataset.enPlaceholder;
      }
    });
  }

  function updateButtonState(lang) {
    langButtons.forEach(btn => {
      if (btn.dataset.lang === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setLanguage(btn.dataset.lang, true);
    });
  });

  // Initialize language from localStorage on page load
  const initialLang = localStorage.getItem('mirk_lang') || 'en';
  setLanguage(initialLang, true);

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
    // Reset slider to the start on page load
    slider.scrollLeft = 0;

    // Dynamically calculate scroll amount based on actual card width + gap
    function getScrollAmount() {
      const firstCard = slider.querySelector('.service-slide');
      if (firstCard) {
        const gap = parseInt(getComputedStyle(slider).gap) || 16;
        return firstCard.offsetWidth + gap;
      }
      return 280; // fallback
    }

    btnLeft.addEventListener('click', () => {
      slider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    btnRight.addEventListener('click', () => {
      slider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
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

  // 4. Process Steps Carousel (Mobile Dot Navigation)
  const processSteps = document.getElementById('processSteps');
  const processDots = document.getElementById('processDots');

  if (processSteps && processDots) {
    const dots = processDots.querySelectorAll('.process-dot');
    const cards = processSteps.querySelectorAll('.step-card');

    // Click a dot to scroll to that card
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.dataset.index);
        const targetCard = cards[index];
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      });
    });

    // Update dots on scroll (using scroll event with debounce)
    let scrollTimeout;
    processSteps.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const containerRect = processSteps.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        let closestIndex = 0;
        let closestDistance = Infinity;

        cards.forEach((card, i) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const distance = Math.abs(cardCenter - containerCenter);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = i;
          }
        });

        dots.forEach((d, i) => {
          d.classList.toggle('active', i === closestIndex);
        });
      }, 50);
    });
  }

  // 5. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const toggle = item.querySelector('.faq-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        // Toggle the active class to show/hide content
        item.classList.toggle('active');
      });
    }
  });

  // 5. Back to Top Button Logic
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 6. Before/After Comparison Sliders (Supports multiple instances)
  const sliderWrappers = document.querySelectorAll('.ba-slider-wrapper');

  sliderWrappers.forEach(wrapper => {
    const baSlider = wrapper.querySelector('.ba-slider');
    const baBeforeClip = wrapper.querySelector('.ba-before-clip');
    const baHandle = wrapper.querySelector('.ba-handle');
    const baAfterImg = wrapper.querySelector('.ba-after-img');
    const baThumbnails = wrapper.querySelector('.ba-thumbnails');

    if (baSlider && baBeforeClip && baHandle) {
      let isDragging = false;
      const baBeforeImg = baBeforeClip.querySelector('.ba-before-img');

      // Keep the before image width matching the full slider container
      function syncBeforeImgWidth() {
        if (baBeforeImg) {
          baBeforeImg.style.width = baSlider.offsetWidth + 'px';
        }
      }
      syncBeforeImgWidth();
      window.addEventListener('resize', syncBeforeImgWidth);

      function setSliderPosition(x) {
        const rect = baSlider.getBoundingClientRect();
        let pos = (x - rect.left) / rect.width;
        pos = Math.max(0.02, Math.min(0.98, pos)); // Clamp between 2%-98%
        const pct = pos * 100;
        baBeforeClip.style.width = pct + '%';
        baHandle.style.left = pct + '%';
      }

      // --- Mouse events ---
      baSlider.addEventListener('mousedown', (e) => {
        isDragging = true;
        setSliderPosition(e.clientX);
        e.preventDefault();
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        setSliderPosition(e.clientX);
      });

      window.addEventListener('mouseup', () => {
        isDragging = false;
      });

      // --- Touch events (mobile) ---
      baSlider.addEventListener('touchstart', (e) => {
        isDragging = true;
        setSliderPosition(e.touches[0].clientX);
      }, { passive: true });

      baSlider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        setSliderPosition(e.touches[0].clientX);
      }, { passive: true });

      baSlider.addEventListener('touchend', () => {
        isDragging = false;
      });

      // --- Thumbnail switching ---
      if (baThumbnails && baAfterImg) {
        const thumbs = baThumbnails.querySelectorAll('.ba-thumb');
        thumbs.forEach(thumb => {
          thumb.addEventListener('click', () => {
            const src = thumb.getAttribute('data-src');
            if (src) {
              baAfterImg.src = src;
              thumbs.forEach(t => t.classList.remove('active'));
              thumb.classList.add('active');
            }
          });
        });
      }
    }

    // 6. Image Lightbox Logic
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');
  
    if (lightbox && lightboxImg && lightboxClose) {
      const clickableContainers = document.querySelectorAll('.showcase-card, .masterpiece-card');
      
      clickableContainers.forEach(container => {
        container.addEventListener('click', () => {
          const img = container.querySelector('img');
          if (img) {
            lightboxImg.src = img.src;
            lightbox.style.display = 'flex';
            // Small delay to allow display:flex to apply before adding opacity class
            setTimeout(() => {
              lightbox.classList.add('show');
            }, 10);
          }
        });
      });
  
      const closeLightbox = () => {
        lightbox.classList.remove('show');
        setTimeout(() => {
          lightbox.style.display = 'none';
        }, 300); // match transition duration
      };
  
      lightboxClose.addEventListener('click', closeLightbox);
      
      // Close on background click
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          closeLightbox();
        }
      });
  
      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('show')) {
          closeLightbox();
        }
      });
    }

  });
});
