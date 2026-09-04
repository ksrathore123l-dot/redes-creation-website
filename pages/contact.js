

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    status.textContent = "Please fill in the required fields correctly.";
    status.style.color = "#d32f2f";
    form.reportValidity();
    return;
  }

  const data = new FormData(form);
  const name = data.get("name");

  status.textContent = `Thanks ${name}! Your message has been prepared successfully.`;
  status.style.color = "#0a9b55";
  form.reset();
});

// Smooth-scroll all internal anchors.
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const id = anchor.getAttribute("href");
    if (id && id !== "#") {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});
