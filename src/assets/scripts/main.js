// Add 'is-loaded' class to body when the window has fully loaded
window.addEventListener("load", () => {
  document.body.classList.add("is-loaded");
});

// Initialize navigation and lightbox functionality after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initLightbox();
});

/**
 * Highlights the active navigation link based on the current URL.
 */
function initNavigation() {
  const currentUrl = window.location.href;
  const links = document.querySelectorAll(
    ".header__sidebar a, .home-header__nav a"
  );

  links.forEach((link) => {
    if (link.href === currentUrl) {
      link.classList.add("active");
    }
  });
}

/**
 * Initializes a lightbox for images within the .details section.
 * @returns {void}
 */
function initLightbox() {
  const details = document.querySelector(".details");
  if (!details) return;

  let basicLightbox = null;

  // Event delegation for image clicks within the details section
  details.addEventListener("click", async (event) => {
    const target = event.target;

    if (target.tagName !== "IMG") return;

    try {
      // Dynamically import basicLightbox module if not already loaded
      if (!basicLightbox) {
        const [module] = await Promise.all([
          import("basiclightbox"),
          import("basiclightbox/dist/basicLightbox.min.css"),
        ]);
        basicLightbox = module;
      }

      // Create and show the lightbox with the clicked image
      basicLightbox
        .create(`<img src="${target.src}" alt="${target.alt}">`)
        .show();
    } catch (error) {
      console.error("Error loading lightbox module:", error);
    }
  });
}
