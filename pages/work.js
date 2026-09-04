const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav-links");
menuBtn.addEventListener("click", () => nav.classList.toggle("open"));

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
