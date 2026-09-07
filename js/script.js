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
      experiencias: "Portfólio - Eduardo Silva",
      contato: "Contato - Eduardo Silva",
    },
    nav: ["contato", "início", "experiências"],
    heroLeft: "Experiências profissionais",
    orbitKicker: "Produções digitais",
    orbitTitle: "Competências técnicas",
    showcaseKicker: "Trabalhos selecionados",
    showcaseTitle: "Projetos em destaque",
    aboutLabel: "Sobre mim",
    aboutTitle: "Transformo organização e tecnologia em projetos reais.",
    aboutParagraphs: [
      "Atuo nas áreas de tecnologia, administração e coordenação de projetos, com experiência no planejamento, organização e acompanhamento de atividades e equipes.",
      "Também desenvolvo soluções digitais, incluindo sites e aplicações. Minha experiência une gestão administrativa, coordenação e desenvolvimento tecnológico com foco na execução de projetos.",
    ],
    contactCtaTitle: "Entre em contato",
    contactKicker: "Contato",
    contactTitle: "Vamos conversar?",
    emailModalTitle: "Copie meu email",
    emailCopy: "Copiar",
    emailCopied: "Copiado",
    experienceKicker: "Registros profissionais",
    quote: "“A comunicação junto com a compreensão fazem toda a diferença”",
    educationKicker: "Formação atual",
    educationTitle: "Cursando Sistemas para Internet",
    educationSchool: "Senac",
    educationCopy: "Desenvolvimento web, lógica, interfaces digitais e tecnologias para criação de experiências na internet.",
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
      experiencias: "Portfolio - Eduardo Silva",
      contato: "Contact - Eduardo Silva",
    },
    nav: ["contact", "home", "experiences"],
    heroLeft: "Professional experience",
    orbitKicker: "Digital productions",
    orbitTitle: "Technical skills",
    showcaseKicker: "Selected work",
    showcaseTitle: "Featured projects",
    aboutLabel: "About me",
    aboutTitle: "I turn organization and technology into real projects.",
    aboutParagraphs: [
      "I work across technology, administration and project coordination, with experience in planning, organization and following up on activities and teams.",
      "I also develop digital solutions, including websites and applications. My experience combines administrative management, coordination and technological development focused on project delivery.",
    ],
    contactCtaTitle: "Get in touch",
    contactKicker: "Contact",
    contactTitle: "Let's talk?",
    emailModalTitle: "Copy my email",
    emailCopy: "Copy",
    emailCopied: "Copied",
    experienceKicker: "Professional records",
    quote: "“Communication together with understanding makes all the difference”",
    educationKicker: "Current education",
    educationTitle: "Studying Internet Systems",
    educationSchool: "Senac",
    educationCopy: "Web development, logic, digital interfaces and technologies for creating experiences on the internet.",
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

const OPENTYPE_CDN = "https://cdn.jsdelivr.net/npm/opentype.js@1.3.4/dist/opentype.min.js";
const HANDWRITING_FONT_URL = "https://cdn.21st.dev/assets/mirror/13/1347863151acdc00fa281daaba1a3543dbce5870b55f9cf7479a15bb84007681.ttf";
let handwritingLibrary;
let handwritingFont;
let contactTitleObserver;

function loadHandwritingLibrary() {
  if (window.opentype) return Promise.resolve(window.opentype);
  if (handwritingLibrary) return handwritingLibrary;

  handwritingLibrary = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = OPENTYPE_CDN;
    script.async = true;
    script.onload = () => window.opentype ? resolve(window.opentype) : reject(new Error("opentype indisponível"));
    script.onerror = () => reject(new Error("Não foi possível carregar opentype"));
    document.head.appendChild(script);
  });

  return handwritingLibrary;
}

function loadHandwritingFont() {
  if (handwritingFont) return handwritingFont;

  handwritingFont = Promise.all([
    loadHandwritingLibrary(),
    fetch(HANDWRITING_FONT_URL).then((response) => {
      if (!response.ok) throw new Error("Fonte indisponível");
      return response.arrayBuffer();
    }),
  ]).then(([opentype, fontBuffer]) => opentype.parse(fontBuffer));

  return handwritingFont;
}

