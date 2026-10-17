 const counters = document.querySelectorAll(".page-placement .counter[data-target]");

 function animateCounter(counter) {
   const target = Number(counter.dataset.target);
   const suffix = counter.dataset.suffix || "";
   const decimals = Number(counter.dataset.decimals || 0);
   const duration = 1800;
   const formatter = new Intl.NumberFormat("en-US", {
     maximumFractionDigits: decimals,
     minimumFractionDigits: decimals
   });

   if (!Number.isFinite(target)) {
     console.error("Placement counter has an invalid data-target.", counter);
     return;
   }

   const startTime = performance.now();
   const update = (now) => {
     const progress = Math.min((now - startTime) / duration, 1);
     const easedProgress = 1 - Math.pow(1 - progress, 4);
     const currentValue = target * easedProgress;
     counter.textContent = `${formatter.format(progress === 1 ? target : currentValue)}${suffix}`;

     if (progress < 1) {
       requestAnimationFrame(update);
     }
   };

   requestAnimationFrame(update);
 }

 counters.forEach((counter) => {
   const target = Number(counter.dataset.target);
   const suffix = counter.dataset.suffix || "";

   if (!Number.isFinite(target)) {
     console.error("Placement counter has an invalid data-target.", counter);
     return;
   }

   counter.textContent = `0${suffix}`;
 });

 if ("IntersectionObserver" in window) {
   const statsObserver = new IntersectionObserver((entries, observer) => {
     entries.forEach((entry) => {
       if (!entry.isIntersecting) return;

       counters.forEach(animateCounter);
       observer.disconnect();
    });
   }, { threshold: 0.35 });

   const statsSection = document.getElementById("stats");
   if (statsSection) {
     statsObserver.observe(statsSection);
   }
 } else {
   counters.forEach(animateCounter);
 }

 const filterButtons = document.querySelectorAll(".page-placement .filter-btn[data-filter]");
 const studentCards = document.querySelectorAll(".page-placement .student-card[data-category]");

 filterButtons.forEach((button) => {
   button.addEventListener("click", () => {
     const category = button.dataset.filter;

     filterButtons.forEach((filterButton) => {
       const isActive = filterButton === button;
       filterButton.classList.toggle("active", isActive);
       filterButton.setAttribute("aria-pressed", String(isActive));
     });

     studentCards.forEach((card) => {
       card.hidden = category !== "all" && card.dataset.category !== category;
     });
   });
 });

 const brochureButton = document.getElementById("download-brochure");
 if (brochureButton) {
   brochureButton.addEventListener("click", (event) => {
     event.preventDefault();
     window.print();
   });
 }