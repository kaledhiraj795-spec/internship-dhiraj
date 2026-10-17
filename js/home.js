const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-navigation");
const navigationLinks = document.querySelectorAll(".nav-link");
const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      navigation.classList.remove("is-open");
    });
  });
}

// Login Form Submission & Redirect
const loginForm = document.querySelector("form");

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formMessage = document.querySelector("#form-message");
    
    if (formMessage) {
      formMessage.textContent = "Login successful!";
      formMessage.style.color = "green";
    }

    setTimeout(() => {
      window.location.href = "home.html";
    }, 1500);
  });
}

const counters = document.querySelectorAll(".counter");

if (counters.length > 0) {
  counters.forEach((counter) => {
    counter.textContent = "0";

    const updateCounter = () => {
      const target = +counter.getAttribute("data-target");
      const current = +counter.textContent;
      const increment = Math.ceil(target / 50);

      if (current < target) {
        counter.textContent = `${current + increment}`;
        setTimeout(updateCounter, 30);
      } else {
        counter.textContent = `${target}+`;
      }
    };

    updateCounter();
  });
}