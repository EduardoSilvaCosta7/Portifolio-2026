import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  Grid3X3,
  Heart,
  Pause,
  Play,
  Repeat2,
  Shuffle,
  SkipBack,
  SkipForward,
  X,
} from "lucide-react";
import filhoDoMatoCover from "../assets/images/filho-do-mato.jpg";

const assetFiles = {
  ...import.meta.glob("../assets/logos/zip-logos/*.svg", {
    eager: true,
    query: "?url",
    import: "default",
  }),
  ...import.meta.glob(
    ["../assets/images/*-card.png", "../assets/images/*-icon.svg", "../assets/images/signature-eduardo.svg"],
    { eager: true, query: "?url", import: "default" },
  ),
};

const asset = (path) => assetFiles[`../assets/${path}`];

const projects = [
  { name: "Acervo Vivo", href: "projeto-acervo-vivo.html", icon: asset("images/acervo-vivo-icon.svg") },
  { name: "Pirania", href: "projeto-pirania.html", icon: asset("images/pirania-icon.svg") },
  { name: "Notaê", href: "projeto-notae.html", icon: asset("images/notae-icon.svg") },
];

const tools = [
  { name: "After Effects", icon: asset("logos/zip-logos/1.svg") },
  { name: "Premiere Pro", icon: asset("logos/zip-logos/2.svg") },
  { name: "Figma", icon: asset("logos/zip-logos/3.svg") },
  { name: "DaVinci Resolve", icon: asset("logos/zip-logos/4.svg") },
  { name: "Codex", icon: asset("logos/zip-logos/5.svg"), dark: true },
  { name: "Claude", icon: asset("logos/zip-logos/6.svg") },
  { name: "HTML", icon: asset("logos/zip-logos/7.svg") },
  { name: "CSS", icon: asset("logos/zip-logos/8.svg") },
  { name: "JavaScript", icon: asset("logos/zip-logos/9.svg") },
  { name: "Word", icon: asset("logos/zip-logos/10.svg") },
  { name: "Excel", icon: asset("logos/zip-logos/11.svg") },
  { name: "PowerPoint", icon: asset("logos/zip-logos/12.svg") },
  { name: "Trello", icon: asset("logos/zip-logos/13.svg") },
];

const mainTools = [tools[2], tools[1], tools[0], tools[3], tools[8]];
const iosSpring = { type: "spring", stiffness: 430, damping: 32, mass: 0.72 };
const spotifyTrack = {
  title: "Filho do Mato",
  artist: "Raí Saia Rodada",
  uri: "spotify:track:6cvFwzez8ZbEWPTs5A0vAm",
  url: "https://open.spotify.com/track/6cvFwzez8ZbEWPTs5A0vAm",
};

let spotifyApiPromise;

function loadSpotifyIframeApi() {
  if (window.__spotifyIframeApi) return Promise.resolve(window.__spotifyIframeApi);
  if (spotifyApiPromise) return spotifyApiPromise;

  spotifyApiPromise = new Promise((resolve) => {
    const previousCallback = window.onSpotifyIframeApiReady;
    window.onSpotifyIframeApiReady = (api) => {
      window.__spotifyIframeApi = api;
      previousCallback?.(api);
      resolve(api);
    };

    if (!document.querySelector('script[src="https://open.spotify.com/embed/iframe-api/v1"]')) {
      const script = document.createElement("script");
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      document.body.appendChild(script);
    }
  });

  return spotifyApiPromise;
}

function formatClock(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })
    .format(date)
    .replace(",", " ·");
}

function SystemBar() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <motion.header
      className="system-bar"
      initial={{ y: -26, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...iosSpring, delay: 0.05 }}
    >
      <div className="system-bar__identity">
        <a className="system-bar__monogram" href="#inicio" aria-label="Voltar ao início">ES</a>
        <span>Eduardo Silva</span>
      </div>
      <nav className="system-bar__nav" aria-label="Navegação principal">
        <a href="#inicio">Início</a>
        <a href="experiencias.html">Portfólio</a>
        <a href="#sobre">Sobre</a>
        <a href="#contato">Contato</a>
      </nav>
      <time dateTime={now.toISOString()}>{formatClock(now)}</time>
    </motion.header>
  );
}

