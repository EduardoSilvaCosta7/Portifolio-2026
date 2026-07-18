const hero = document.querySelector(".hero");
const heroCenter = document.querySelector(".hero-center");
const heroTitle = document.querySelector(".hero-title");
const heroParallaxImages = document.querySelectorAll(".hero-parallax-img");

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const lerp = (start, end, progress) => start + (end - start) * progress;

const SECTION_HEIGHT = 1150;

let ticking = false;

function getHeroScroll() {
  const rect = hero.getBoundingClientRect();

  return clamp(-rect.top, 0, SECTION_HEIGHT + 500);
}

function getElementProgress(el, start, end) {
  const rect = el.getBoundingClientRect();
  const viewportStart = window.innerHeight - start;
  const viewportEnd = -end;
  const raw = (viewportStart - rect.top) / Math.max(1, viewportStart - viewportEnd);

  return clamp(raw, 0, 1);
}

function updateHero() {
  if (!hero || !heroCenter) return;

  if (!ticking) {
    ticking = true;
    requestAnimationFrame(animateHero);
  }
}

function animateHero() {
  const scroll = getHeroScroll();
  const clipProgress = clamp(scroll / SECTION_HEIGHT, 0, 1);
  const zoomProgress = clamp(scroll / (SECTION_HEIGHT + 500), 0, 1);
  const fadeProgress = clamp((scroll - SECTION_HEIGHT) / 500, 0, 1);

  const clip1 = lerp(25, 0, clipProgress);
  const clip2 = lerp(75, 100, clipProgress);
  const backgroundSize = lerp(118, 100, zoomProgress);
  const titleOpacity = lerp(1, 0, fadeProgress);

  heroCenter.style.clipPath = `polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;
  heroCenter.style.backgroundSize = `auto ${backgroundSize}%`;
  heroCenter.style.opacity = 1 - fadeProgress;

  if (heroTitle) {
    heroTitle.style.opacity = titleOpacity;
  }

  heroParallaxImages.forEach((img) => {
    const start = Number(img.dataset.start);
    const end = Number(img.dataset.end);
    const progress = getElementProgress(img, start, end);
    const y = lerp(start, end, progress);
    const scale = lerp(1, 0.85, clamp((progress - 0.75) / 0.25, 0, 1));
    const opacity = lerp(1, 0, clamp((progress - 0.75) / 0.25, 0, 1));

    img.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
    img.style.opacity = opacity;
  });

  ticking = false;
}

window.addEventListener("scroll", updateHero, { passive: true });
window.addEventListener("resize", updateHero);
window.addEventListener("load", updateHero);
updateHero();

const logoFiles = [
  { src: "logos/HTML5_logo_and_wordmark.svg.webp", alt: "HTML5" },
  { src: "logos/CSS3_logo_and_wordmark.svg.webp", alt: "CSS3" },
  { src: "logos/JavaScript-logo.png", alt: "JavaScript" },
  { src: "logos/adobe-premiere-pro-logo-0-1.png", alt: "Adobe Premiere Pro" },
  { src: "logos/after-effects.svg", alt: "Adobe After Effects" },
  { src: "logos/DaVinci_Resolve_Studio.png", alt: "DaVinci Resolve Studio" },
  { src: "logos/Microsoft_Office_Excel_(2025–present).svg.webp", alt: "Microsoft Excel" },
  { src: "logos/Microsoft_Office_PowerPoint_(2025–present).svg.webp", alt: "Microsoft PowerPoint" },
  { src: "logos/Microsoft_Office_Word_(2019–2025).svg.webp", alt: "Microsoft Word" },
  { src: "logos/claude-logo-png_seeklogo-554534.png", alt: "Claude" },
];

const logoCarousel = document.querySelector(".logo-carousel");
const logoCarouselList = document.querySelector(".logo-carousel .splide__list");

if (logoCarousel && logoCarouselList) {
  logoFiles.forEach((logo) => {
    const slide = document.createElement("li");
    const card = document.createElement("div");
    const image = document.createElement("img");

    slide.className = "splide__slide";
    card.className = "logo-card";
    image.src = logo.src;
    image.alt = logo.alt;
    image.loading = "lazy";
    image.addEventListener("error", () => slide.remove());

    card.appendChild(image);
    slide.appendChild(card);
    logoCarouselList.appendChild(slide);
  });

  window.addEventListener("load", () => {
    if (!window.Splide || !window.splide?.Extensions?.AutoScroll) return;

    new window.Splide(logoCarousel, {
      type: "loop",
      drag: "free",
      focus: "center",
      pagination: false,
      arrows: false,
      autoWidth: true,
      gap: "2rem",
      autoScroll: {
        speed: 0.75,
        pauseOnHover: false,
        pauseOnFocus: false,
      },
    }).mount(window.splide.Extensions);
  });
}

const experienceItems = document.querySelectorAll(".experience-item");
const experiencePreview = document.querySelector(".experience-preview");
const experiencePreviewImg = experiencePreview?.querySelector("img");
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (experiencePreview && experiencePreviewImg && experienceItems.length && canHover) {
  const gsapInstance = window.gsap;
  const movePreviewX = gsapInstance
    ? gsapInstance.quickTo(experiencePreview, "x", { duration: 0.45, ease: "power3" })
    : (value) => {
        experiencePreview.style.left = `${value}px`;
      };
  const movePreviewY = gsapInstance
    ? gsapInstance.quickTo(experiencePreview, "y", { duration: 0.45, ease: "power3" })
    : (value) => {
        experiencePreview.style.top = `${value}px`;
      };

  function moveExperiencePreview(event) {
    movePreviewX(event.clientX);
    movePreviewY(event.clientY);
  }

  experienceItems.forEach((item) => {
    item.addEventListener("mouseenter", (event) => {
      const nextImage = item.dataset.image;

      if (nextImage && experiencePreviewImg.getAttribute("src") !== nextImage) {
        experiencePreviewImg.src = nextImage;
      }

      moveExperiencePreview(event);

      if (gsapInstance) {
        gsapInstance.to(experiencePreview, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.28,
          ease: "power3.out",
        });
        gsapInstance.fromTo(
          experiencePreviewImg,
          { scale: 1.18 },
          { scale: 1.04, duration: 0.55, ease: "power3.out" }
        );
      } else {
        experiencePreview.style.opacity = "1";
        experiencePreview.style.visibility = "visible";
        experiencePreview.style.scale = "1";
      }
    });

    item.addEventListener("mousemove", moveExperiencePreview);

    item.addEventListener("mouseleave", () => {
      if (gsapInstance) {
        gsapInstance.to(experiencePreview, {
          autoAlpha: 0,
          scale: 0.86,
          duration: 0.24,
          ease: "power3.inOut",
        });
      } else {
        experiencePreview.style.opacity = "0";
        experiencePreview.style.visibility = "hidden";
        experiencePreview.style.scale = "0.86";
      }
    });
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

function countUp(el) {
  const target = parseInt(el.dataset.count);
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    el.textContent = Math.floor(eased * target);

    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }

  requestAnimationFrame(tick);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      countUp(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll(".stat-number[data-count]").forEach((el) => {
  countObserver.observe(el);
});

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".skill-bar span").forEach((bar) => {
        bar.style.transition = "width 1s cubic-bezier(0.4,0,0.2,1)";
        const width = bar.style.width;

        bar.style.width = "0%";
        setTimeout(() => {
          bar.style.width = width;
        }, 50);
      });

      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll(".skills-list").forEach((el) => barObserver.observe(el));

document.querySelectorAll(".skill-row").forEach((row, index) => {
  row.style.transitionDelay = `${index * 0.08}s`;
});

document.querySelectorAll(".experience-item").forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.12}s`;
});
