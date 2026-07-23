import LiquidWeb from "https://cdn.jsdelivr.net/npm/liquid-web@1.1.1/liquid-core.mjs";

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

const translations = {
  "pt-br": {
    titles: {
      index: "Eduardo Silva — Portfolio",
      experiencias: "Experiências - Eduardo Silva",
      contato: "Contato - Eduardo Silva",
    },
    nav: ["contato", "início", "experiências"],
    heroLeft: "Experiências profissionais",
    toolsKicker: "Ferramentas",
    toolsTitle: "Programas que utilizo",
    guideKicker: "Guia",
    guideTitle: "Escolha para onde seguir",
    guideCards: [
      {
        title: "Contato",
        copy: "Instagram, email e GitHub para falar comigo.",
      },
      {
        title: "Início",
        copy: "Volte para a primeira cena animada do portfólio.",
      },
      {
        title: "Experiências",
        copy: "Veja os registros profissionais e projetos realizados.",
      },
    ],
    contactKicker: "Contato",
    contactTitle: "Vamos conversar?",
    experienceKicker: "Registros profissionais",
    quote: "“A comunicação junto com a compreensão fazem toda a diferença”",
    roles: ["Programador", "Editor de vídeos e imagem", "Diretor financeiro", "Coordenador"],
    periods: [
      "junho 2026",
      "setembro 2025 - junho 2026",
      "maio 2025 - junho 2026",
      "maio 2024 - abril 2025",
    ],
    experiences: [
      {
        title: "Remasterização do site Pirania",
        copy: "Atualização visual e estrutural do site Pirania, com foco em melhorar a apresentação do projeto, organizar informações importantes e reforçar a identidade digital com uma experiência mais clara, moderna e responsiva.",
      },
      {
        title: "Coordenador na criação do site Acervo Vivo",
        copy: "Coordenação da criação e organização do site Acervo Vivo, atuando na estruturação do conteúdo, acompanhamento da produção visual e alinhamento das entregas para preservar a memória do projeto com clareza, identidade e presença digital.",
      },
      {
        title: "Diretor financeiro",
        copy: "Atuação na direção financeira, acompanhando processos administrativos, organização de recursos, controle de informações e apoio à tomada de decisões para garantir maior clareza na gestão do projeto.",
      },
      {
        title: "Auxiliar administrativo Carrefour",
        copy: "Experiência em rotinas administrativas, organização de documentos, suporte a processos internos e acompanhamento de informações operacionais para manter fluxos de trabalho mais claros e eficientes.",
      },
    ],
  },
  en: {
    titles: {
      index: "Eduardo Silva — Portfolio",
      experiencias: "Experiences - Eduardo Silva",
      contato: "Contact - Eduardo Silva",
    },
    nav: ["contact", "home", "experiences"],
    heroLeft: "Professional experience",
    toolsKicker: "Tools",
    toolsTitle: "Software I use",
    guideKicker: "Guide",
    guideTitle: "Choose where to go",
    guideCards: [
      {
        title: "Contact",
        copy: "Instagram, email and GitHub to get in touch.",
      },
      {
        title: "Home",
        copy: "Return to the first animated scene of the portfolio.",
      },
      {
        title: "Experience",
        copy: "See professional records and completed projects.",
      },
    ],
    contactKicker: "Contact",
    contactTitle: "Let's talk?",
    experienceKicker: "Professional records",
    quote: "“Communication together with understanding makes all the difference”",
    roles: ["Programmer", "Video and image editor", "Financial director", "Coordinator"],
    periods: [
      "June 2026",
      "September 2025 - June 2026",
      "May 2025 - June 2026",
      "May 2024 - April 2025",
    ],
    experiences: [
      {
        title: "Pirania website remaster",
        copy: "Visual and structural update of the Pirania website, focused on improving the project's presentation, organizing key information and strengthening its digital identity with a clearer, more modern and responsive experience.",
      },
      {
        title: "Coordinator for the creation of the Acervo Vivo website",
        copy: "Coordinated the creation and organization of the Acervo Vivo website, working on content structure, visual production follow-up and delivery alignment to preserve the project's memory with clarity, identity and digital presence.",
      },
      {
        title: "Financial director",
        copy: "Worked in financial leadership, following administrative processes, organizing resources, controlling information and supporting decision-making to bring greater clarity to project management.",
      },
      {
        title: "Administrative assistant at Carrefour",
        copy: "Experience with administrative routines, document organization, internal process support and operational information tracking to keep workflows clearer and more efficient.",
      },
    ],
  },
};

