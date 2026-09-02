const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle?.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => mainNav.classList.remove("open"));
});

// Reveal animations
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// Service detail modal
const serviceData = {
  website: {
    title: "Website Development",
    text: "Responsive, SEO-ready and conversion-focused websites designed around your brand and business goals.",
    list: [
      "Corporate & business websites",
      "University, school, hospital & hotel websites",
      "Custom CMS and e-commerce",
      "Mobile responsive UI/UX",
      "SEO-ready architecture",
    ],
  },
  software: {
    title: "Software & ERP",
    text: "Custom software and ERP systems that automate everyday operations and give teams a clear, centralized workflow.",
    list: [
      "Education ERP & school management",
      "University admissions, academics, exams & fees",
      "Hospital management systems",
      "Hotel management systems",
      "Business automation & dashboards",
    ],
  },
  ai: {
    title: "AI Solutions",
    text: "Practical AI experiences for customer support, automation, content workflows and smarter business processes.",
    list: [
      "AI chat and support solutions",
      "Workflow automation",
      "Business intelligence experiences",
      "AI-assisted content and operations",
      "Custom AI integrations",
    ],
  },
  app: {
    title: "Mobile App Development",
    text: "Modern Android, iOS and cross-platform apps with intuitive UX and a scalable product architecture.",
    list: [
      "Android development",
      "iOS development",
      "Cross-platform applications",
      "UI/UX design",
      "App maintenance & support",
    ],
  },
};

const modal = document.querySelector(".service-modal");
const modalTitle = document.querySelector("#modal-title");
const modalText = document.querySelector("#modal-text");
const modalList = document.querySelector("#modal-list");

function openService(key) {
  const data = serviceData[key];
  if (!data) return;
  modalTitle.textContent = data.title;
  modalText.textContent = data.text;
  modalList.innerHTML = data.list.map((item) => `<li>${item}</li>`).join("");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeService() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".expand-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.currentTarget.closest(".service-card");
    openService(card.dataset.service);
  });
});

document.querySelector(".modal-close")?.addEventListener("click", closeService);
document
  .querySelector(".modal-backdrop")
  ?.addEventListener("click", closeService);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeService();
});

// Portfolio slider: compact horizontal movement on desktop/tablet
const track = document.querySelector(".work-track");
document.querySelector(".next")?.addEventListener("click", () => {
  track?.scrollBy({ left: 220, behavior: "smooth" });
});
document.querySelector(".prev")?.addEventListener("click", () => {
  track?.scrollBy({ left: -220, behavior: "smooth" });
});

// Smooth active nav state
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".main-nav a");
const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) =>
          a.classList.toggle(
            "active",
            a.getAttribute("href") === "#" + entry.target.id,
          ),
        );
      }
    });
  },
  { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
);
sections.forEach((section) => activeObserver.observe(section));

// Year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Fix card flip animation on page load
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", () => card.classList.add("hovered"), {
    once: true,
  });
});

// Simple count-up when stats enter viewport
const stats = document.querySelector(".stats-bar");
let counted = false;
const countObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      document.querySelectorAll("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        let current = 0;
        const duration = 900;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          current = Math.floor(progress * target);
          el.textContent = current + "+";
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }
  },
  { threshold: 0.5 },
);
if (stats) countObserver.observe(stats);

// FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  const btn = item.querySelector(".faq-question");
  btn.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    // Close all others
    faqItems.forEach((otherItem) => {
      otherItem.classList.remove("active");
      const ans = otherItem.querySelector(".faq-answer");
      if (ans) ans.style.maxHeight = null;
    });

    // Toggle current
    if (!isActive) {
      item.classList.add("active");
      const answer = item.querySelector(".faq-answer");
      if (answer) answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// Expertise Animation
const expertiseSection = document.querySelector(".our-expertise");
const walker = document.getElementById("walker");
const bubbles = document.querySelectorAll(".expertise-bubble");

if (expertiseSection && walker && bubbles.length > 0) {
  let hasStarted = false;
  let walkerX = -150;
  let animationFrameId;
  const speed = 3; // pixels per frame

  const startAnimation = () => {
    if (hasStarted) return;
    hasStarted = true;
    walker.classList.add("is-walking");

    const trackWidth = expertiseSection.offsetWidth;

    function animateWalker() {
      walkerX += speed;
      // We must avoid overwriting the CSS animation transform, so we use left instead of transform for X movement
      walker.style.left = walkerX + "px";

      const walkerRect = walker.getBoundingClientRect();

      bubbles.forEach((bubble) => {
        if (!bubble.classList.contains("popped")) {
          const bubbleRect = bubble.getBoundingClientRect();
          // Collision detection
          if (
            walkerRect.right > bubbleRect.left + 30 &&
            walkerRect.left < bubbleRect.right - 30
          ) {
            bubble.classList.add("popped");
          }
        }
      });

      if (walkerX < trackWidth + 200) {
        animationFrameId = requestAnimationFrame(animateWalker);
      } else {
        // Reset character to start for endless looping
        walkerX = -150;
        bubbles.forEach((bubble) => bubble.classList.remove("popped"));
        animationFrameId = requestAnimationFrame(animateWalker);
      }
    }

    animationFrameId = requestAnimationFrame(animateWalker);
  };

  const expertiseObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        startAnimation();
        expertiseObserver.disconnect();
      }
    },
    { threshold: 0.1 },
  );

  expertiseObserver.observe(expertiseSection);
}

// Trusted Slider Scroll
const trustedSlider = document.getElementById("trustedSlider");
const trustedPrev = document.getElementById("trustedPrev");
const trustedNext = document.getElementById("trustedNext");

if (trustedSlider && trustedPrev && trustedNext) {
  const scrollAmount = 250; // width of slide + gap
  trustedPrev.addEventListener("click", () => {
    trustedSlider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });
  trustedNext.addEventListener("click", () => {
    trustedSlider.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
}
