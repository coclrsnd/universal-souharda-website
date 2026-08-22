document.addEventListener("DOMContentLoaded", () => {
  const currentPage = document.body.dataset.page;

  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) {
      return;
    }

    const normalizedHref = href.replace("./", "").replace(".html", "");
    if (
      (currentPage === "home" && normalizedHref === "index") ||
      normalizedHref === currentPage
    ) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  if (currentPage === "gallery") {
    document.querySelectorAll(".gallery-nav-toggle").forEach((toggle) => {
      toggle.classList.add("active");
      toggle.setAttribute("aria-current", "page");
    });
  }

  const revealTargets = document.querySelectorAll(
    ".info-card, .loan-card, .gallery-card, .metric-card, .stat-panel, .contact-panel, .form-panel, .gallery-tile"
  );

  revealTargets.forEach((element) => {
    element.setAttribute("data-reveal", "");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((element) => observer.observe(element));

  const enquiryForm = document.getElementById("enquiryForm");
  const formFeedback = document.getElementById("formFeedback");

  if (enquiryForm && formFeedback) {
    enquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      formFeedback.textContent =
        "Thank you. This is a demo form for now. We can connect it to a live email or backend service later.";
      enquiryForm.reset();
    });
  }

  const galleryGroups = document.querySelectorAll("[data-gallery-group]");

  if (galleryGroups.length > 0) {
    const categoryAliases = {
      bod: "board-members",
      board: "board-members",
      "board-members": "board-members",
      staff: "staff",
      society: "society",
    };

    const updateGalleryCategory = (selectedCategory) => {
      galleryGroups.forEach((group) => {
        const isMatch = group.dataset.galleryGroup === selectedCategory;
        group.hidden = !isMatch;
        group.classList.toggle("is-active", isMatch);
      });
    };

    const requestedCategory = new URLSearchParams(window.location.search).get("category");
    const resolvedCategory = categoryAliases[requestedCategory] || "society";
    updateGalleryCategory(resolvedCategory);
  }
});
