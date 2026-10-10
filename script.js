const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navLinks.classList.toggle("is-open", !isOpen);
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      navLinks.classList.remove("is-open");
    }
  });
}

const profileImage = document.querySelector(".profile-image");
if (profileImage instanceof HTMLImageElement) {
  profileImage.addEventListener("load", () => {
    const fallback = document.querySelector(".profile-fallback");
    if (fallback) {
      fallback.hidden = true;
    }
  }, { once: true });
  profileImage.addEventListener("error", () => {
    profileImage.hidden = true;
  }, { once: true });
}

const year = document.querySelector("#year");
if (year) {
  year.textContent = String(new Date().getFullYear());
}

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const contactForm = document.querySelector("#contact-form");
const formFeedback = document.querySelector("#form-feedback");
const contactEmail = "your.email@example.com";

if (contactForm instanceof HTMLFormElement && formFeedback) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formFeedback.removeAttribute("data-state");

    if (!contactForm.reportValidity()) {
      return;
    }

    if (contactEmail === "your.email@example.com") {
      formFeedback.dataset.state = "error";
      formFeedback.textContent = "Replace the placeholder email in script.js before using this form.";
      return;
    }

    const formData = new FormData(contactForm);
    const subject = `Portfolio message from ${String(formData.get("name"))}`;
    const body = [
      `From: ${String(formData.get("name"))}`,
      `Email: ${String(formData.get("email"))}`,
      "",
      String(formData.get("message")),
    ].join("\n");

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    formFeedback.textContent = "Your email app should open with the message ready to send.";
  });
}
