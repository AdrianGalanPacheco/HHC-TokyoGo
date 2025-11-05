import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basiclightbox.min.css";

document.addEventListener("DOMContentLoaded", () => {
    const currentPagePath = window.location.pathname;
    const navLinks = document.querySelectorAll(".header__sidebar a");

    navLinks.forEach((link) => {
        const linkPath = link.getAttribute("href");

        if (linkPath && currentPagePath.endsWith(linkPath)) {
            link.classList.add("is-active");
        }
    });

    const imagesToLightbox = document.querySelectorAll(".details img");
    if (imagesToLightbox.length > 0) {
        imagesToLightbox.forEach((image) => {
            console.log(image);
            image.addEventListener("click", (event) => {
                event.preventDefault();
                basicLightbox
                    .create(`<img src="${image.src}" alt="${image.alt}">`)
                    .show();
            });
        });
    }
});
