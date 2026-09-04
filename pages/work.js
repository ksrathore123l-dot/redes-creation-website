const filterButtons = document.querySelectorAll(".filters button");
const cards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");
    const filter = button.dataset.filter;
    cards.forEach((card) => {
      const types = card.dataset.type.split(" ");
      card.classList.toggle(
        "hide",
        filter !== "all" && !types.includes(filter),
      );
    });
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (id && id !== "#") {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".auto-count");

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute("data-target");
          const duration = 2000;
          const start = performance.now();
          
          counter.innerText = "0";

          function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const current = Math.floor(progress * target);
            counter.innerText = current;
            
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              counter.innerText = target;
            }
          }

          requestAnimationFrame(tick);
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.1 }
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
});