function animateContactTitle(text) {
  const title = document.querySelector(".contact-cta h2");
  if (!title || !text) return;

  title.textContent = text;
  title.setAttribute("aria-label", text);
  if (contactTitleObserver) contactTitleObserver.disconnect();

  loadHandwritingFont()
    .then((font) => {
      const em = 100;
      const path = font.getPath(text, 0, em, em);
      const box = path.getBoundingBox();
      const padding = em * 0.12;
      const fullPath = path.toPathData(2);
      const contours = fullPath.split(/(?=M)/).filter((contour) => contour.trim().length > 1);
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

      svg.classList.add("contact-cta__handwriting");
      svg.setAttribute("viewBox", `${box.x1 - padding} ${box.y1 - padding} ${box.x2 - box.x1 + padding * 2} ${box.y2 - box.y1 + padding * 2}`);
      svg.setAttribute("role", "img");
      svg.setAttribute("aria-label", text);

      const fill = document.createElementNS("http://www.w3.org/2000/svg", "path");
      fill.setAttribute("d", fullPath);
      fill.setAttribute("class", "contact-cta__handwriting-fill");
      svg.appendChild(fill);

      const paths = contours.map((contour) => {
        const stroke = document.createElementNS("http://www.w3.org/2000/svg", "path");
        stroke.setAttribute("d", contour);
        stroke.setAttribute("class", "contact-cta__handwriting-stroke");
        svg.appendChild(stroke);
        return stroke;
      });

      title.replaceChildren(svg);

      const draw = () => {
        const duration = 1800;
        const count = Math.max(paths.length, 1);

        paths.forEach((stroke, index) => {
          const length = stroke.getTotalLength() || 1;
          const eachDuration = (duration / count) * 2.4;
          stroke.style.strokeDasharray = `${length}`;
          stroke.style.strokeDashoffset = `${length}`;
          stroke.animate(
            [{ strokeDashoffset: length }, { strokeDashoffset: 0 }],
            {
              delay: 90 + (index / count) * duration,
              duration: eachDuration,
              easing: "ease-out",
              fill: "forwards",
            },
          );
        });

        fill.animate([{ opacity: 0 }, { opacity: 1 }], {
          delay: duration * 0.72,
          duration: 450,
          easing: "ease-out",
          fill: "forwards",
        });
      };

      contactTitleObserver = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        draw();
        contactTitleObserver.disconnect();
      }, { threshold: 0.45 });

      contactTitleObserver.observe(title);
    })
    .catch(() => {
      title.textContent = text;
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

  setTexts(".bottom-nav .nav-label", text.nav);
  setText(".hero-left", text.heroLeft);
  setText(".orbit-section__copy p", text.orbitKicker);
  setText(".orbit-section__copy h2", text.orbitTitle);
  setText(".showcase-section__intro p", text.showcaseKicker);
  setText(".showcase-section__intro h2", text.showcaseTitle);
  setText(".about-section__label", text.aboutLabel);
  setText(".about-section h2", text.aboutTitle);
  setTexts(".about-section__content p", text.aboutParagraphs);
  setText(".contact-cta h2", text.contactCtaTitle);
  animateContactTitle(text.contactCtaTitle);
  setText(".contact-kicker", text.contactKicker);
  setText(".contact-inner h2", text.contactTitle);
  setText(".email-modal__panel h2", text.emailModalTitle);
  setText(".email-modal__copy", text.emailCopy);
  setText(".education-content h2", text.educationTitle);
  setText(".education-content p", text.educationCopy);
  setText(".experience-list__header p", lang === "en" ? "Experiences" : "Experi\u00eancias");
  setTexts(".experience-roles span", text.roles);
  setTexts(".experience-period .period-label", text.periods);
  setTexts(".experience-content h2", text.experiences.map((item) => item.title));
  setTexts(".experience-content > p:last-child", text.experiences.map((item) => item.copy));

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
window.lucide?.createIcons();

document.querySelectorAll(".topbar__toggle").forEach((toggle) => {
  const topbar = toggle.closest(".topbar");
  const menu = topbar?.querySelector(".topbar__mobile-menu");
  if (!topbar || !menu) return;

  function setMenu(open) {
    topbar.classList.toggle("is-menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    toggle.innerHTML = `<i data-lucide="${open ? "x" : "menu"}" aria-hidden="true"></i>`;
    window.lucide?.createIcons();
  }

  toggle.addEventListener("click", () => setMenu(!topbar.classList.contains("is-menu-open")));
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });
});

const filmstrip = document.querySelector(".showcase-filmstrip");

if (filmstrip) {
  const cards = [...filmstrip.querySelectorAll(".showcase-filmstrip__card")];
  const progress = [...filmstrip.querySelectorAll(".showcase-filmstrip__progress button")];
  const track = filmstrip.querySelector(".showcase-filmstrip__track");
  const mobileCarousel = window.matchMedia("(max-width: 680px)");
  let activeIndex = 0;
  let startX = 0;
  let scrollFrame = 0;

  function centerActiveCard() {
    if (!track || !mobileCarousel.matches) {
      if (track) track.style.transform = "";
      return;
    }

    const activeCard = cards[activeIndex];
    const targetLeft = activeCard.offsetLeft + activeCard.offsetWidth / 2 - track.clientWidth / 2;
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    track.scrollTo({
      left: Math.max(0, Math.min(targetLeft, maxScroll)),
      behavior: "smooth",
    });
  }

  function selectShowcaseCard(nextIndex, shouldCenter = true) {
    activeIndex = Math.max(0, Math.min(nextIndex, cards.length - 1));

    cards.forEach((card, index) => {
      const isActive = index === activeIndex;
      card.classList.toggle("is-active", isActive);
      card.toggleAttribute("aria-current", isActive);
    });

    progress.forEach((dot, index) => {
      const isActive = index === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.toggleAttribute("aria-current", isActive);
    });

    if (shouldCenter) requestAnimationFrame(centerActiveCard);
  }

  cards.forEach((card, index) => {
    card.addEventListener("click", () => selectShowcaseCard(index));
  });

  progress.forEach((dot, index) => {
    dot.addEventListener("click", () => selectShowcaseCard(index));
  });

  filmstrip.addEventListener("keydown", (event) => {
    const directions = {
      ArrowLeft: activeIndex - 1,
      ArrowRight: activeIndex + 1,
      Home: 0,
      End: cards.length - 1,
    };

    if (!(event.key in directions)) return;
    event.preventDefault();
    selectShowcaseCard(directions[event.key]);
  });

  filmstrip.addEventListener("pointerdown", (event) => {
    startX = event.clientX;
  });

  filmstrip.addEventListener("pointerup", (event) => {
    if (mobileCarousel.matches) return;
    const distance = event.clientX - startX;
    if (Math.abs(distance) < 42) return;
    selectShowcaseCard(activeIndex + (distance < 0 ? 1 : -1));
  });

  track?.addEventListener("scroll", () => {
    if (!mobileCarousel.matches || scrollFrame) return;

    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      const viewportCenter = track.scrollLeft + track.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeIndex) selectShowcaseCard(closestIndex, false);
    });
  }, { passive: true });

  window.addEventListener("resize", centerActiveCard);

  selectShowcaseCard(0);
}

