window.addEventListener("load", () => {
  document.body.classList.add("is-loaded");
});

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initLightbox();
});

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

function initLightbox() {
  const details = document.querySelector(".details");
  if (!details) return;

  let basicLightbox = null;

  details.addEventListener("click", async (event) => {
    const target = event.target;

    if (target.tagName !== "IMG") return;

    try {
      if (!basicLightbox) {
        const [module] = await Promise.all([
          import("basiclightbox"),
          import("basiclightbox/dist/basicLightbox.min.css"),
        ]);
        basicLightbox = module;
      }

      basicLightbox
        .create(`<img src="${target.src}" alt="${target.alt}">`)
        .show();
    } catch (error) {
      console.error("Error loading lightbox module:", error);
    }
  });
}