function ProjectFolders() {
  return (
    <motion.nav
      className="project-folders"
      aria-label="Projetos em destaque"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.085, delayChildren: 0.28 } },
      }}
    >
      <p className="project-folders__label">Meus projetos</p>
      <div className="project-folders__grid">
        {projects.map((project) => (
          <motion.a
            className="project-folder"
            href={project.href}
            variants={{
              hidden: { x: 28, opacity: 0, scale: 0.84 },
              visible: { x: 0, opacity: 1, scale: 1, transition: iosSpring },
            }}
            whileHover={{ y: -7, scale: 1.06 }}
            whileTap={{ scale: 0.9 }}
            transition={iosSpring}
            key={project.name}
          >
            <span className="project-folder__icon">
              <img src={project.icon} alt="" />
            </span>
            <span>{project.name}</span>
          </motion.a>
        ))}
      </div>
    </motion.nav>
  );
}

function MusicWidget() {
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const spotifyEmbedRef = useRef(null);
  const spotifyControllerRef = useRef(null);
  const waveform = [42, 70, 88, 58, 76, 50, 82, 68, 92, 62, 78, 45, 72, 86, 55, 80, 62, 90, 48, 74, 84, 58, 76, 93, 64, 82, 54, 72, 88, 61, 80, 47];
  const progress = duration ? Math.min((position / duration) * 100, 100) : 0;

  useEffect(() => {
    let cancelled = false;

    loadSpotifyIframeApi().then((IFrameAPI) => {
      if (cancelled || !spotifyEmbedRef.current) return;

      IFrameAPI.createController(
        spotifyEmbedRef.current,
        { uri: spotifyTrack.uri, width: 80, height: 80 },
        (controller) => {
          if (cancelled) {
            controller.destroy();
            return;
          }

          spotifyControllerRef.current = controller;
          controller.addListener("ready", () => setPlayerReady(true));
          controller.addListener("playback_update", ({ data }) => {
            setPlaying(!data.isPaused);
            setPosition(data.position || 0);
            setDuration(data.duration || 0);
          });
        },
      );
    });

    return () => {
      cancelled = true;
      spotifyControllerRef.current?.destroy();
      spotifyControllerRef.current = null;
    };
  }, []);

  function togglePlayback() {
    spotifyControllerRef.current?.togglePlay();
  }

  function restartTrack() {
    spotifyControllerRef.current?.restart();
  }

  function seekTrack(event) {
    if (!duration || !spotifyControllerRef.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((event.clientX - bounds.left) / bounds.width, 0), 1);
    spotifyControllerRef.current.seek(Math.round((duration * ratio) / 1000));
  }

  return (
    <motion.section
      className="music-widget"
      aria-label={`Player de música: ${spotifyTrack.title}, ${spotifyTrack.artist}`}
      initial={{ x: -32, y: -8, opacity: 0, scale: 0.9 }}
      animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      transition={{ ...iosSpring, delay: 0.18 }}
      whileHover={{ y: -3, scale: 1.012 }}
    >
      <a
        className="music-widget__cover"
        href={spotifyTrack.url}
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir Filho do Mato no Spotify"
      >
        <img src={filhoDoMatoCover} alt="Capa de Filho do Mato" />
      </a>
      <div className="music-widget__content">
        <div className="music-widget__spotify-embed" aria-hidden="true">
          <div ref={spotifyEmbedRef} />
        </div>
        <div className="music-widget__meta">
          <div>
            <strong>{spotifyTrack.title}</strong>
            <a href={spotifyTrack.url} target="_blank" rel="noreferrer">{spotifyTrack.artist} · Spotify</a>
          </div>
          <motion.button
            className={`music-widget__favorite${liked ? " is-liked" : ""}`}
            type="button"
            aria-label={liked ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            aria-pressed={liked}
            onClick={() => setLiked((value) => !value)}
            whileTap={{ scale: 0.72 }}
            transition={iosSpring}
          >
            <Heart fill={liked ? "currentColor" : "none"} />
          </motion.button>
        </div>
        <button
          className="music-widget__progress"
          type="button"
          aria-label="Alterar posição da música"
          onClick={seekTrack}
          style={{ "--music-progress": `${progress}%` }}
        >
          <span /><i />
        </button>
        <div className="music-widget__controls" aria-label="Controles da música">
          <button type="button" aria-label="Embaralhar" disabled><Shuffle /></button>
          <button type="button" aria-label="Reiniciar música" onClick={restartTrack} disabled={!playerReady}><SkipBack fill="currentColor" /></button>
          <motion.button
            className="music-widget__play"
            type="button"
            aria-label={playing ? "Pausar música" : "Reproduzir música"}
            aria-pressed={playing}
            onClick={togglePlayback}
            disabled={!playerReady}
            whileTap={{ scale: 0.78 }}
            transition={iosSpring}
          >
            {playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
          </motion.button>
          <button type="button" aria-label="Próxima faixa" disabled><SkipForward fill="currentColor" /></button>
          <button type="button" aria-label="Repetir" disabled><Repeat2 /></button>
        </div>
        <div className="music-widget__waveform" aria-hidden="true">
          {waveform.map((height, index) => (
            <motion.span
              style={{ height: `${height}%` }}
              animate={playing ? { scaleY: [0.5, 1, 0.62] } : { scaleY: 0.72 }}
              transition={playing ? { duration: 0.6 + (index % 5) * 0.08, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: index * 0.018 } : iosSpring}
              key={`${height}-${index}`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function ToolIcon({ tool, withLabel = false }) {
  return (
    <motion.div
      className="tool-entry"
      whileHover={{ y: withLabel ? -3 : -10, scale: withLabel ? 1.04 : 1.18 }}
      whileTap={{ scale: 0.86 }}
      transition={iosSpring}
    >
      <motion.span className={`tool-entry__icon${tool.dark ? " tool-entry__icon--dark" : ""}`}>
        <img src={tool.icon} alt="" />
      </motion.span>
      {withLabel && <span className="tool-entry__label">{tool.name}</span>}
      {!withLabel && <span className="tool-entry__tooltip" role="tooltip">{tool.name}</span>}
    </motion.div>
  );
}

function ToolDock() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <div className="tool-dock-wrap">
      <AnimatePresence>
        {open && (
        <motion.section
          className="tools-panel"
          ref={panelRef}
          aria-label="Todas as ferramentas"
          initial={{ opacity: 0, y: 24, scale: 0.82, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 18, scale: 0.88, filter: "blur(7px)" }}
          transition={iosSpring}
        >
          <header>
            <div>
              <h2>Ferramentas que uso</h2>
            </div>
            <motion.button type="button" onClick={() => setOpen(false)} aria-label="Fechar ferramentas" whileTap={{ scale: 0.78 }}><X /></motion.button>
          </header>
          <div className="tools-panel__grid">
            {tools.map((tool) => <ToolIcon tool={tool} withLabel key={tool.name} />)}
          </div>
        </motion.section>
        )}
      </AnimatePresence>

      <motion.div
        className="tool-dock"
        aria-label="Ferramentas mais usadas"
        initial={{ y: 40, opacity: 0, scale: 0.86 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ ...iosSpring, delay: 0.34 }}
        layout
      >
        {mainTools.map((tool) => <ToolIcon tool={tool} key={tool.name} />)}
        <span className="tool-dock__divider" aria-hidden="true" />
        <motion.button
          className="tool-dock__more"
          type="button"
          aria-label={open ? "Fechar todas as ferramentas" : "Ver todas as ferramentas"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          whileTap={{ scale: 0.8 }}
          animate={{ rotate: open ? 90 : 0 }}
          transition={iosSpring}
        >
          {open ? <X /> : <Grid3X3 />}
          <span>{open ? "Fechar" : "Ver mais"}</span>
        </motion.button>
      </motion.div>
    </div>
  );
}

function DesktopHero() {
  return (
    <section className="desktop-hero" id="inicio" aria-label="Área de trabalho de Eduardo Silva">
      <SystemBar />
      <MusicWidget />

      <motion.div
        className="desktop-hero__intro"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
        }}
      >
        <motion.h1 variants={{ hidden: { y: 28, opacity: 0, scale: 0.94 }, visible: { y: 0, opacity: 1, scale: 1, transition: iosSpring } }}>Opa<br />me chamo Eduardo</motion.h1>
        <motion.p variants={{ hidden: { y: 18, opacity: 0 }, visible: { y: 0, opacity: 1, transition: iosSpring } }}>Costumo falar que problemas complexos têm soluções bem simples.</motion.p>
      </motion.div>

      <ProjectFolders />
      <ToolDock />
      <span className="desktop-hero__scroll">Role para conhecer mais</span>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="about-section" id="sobre" aria-labelledby="about-title">
      <div className="about-section__label">Sobre mim</div>
      <div className="about-section__content">
        <h2 id="about-title">Conecto estratégia, tecnologia e execução para tirar projetos do papel.</h2>
        <div>
          <p>Atuo de forma versátil entre administração, coordenação de projetos e design, com experiência em planejamento, organização, acompanhamento de equipes e criação de soluções visuais.</p>
          <p>Também desenvolvo sites e aplicações, crio peças de design e trabalho com edição de vídeo e imagem. Essa combinação de competências me permite transitar entre estratégia, gestão e produção, adaptando-me às necessidades de cada projeto e conduzindo ideias até a entrega.</p>
        </div>
      </div>
    </section>
  );
}

function ShowcaseSection() {
  const [active, setActive] = useState(0);
  const cards = [
    { name: "Acervo Vivo", image: asset("images/acervo-vivo-card.png"), href: "projeto-acervo-vivo.html", glow: "#b99a70" },
    { name: "Pirania", image: asset("images/pirania-card.png"), href: "projeto-pirania.html", glow: "#5792d6" },
    { name: "Notaê", image: asset("images/notae-card.png"), href: "projeto-notae.html", glow: "#e97614" },
  ];

  return (
    <section className="showcase-section" aria-label="Projetos em destaque">
      <div className="showcase-section__intro">
        <p>Trabalhos selecionados</p>
        <h2>Projetos em destaque</h2>
      </div>
      <div className="showcase-filmstrip" role="region" aria-roledescription="carrossel" aria-label="Projetos em destaque">
        <div className="showcase-filmstrip__track">
          {cards.map((card, index) => (
            <a
              className={`showcase-filmstrip__card${active === index ? " is-active" : ""}`}
              href={card.href}
              style={{ "--card-glow": card.glow }}
              aria-label={`Abrir projeto ${card.name}`}
              aria-current={active === index ? "true" : undefined}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              key={card.name}
            >
              <img src={card.image} alt={`Projeto ${card.name}`} />
            </a>
          ))}
        </div>
        <div className="showcase-filmstrip__progress" aria-label="Selecionar projeto">
          {cards.map((card, index) => (
            <button
              className={active === index ? "is-active" : ""}
              type="button"
              aria-label={`Mostrar projeto ${card.name}`}
              aria-current={active === index ? "true" : undefined}
              onClick={() => setActive(index)}
              key={card.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function OrbitSection() {
  return (
    <section className="orbit-section" aria-label="Produções digitais">
      <div className="orbit-section__copy">
        <p>Produções digitais</p>
        <h2>Competências técnicas</h2>
      </div>
      <div className="orbit-globe" aria-label="Ferramentas criativas e tecnológicas em órbita">
        {[tools.slice(0, 4), tools.slice(4, 8), tools.slice(8, 13)].map((orbitTools, orbitIndex) => (
          <div className={`orbit orbit--${["one", "two", "three"][orbitIndex]}`} aria-hidden="true" key={orbitIndex}>
            {orbitTools.map((tool, index) => (
              <span style={{ "--x": `${50 + 48 * Math.sin((index / orbitTools.length) * Math.PI * 2)}%`, "--y": `${50 - 48 * Math.cos((index / orbitTools.length) * Math.PI * 2)}%` }} key={tool.name}>
                <img src={tool.icon} alt="" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact-cta" id="contato" aria-label="Entre em contato">
      <div className="contact-cta__inner">
        <div id="signature-drawing" aria-hidden="true"><img src={asset("images/signature-eduardo.svg")} alt="" /></div>
        <h2>Entre em contato</h2>
        <div className="contact-cta__links">
          <a href="mailto:eduardosilcos@gmail.com">Email</a>
          <a href="https://github.com/EduardoSilvaCosta7" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://wa.me/5511978472679" target="_blank" rel="noreferrer">WhatsApp</a>
          <a href="https://www.linkedin.com/in/eduardo-silva-49605a435/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user" transition={iosSpring}>
      <DesktopHero />
      <main>
        <AboutSection />
        <ShowcaseSection />
        <OrbitSection />
        <ContactSection />
      </main>
    </MotionConfig>
  );
}