const signatureContainer = document.querySelector("#signature-drawing");
if (signatureContainer) {
  fetch("assets/images/signature-eduardo.svg")
    .then((response) => {
      if (!response.ok) throw new Error("Signature SVG could not be loaded");
      return response.text();
    })
    .then((markup) => {
      signatureContainer.innerHTML = markup;
      const signatureSvg = signatureContainer.querySelector("svg");
      if (!signatureSvg) return;

      const paths = [...signatureSvg.querySelectorAll("path")];

      function drawSignature() {
        let delay = 0;

        paths.forEach((path) => {
          path.getAnimations().forEach((animation) => animation.cancel());

          const length = path.getTotalLength();
          const duration = Math.max(260, Math.min(length * 1.25, 1300));
          path.style.strokeDasharray = `${length}`;
          path.style.strokeDashoffset = `${length}`;

          path.animate(
            [
              { strokeDashoffset: length },
              { strokeDashoffset: 0 },
            ],
            {
              delay,
              duration,
              easing: "cubic-bezier(0.2, 0.75, 0.25, 1)",
              fill: "forwards",
            },
          );

          delay += duration * 0.78;
        });
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          drawSignature();
          observer.disconnect();
        },
        { threshold: 0.35 },
      );

      observer.observe(signatureContainer);
    })
    .catch(() => {
      signatureContainer.innerHTML = '<img src="assets/images/signature-eduardo.png" alt="Assinatura de Eduardo Silva">';
    });
}

