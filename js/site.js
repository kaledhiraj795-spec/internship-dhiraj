const siteMenuToggle = document.querySelector("[data-site-menu-toggle]");
const siteNavigation = document.querySelector("[data-site-navigation]");

if (siteMenuToggle && siteNavigation) {
  const closeSiteMenu = () => {
    siteMenuToggle.setAttribute("aria-expanded", "false");
    siteMenuToggle.setAttribute("aria-label", "Open navigation menu");
    siteNavigation.classList.remove("is-open");
  };

  siteMenuToggle.addEventListener("click", () => {
    const isOpen = siteMenuToggle.getAttribute("aria-expanded") === "true";
    siteMenuToggle.setAttribute("aria-expanded", String(!isOpen));
    siteMenuToggle.setAttribute(
      "aria-label",
      isOpen ? "Open navigation menu" : "Close navigation menu"
    );
    siteNavigation.classList.toggle("is-open", !isOpen);
  });

  siteNavigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeSiteMenu();
  });
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && "IntersectionObserver" in window) {
  const revealTargets = document.querySelectorAll(
    "main > section, .glass-card, .home-info-card, .department-card, .student-card, .contact-event-card, .step-card, .stat-box, .about-academic-card, .about-principle-card, .about-feature"
  );

  if (revealTargets.length) {
    document.documentElement.classList.add("motion-ready");

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -32px 0px" });

    revealTargets.forEach((target) => {
      target.setAttribute("data-reveal", "");
      revealObserver.observe(target);
    });
  }
}
