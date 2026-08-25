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

  if (currentPage === "about") {
    const aboutParentLink = document.querySelector(".nav-link--about");
    if (aboutParentLink) {
      aboutParentLink.classList.add("active");
      aboutParentLink.setAttribute("aria-current", "page");
    }
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

  const aboutGroups = document.querySelectorAll("[data-about-group]");

  if (aboutGroups.length > 0) {
    const aboutItems = document.querySelectorAll("[data-about-nav]");
    const aboutHeroEyebrow = document.querySelector("[data-about-hero-eyebrow]");
    const aboutHeroTitle = document.querySelector("[data-about-hero-title]");
    const aboutHeroText = document.querySelector("[data-about-hero-text]");
    const aboutAliases = {
      about: "about",
      "about-us": "about",
      staff: "staff",
      bod: "board-members",
      board: "board-members",
      "board-members": "board-members",
    };
    const aboutContent = {
      about: {
        eyebrow: "About us",
        title: "Built on Trust. Driven by Service. Growing Together.",
        text:
          "Universal Souharda Co-op Society Ltd. was established in 2023 with a clear purpose to create a trusted, member-focused financial institution rooted in cooperative values and modern technology.",
      },
      staff: {
        eyebrow: "Our Team",
        title: "People behind our member service",
        text:
          "Meet the team members who support day-to-day service, operations, and member care at Universal Souharda.",
      },
      "board-members": {
        eyebrow: "Board of Directors",
        title: "Leadership guiding the cooperative vision",
        text:
          "Meet the leadership representing the vision and governance of Universal Souharda.",
      },
    };

    const updateAboutSection = (selectedSection) => {
      document.body.setAttribute("data-about-section", selectedSection);

      aboutGroups.forEach((group) => {
        const isMatch = group.dataset.aboutGroup === selectedSection;
        group.hidden = !isMatch;
        group.classList.toggle("is-active", isMatch);
      });

      aboutItems.forEach((item) => {
        const href = new URL(item.href, window.location.href);
        const requested = href.searchParams.get("section") || "about";
        const resolved = aboutAliases[requested] || "about";
        const isActive = resolved === selectedSection;
        item.classList.toggle("active", isActive);
        if (isActive) {
          item.setAttribute("aria-current", "page");
        } else {
          item.removeAttribute("aria-current");
        }
      });

      const heroContent = aboutContent[selectedSection] || aboutContent.about;
      if (aboutHeroEyebrow) {
        aboutHeroEyebrow.textContent = heroContent.eyebrow;
      }
      if (aboutHeroTitle) {
        aboutHeroTitle.textContent = heroContent.title;
      }
      if (aboutHeroText) {
        aboutHeroText.textContent = heroContent.text;
      }
    };

    const requestedSection = new URLSearchParams(window.location.search).get("section");
    const resolvedSection = aboutAliases[requestedSection] || "about";
    updateAboutSection(resolvedSection);
  }
});