const currentPage = getCurrentPage().toLowerCase();

document.querySelectorAll(".bottom-nav a").forEach((link) => {
  const targetPage = (link.getAttribute("href") || "").split("/").pop().toLowerCase();
  const isHomeAnchor = targetPage === "#home" && (currentPage === "index.html" || !currentPage);
  const isCurrentPage = targetPage === currentPage || isHomeAnchor || (!currentPage && targetPage === "index.html");

  if (isCurrentPage) {
    link.setAttribute("aria-current", "page");
  } else {
    link.removeAttribute("aria-current");
  }
});

const emailAddress = "eduardosilcos@gmail.com";
const emailModal = document.querySelector("[data-email-modal]");
const emailTrigger = document.querySelector("[data-email-trigger]");
const emailClose = document.querySelector("[data-email-close]");
const emailCopy = document.querySelector("[data-email-copy]");

function openEmailModal() {
  if (!emailModal) return;
  emailModal.classList.add("is-open");
  emailModal.setAttribute("aria-hidden", "false");
  emailCopy?.focus();
}

function closeEmailModal() {
  if (!emailModal) return;
  emailModal.classList.remove("is-open");
  emailModal.setAttribute("aria-hidden", "true");
  emailTrigger?.focus();
}

async function copyEmail() {
  if (!emailCopy) return;

  try {
    await navigator.clipboard.writeText(emailAddress);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = emailAddress;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  emailCopy.textContent = translations[getCurrentLanguage()].emailCopied;
  window.setTimeout(() => {
    emailCopy.textContent = translations[getCurrentLanguage()].emailCopy;
  }, 1400);
}

emailTrigger?.addEventListener("click", (event) => {
  event.preventDefault();
  openEmailModal();
});

emailClose?.addEventListener("click", closeEmailModal);
emailCopy?.addEventListener("click", copyEmail);

emailModal?.addEventListener("click", (event) => {
  if (event.target === emailModal) closeEmailModal();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && emailModal?.classList.contains("is-open")) {
    closeEmailModal();
  }
});

function getCurrentPage() {
  return window.location.pathname.split("/").pop() || "index.html";
}

function showOpeningIntro() {
  const overlay = document.createElement("div");
  overlay.className = "page-transition";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = `
    <div class="page-transition__name">
      <span>Eduardo</span>
      <span>Silva</span>
    </div>
  `;
  document.body.appendChild(overlay);

  const name = overlay.querySelector(".page-transition__name");
  const nameIn = name.animate(
    [
      { transform: "translateY(125%) rotateX(-12deg)" },
      { transform: "translateY(0) rotateX(0deg)" },
    ],
    { duration: 720, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" },
  );

  nameIn.finished
    .then(() => name.animate(
      [
        { transform: "translateY(0) rotateX(0deg)", color: "#000" },
        { transform: "translateY(-132%) rotateX(10deg)", color: "#858585" },
      ],
      { duration: 720, delay: 140, easing: "cubic-bezier(0.7, 0, 0.84, 0)", fill: "forwards" },
    ).finished)
    .then(() => overlay.animate(
      [{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }],
      { duration: 620, easing: "cubic-bezier(0.76, 0, 0.24, 1)", fill: "forwards" },
    ).finished)
    .finally(() => overlay.remove());
}

if (getCurrentPage() === "index.html") {
  showOpeningIntro();
}