function getPageKey() {
  const page = getCurrentPage();
  if (page.includes("experiencias")) return "experiencias";
  if (page.includes("contato")) return "contato";
  return "index";
}

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el && value) el.textContent = value;
}

function setTexts(selector, values) {
  document.querySelectorAll(selector).forEach((el, index) => {
    if (values[index]) el.textContent = values[index];
  });
}

function getCurrentLanguage() {
  return localStorage.getItem("portfolio-language") || "pt-br";
}

function applyLanguage(language) {
  const lang = translations[language] ? language : "pt-br";
  const text = translations[lang];

  document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
  document.title = text.titles[getPageKey()] || text.titles.index;

  setTexts(".bottom-nav a", text.nav);
  setText(".hero-left", text.heroLeft);
  setText(".tools-kicker", text.toolsKicker);
  setText(".tools-inner h2", text.toolsTitle);
  setText(".guide-kicker", text.guideKicker);
  setText(".guide-inner h2", text.guideTitle);
  setTexts(".guide-title", text.guideCards.map((card) => card.title));
  setTexts(".guide-copy", text.guideCards.map((card) => card.copy));
  setText(".contact-kicker", text.contactKicker);
  setText(".contact-inner h2", text.contactTitle);
  setText(".experience-kicker", text.experienceKicker);
  setText(".experience-hero h1", text.quote);
  setTexts(".experience-roles span", text.roles);
  setTexts(".experience-period", text.periods);
  setTexts(".experience-content h1", text.experiences.map((item) => item.title));
  setTexts(".experience-content p", text.experiences.map((item) => item.copy));

  document.querySelectorAll(".language-nav a[data-lang]").forEach((link) => {
    if (link.dataset.lang === lang) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

document.querySelectorAll(".language-nav a[data-lang]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const language = link.dataset.lang;
    localStorage.setItem("portfolio-language", language);
    applyLanguage(language);
  });
});

applyLanguage(getCurrentLanguage());

const liquidNavs = document.querySelectorAll("[data-liquid-nav]");

liquidNavs.forEach((liquidNav) => {
  new LiquidWeb(liquidNav, {
    scale: 38,
    blur: 3,
    saturation: 190,
    aberration: 42,
    mode: "prominent",
  });
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function getCurrentPage() {
  return window.location.pathname.split("/").pop() || "index.html";
}

function getTransitionSettings(targetUrl) {
  const goingToContact = targetUrl.includes("contato");
  const goingToExperiences = targetUrl.includes("experiencias");
  const isForward = goingToContact || goingToExperiences;
  const language = getCurrentLanguage();

  return {
    className: isForward ? "page-transition--forward" : "page-transition--back",
    label:
      language === "en"
        ? goingToContact
          ? "contact"
          : goingToExperiences
            ? "experiences"
            : "home"
        : goingToContact
          ? "contato"
          : goingToExperiences
            ? "experiencias"
            : "inicio",
    startX: isForward ? 100 : -100,
    pullX: isForward ? 36 : -36,
    clipPath: isForward
      ? "polygon(12% 0, 100% 0, 100% 100%, 0 100%)"
      : "polygon(0 0, 88% 0, 100% 100%, 0 100%)",
  };
}

function runPageTransition(targetUrl) {
  if (reducedMotion || !window.gsap) {
    window.location.href = targetUrl;
    return;
  }

  const settings = getTransitionSettings(targetUrl);
  const overlay = document.createElement("div");
  overlay.className = `page-transition ${settings.className}`;
  overlay.innerHTML = `<span>${settings.label}</span>`;
  document.body.appendChild(overlay);
  document.body.classList.add("is-transitioning");

  window.gsap.set(overlay, {
    xPercent: settings.startX,
    clipPath: settings.clipPath,
  });

  window.gsap
    .timeline({
      defaults: { ease: "power4.inOut" },
      onComplete: () => {
        window.location.href = targetUrl;
      },
    })
    .to(overlay, {
      xPercent: settings.pullX,
      duration: 0.28,
      ease: "power2.out",
    })
    .to(overlay, {
      xPercent: 0,
      duration: 0.72,
    });
}

document.querySelectorAll(".bottom-nav a[href$='.html']").forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetUrl = link.getAttribute("href");

    if (!targetUrl || targetUrl === getCurrentPage()) return;

    event.preventDefault();
    runPageTransition(targetUrl);
  });
});
