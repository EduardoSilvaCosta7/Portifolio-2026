import { ArrowDown, ArrowLeft, ArrowUpRight, Folder } from "lucide-react";

const projectAssets = import.meta.glob(
  ["../assets/images/*-banner.png", "../assets/images/*-gallery-*.png"],
  { eager: true, query: "?url", import: "default" },
);

const image = (path) => projectAssets[`../assets/images/${path}`];

const projects = {
  "projeto-acervo-vivo.html": {
    number: "01",
    shortName: "Acervo Vivo",
    title: "Plataforma Acervo Vivo",
    description: "Coordenação da criação e organização de uma plataforma digital pensada para preservar memória, estruturar conteúdo e apresentar o projeto com clareza e identidade.",
    accent: "#e9c72f",
    cover: image("acervo-vivo-banner.png"),
    coverAlt: "Identidade visual da plataforma Acervo Vivo",
    links: [
      ["Papel", "Coordenação do projeto"],
      ["Entrega", "Estrutura, conteúdo e presença digital"],
      ["Contexto", "Cultura e preservação de memória"],
    ],
  },
  "projeto-pirania.html": {
    number: "02",
    shortName: "Pirania",
    title: "Remasterização do site Pirania",
    description: "Atualização visual e estrutural do site Pirania para organizar informações, reforçar sua identidade digital e construir uma experiência mais clara e responsiva.",
    accent: "#e9c72f",
    cover: image("pirania-banner.png"),
    coverAlt: "Personagem e identidade do projeto Pirania",
    gallery: [image("pirania-gallery-01.png")],
    links: [
      ["Papel", "Design e desenvolvimento"],
      ["Entrega", "Interface responsiva e identidade digital"],
      ["Foco", "Clareza, navegação e apresentação"],
    ],
  },
  "projeto-notae.html": {
    number: "03",
    shortName: "Notaê",
    title: "Notaê: sistema para escolas",
    description: "Criação de uma identidade de produto para um sistema voltado a escolas, com uma apresentação direta e acolhedora para comunicar a proposta da plataforma.",
    accent: "#e9c72f",
    cover: image("notae-banner.png"),
    coverAlt: "Identidade visual do sistema Notaê",
    gallery: [image("notae-gallery-01.png")],
    links: [
      ["Papel", "Produto e identidade visual"],
      ["Entrega", "Conceito e interface do sistema"],
      ["Contexto", "Educação e gestão escolar"],
    ],
  },
};

function getProject() {
  const page = window.location.pathname.split("/").pop() || "projeto-acervo-vivo.html";
  return projects[page] || projects["projeto-acervo-vivo.html"];
}

function ProjectSystemBar({ project }) {
  return (
    <header className="project-system-bar">
      <a className="project-system-bar__brand" href="index.html" aria-label="Voltar para a página inicial">ES</a>
      <div className="project-system-bar__tab">
        <Folder aria-hidden="true" />
        <span>{project.shortName}</span>
      </div>
      <nav aria-label="Navegação do projeto">
        <a href="index.html">Início</a>
        <a href="experiencias.html">Todos os projetos</a>
      </nav>
    </header>
  );
}

function ProjectInfoCard({ project }) {
  return (
    <aside className="project-info-card" style={{ "--project-accent": project.accent }} aria-label="Informações do projeto">
      <div className="project-info-card__accent" />
      <div className="project-info-card__body">
        {project.links.map(([label, value]) => (
          <div className="project-info-card__row" key={label}>
            <strong>{label}</strong>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default function ProjectPage() {
  const project = getProject();
  const gallery = project.gallery || [];

  return (
    <div className="project-system">
      <ProjectSystemBar project={project} />

      <main className="project-workspace">
        <section className="project-overview" aria-labelledby="project-title">
          <div className="project-overview__copy">
            <p className="project-overview__eyebrow">Projeto nº{project.number}</p>
            <h1 id="project-title">{project.title}</h1>
            <p className="project-overview__description">{project.description}</p>
            <div className="project-overview__actions">
              <a href="#visual"><span>Ver projeto</span><ArrowDown aria-hidden="true" /></a>
              <a href="experiencias.html"><span>Portfólio</span><ArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>
          <ProjectInfoCard project={project} />
        </section>

        <section className="project-visual" id="visual" aria-labelledby="visual-title">
          <header>
            <p>Visual do projeto</p>
            <h2 id="visual-title">Uma visão mais próxima</h2>
          </header>
          <figure className="project-visual__cover">
            <img src={project.cover} alt={project.coverAlt} />
          </figure>
          {gallery.length > 0 && (
            <div className="project-visual__gallery">
              {gallery.map((galleryImage, index) => (
                <img src={galleryImage} alt={`${project.shortName}: imagem ${index + 1} do projeto`} key={galleryImage} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="project-footer">
        <a href="experiencias.html"><ArrowLeft aria-hidden="true" /> Voltar para todos os projetos</a>
        <span>Eduardo Silva · Portfólio</span>
      </footer>
    </div>
  );
}
