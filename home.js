const rotatingWord = document.querySelector("[data-rotating-word]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const initializeBackToTop = () => {
  const backToTopButton = document.querySelector(".home-back-to-top");
  if (!backToTopButton) return;

  const updateBackToTopVisibility = () => {
    const isVisible = window.scrollY > 480;
    backToTopButton.classList.toggle("is-visible", isVisible);
    backToTopButton.setAttribute("aria-hidden", String(!isVisible));
    backToTopButton.tabIndex = isVisible ? 0 : -1;
  };

  window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  });

  updateBackToTopVisibility();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeBackToTop, { once: true });
} else {
  initializeBackToTop();
}

if (rotatingWord) {
  const words = ["tomorrow.", "with purpose.", "with confidence."];
  let wordIndex = 0;

  if (reduceMotion) {
    window.setInterval(() => {
      wordIndex = (wordIndex + 1) % words.length;
      rotatingWord.textContent = words[wordIndex];
    }, 3200);
  } else {
    const typeWord = (word, characterIndex = 0) => {
      rotatingWord.textContent = word.slice(0, characterIndex + 1);

      if (characterIndex + 1 < word.length) {
        window.setTimeout(() => typeWord(word, characterIndex + 1), 72);
      } else {
        window.setTimeout(eraseWord, 1900);
      }
    };

    const eraseWord = () => {
      const currentText = rotatingWord.textContent;
      rotatingWord.textContent = currentText.slice(0, -1);

      if (currentText.length > 1) {
        window.setTimeout(eraseWord, 38);
        return;
      }

      wordIndex = (wordIndex + 1) % words.length;
      window.setTimeout(() => typeWord(words[wordIndex]), 90);
    };

    window.setTimeout(eraseWord, 1700);
  }
}
