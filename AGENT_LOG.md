# Agent Developer Log & Architecture Notes

This file serves as a reference for future AI agents or developers working on the Mirk Construction website. It outlines the custom architecture implementations, specifically for the dynamic translation system and logo handling.

## 1. Custom Spanish/English Translation Engine

To maintain high-quality, professional terminology (as outlined in `.agents/AGENTS.md`) without relying on automated/inaccurate Google Translate widgets, the site uses a **Custom Manual Translation Engine** driven by JavaScript and HTML data attributes.

### How it works:
1. **HTML Data Attributes (`data-es`)**:
   - Every translatable text node in `index.html` has a `data-es` attribute containing the meticulously translated professional Spanish text.
   - Example: `<h2 data-es="SERVICIOS QUE<br>OFRECEMOS">SERVICES WE<br>OFFER</h2>`
   - *Note: HTML tags (like `<br>`, `<strong>`, `<i class="..."></i>`) are preserved inside the `data-es` string to maintain layout and icons.*

2. **JavaScript Logic (`script.js`)**:
   - On DOM load, `script.js` scans the page for all elements with the `[data-es]` attribute.
   - It captures the original English innerHTML and saves it to a dynamically created `data-en` attribute on each element.
   - When the user clicks the "Español" or "English" toggle buttons (`.lang-btn`), a JavaScript function loops through these elements and swaps the `innerHTML` between the `data-es` and `data-en` values instantly.

### Adding New Content:
If you add new text to the website in the future, **you must include the `data-es` attribute** on that element to ensure it gets translated when the toggle is clicked.

---

## 2. Dynamic Logo Setup (SVG)

- **File Location**: The site logo is stored at `assets/logo/logo.svg`.
- **Why SVG?**: SVG is used to ensure infinite crispness on Retina/mobile displays and to keep file sizes extremely small.
- **Sizing Control**: 
  - The logo size is strictly controlled via CSS (`.brand-logo` in `styles.css`) to prevent it from blowing up on mobile devices. 
  - It scales down gracefully using `@media (max-width: 768px)`.
- **Footer Inversion**:
  - The footer uses a dark background. Instead of requiring a separate white logo file, the `.brand-logo.footer-logo` class in `styles.css` uses CSS filters (`filter: brightness(0) invert(1);`) to automatically render the navy logo as pure white.

---

## 3. UI/UX Features

- **Image Lightbox**: Clicking on any project image in the Showcase or Masterpieces grids triggers a custom full-screen lightbox (`#imageLightbox`). This is handled natively in `script.js` without any external libraries.
- **Before/After Sliders**: The portfolio section features custom JavaScript-driven sliders (`.ba-slider-wrapper`) allowing users to drag and compare before/after remodeling photos.
- **Scroll Carousel**: The services section uses a horizontal scroll carousel with left/right buttons.
- **Responsive Layout**: Heavy use of CSS Flexbox and Grid, with mobile breakpoints primarily at `768px`.
