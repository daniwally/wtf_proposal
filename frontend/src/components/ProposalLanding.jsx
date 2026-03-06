import { useState, useEffect } from "react";
import { 
  Check, ChevronDown, ArrowRight, Target, Zap, Globe, 
  Users, Award,
  Palette, Megaphone, LineChart, Menu, X, Languages
} from "lucide-react";

// Asset URLs
const ASSETS = {
  logoWtfWhite: "https://customer-assets.emergentagent.com/job_wine-brand-brasil/artifacts/ychnnfb7_logo-wtf.png",
  logoWtfBlack: "https://customer-assets.emergentagent.com/job_wine-brand-brasil/artifacts/6fw22kmg_logo-wtf-negro.png",
  vineyard1: "https://customer-assets.emergentagent.com/job_wine-brand-brasil/artifacts/zcoibi26_u2462154512_imagine_close_up_shot_of_a_grape_tree_in_a_vineya_ac2b6445-5f2f-4b54-b627-c7ace1024fdc_1.png",
  vineyard2: "https://customer-assets.emergentagent.com/job_wine-brand-brasil/artifacts/jl6vtjbu_u2462154512_Rustic_vineyard_in_Puglia_during_golden_sunset_ro_b2d7dc40-0b37-41be-a164-333d55112326_0%20%281%29.png",
  grapes1: "https://customer-assets.emergentagent.com/job_wine-brand-brasil/artifacts/iz9dvpfg_u2462154512_Extreme_macro_editorial_photograph_of_strong_slig_d42a410b-8b34-44dd-93e5-b01f1b58fd9e_0.png",
  grapes2: "https://customer-assets.emergentagent.com/job_wine-brand-brasil/artifacts/5f7q5nas_u2462154512_Ultra-immersive_macro_perspective_moving_along_th_fd150ffc-adfd-4287-85d7-7f0444d56e86_1.png",
  grapes3: "https://customer-assets.emergentagent.com/job_wine-brand-brasil/artifacts/qq7k0y6g_u2462154512_Ultra-immersive_macro_perspective_moving_along_th_f392ba18-f102-4b67-8e8e-dd0bb783e650_0.png",
};

// Translations
const TRANSLATIONS = {
  pt: {
    nav: ["Projeto", "Fases", "Metodologia", "Equipe", "Contato"],
    hero: {
      label: "Proposta de Projeto",
      title1: "Desenvolvimento Integral",
      title2: "Marca de Vinhos",
      title3: "para o Brasil",
      subtitle: "Do conceito ao líder de mercado. Naming, identidade, packaging, lançamento digital e gestão contínua.",
      cta: "Ver Proposta"
    },
    project: {
      label: "O Projeto",
      title: "Construir uma marca de vinhos que conquiste o Brasil",
      desc: "Um programa de 12 meses para desenvolver, lançar e escalar sua marca de vinhos no mercado brasileiro. Da criação do nome até a gestão contínua de campanhas e expansão.",
      months: "Meses",
      phases: "Fases",
      scope: "Escopo"
    },
    phasesSection: {
      label: "Escopo do Projeto",
      title: "Fases do Projeto",
      deliverables: "Entregáveis"
    },
    phases: [
      {
        id: 1,
        title: "Brand Development",
        subtitle: "Desenvolvimento de Marca",
        duration: "Meses 1-3",
        description: "Construção dos alicerces estratégicos e visuais da sua marca de vinhos. Da conceituação até um sistema de identidade completo pronto para conquistar o mercado brasileiro.",
        scope: [
          { title: "Naming & Arquitetura de Marca", desc: "Desenvolvimento do nome, tagline, proposta de valor única e estrutura de portfólio para posicionamento premium no Brasil" },
          { title: "Sistema de Identidade Visual", desc: "Logo principal, variantes, paleta de cores, tipografia, iconografia e guidelines de uso completos" },
          { title: "Design de Packaging", desc: "3 linhas de produto com design de rótulos, cápsulas, caixas e materiais POP diferenciados" },
          { title: "Pesquisa de Mercado Brasil", desc: "Análise competitiva, mapeamento de canais, perfil do consumidor brasileiro e oportunidades de posicionamento" },
          { title: "Compliance Regulatório", desc: "Guia de requisitos legais para comercialização de vinhos no Brasil, rotulagem e certificações necessárias" }
        ],
        deliverables: ["Brand Book completo", "Design de rótulos únicos", "Manual de packaging e materiais", "Relatório de pesquisa de mercado", "Guia de compliance regulatório Brasil"]
      },
      {
        id: 2,
        title: "Market Launch Brasil",
        subtitle: "Lançamento no Mercado",
        duration: "Meses 4-6",
        description: "Execução integral do lançamento no Brasil. Construímos sua presença digital, criamos conteúdo premium e ativamos campanhas que geram awareness e demanda desde o primeiro dia.",
        scope: [
          { title: "Estratégia Go-to-Market 360°", desc: "Plano de lançamento detalhado com canais, timing, investimento publicitário e KPIs de sucesso" },
          { title: "Plataforma Digital & E-commerce", desc: "Website institucional + loja online integrada com gateways de pagamento brasileiros e logística local" },
          { title: "Produção de Conteúdo Premium", desc: "Sessão fotográfica profissional, vídeos de marca, assets para redes sociais e materiais de venda" },
          { title: "Campanha de Lançamento", desc: "Ativação em mídias digitais, PR, eventos de apresentação e sampling estratégico" },
          { title: "Rede de Influencers & Sommeliers", desc: "Parcerias com líderes de opinião do mundo do vinho no Brasil para amplificar o lançamento" }
        ],
        deliverables: ["Website + E-commerce funcionando", "500+ assets de conteúdo", "Vídeo de marca (60s + cuts)", "Campanha ativa em mídias", "Rede de 20+ influencers ativada"]
      },
      {
        id: 3,
        title: "Growth & Management",
        subtitle: "Crescimento e Gestão",
        duration: "Meses 7-12",
        description: "Gestão contínua e otimização para escalar resultados. Monitoramos performance, ajustamos estratégias e expandimos sua presença para consolidar a marca no mercado brasileiro.",
        scope: [
          { title: "Otimização de Campanhas", desc: "A/B testing contínuo, otimização de audiências, criativos e lances para maximizar ROAS" },
          { title: "Gestão de Performance", desc: "Monitoramento diário de KPIs, dashboards em tempo real e relatórios executivos mensais" },
          { title: "Estratégia de Expansão", desc: "Análise de novos canais de distribuição, regiões e oportunidades de crescimento no Brasil" },
          { title: "Desenvolvimento Contínuo de Marca", desc: "Evolução visual, novas linhas de produto, edições limitadas e colaborações especiais" },
          { title: "Campanhas Sazonais", desc: "Ativações para datas-chave: vindima, festas, Dia do Vinho, eventos gastronômicos" }
        ],
        deliverables: ["12 relatórios de performance mensais", "Otimização contínua de campanhas", "4 campanhas sazonais", "Plano de expansão ano 2", "Evolução de marca documentada"]
      }
    ],
    timeline: {
      label: "Planejamento",
      title: "Roadmap de 12 Meses",
      items: [
        { month: "1-3", label: "Brand Development", items: ["Naming", "Identidade", "Packaging", "Pesquisa"] },
        { month: "4-6", label: "Market Launch", items: ["Digital", "Conteúdo", "Campanha", "PR"] },
        { month: "7-12", label: "Growth", items: ["Otimização", "Expansão", "Performance"] }
      ]
    },
    methodology: {
      label: "Como Trabalhamos",
      title: "Metodologia WTF",
      desc: "Combinamos inteligência artificial com 15 anos de experiência na indústria do vinho para entregar resultados extraordinários em tempo recorde.",
      items: [
        { title: "AI-Powered", desc: "Sistema de desenvolvimento de marca impulsionado por inteligência artificial" },
        { title: "85% Mais Rápido", desc: "Que agências tradicionais em tempo de entrega" },
        { title: "Wine Expertise", desc: "Portfólio inclui Casillero del Diablo e marcas premium" },
        { title: "Brasil Office", desc: "Equipe local em São Paulo para o mercado brasileiro" }
      ]
    },
    team: {
      label: "A Equipe",
      title: "Credenciais",
      credentials: [
        { value: "15+", label: "Anos na indústria do vinho" },
        { value: "50+", label: "Marcas desenvolvidas" },
        { value: "8", label: "Mercados internacionais" },
        { value: "360°", label: "Execução end-to-end" }
      ],
      items: [
        "Portfólio: Casillero del Diablo, Absolut, +50 marcas",
        "Escritório em São Paulo para o mercado brasileiro",
        "Especialista dedicado na indústria do vinho"
      ]
    },
    contact: {
      label: "Investimento",
      title: "Iniciar o Projeto",
      monthlyFee: "Fee Mensal",
      program: "Programa de 12 meses",
      annualTotal: "Investimento Total Anual",
      cta: "Entre em contato para agendar uma sessão estratégica e discutir os próximos passos."
    },
    footer: {
      proposalFor: "Proposta para"
    },
    quote: {
      text: "O design não é apenas o que parece e o que se sente. Design é como funciona.",
      author: "Steve Jobs"
    }
  },
  es: {
    nav: ["Proyecto", "Fases", "Metodología", "Equipo", "Contacto"],
    hero: {
      label: "Propuesta de Proyecto",
      title1: "Desarrollo Integral",
      title2: "Marca de Vinos",
      title3: "para Brasil",
      subtitle: "De concepto a líder de mercado. Naming, identidad, packaging, lanzamiento digital y gestión continua.",
      cta: "Ver Propuesta"
    },
    project: {
      label: "El Proyecto",
      title: "Construir una marca de vinos que conquiste Brasil",
      desc: "Un programa de 12 meses para desarrollar, lanzar y escalar tu marca de vinos en el mercado brasileño. Desde la creación del nombre hasta la gestión continua de campañas y expansión.",
      months: "Meses",
      phases: "Fases",
      scope: "Alcance"
    },
    phasesSection: {
      label: "Alcance del Proyecto",
      title: "Fases del Proyecto",
      deliverables: "Entregables"
    },
    phases: [
      {
        id: 1,
        title: "Brand Development",
        subtitle: "Desarrollo de Marca",
        duration: "Meses 1-3",
        description: "Construcción de los cimientos estratégicos y visuales de tu marca de vinos. Desde la conceptualización hasta un sistema de identidad completo listo para conquistar el mercado brasileño.",
        scope: [
          { title: "Naming & Arquitectura de Marca", desc: "Desarrollo del nombre, tagline, propuesta de valor única y estructura de portfolio para posicionamiento premium en Brasil" },
          { title: "Sistema de Identidad Visual", desc: "Logo principal, variantes, paleta de colores, tipografía, iconografía y guidelines de uso completos" },
          { title: "Diseño de Packaging", desc: "3 líneas de producto con diseño de etiquetas, cápsulas, cajas y materiales POP diferenciados" },
          { title: "Investigación de Mercado Brasil", desc: "Análisis competitivo, mapeo de canales, perfil del consumidor brasileño y oportunidades de posicionamiento" },
          { title: "Cumplimiento Regulatorio", desc: "Guía de requisitos legales para comercialización de vinos en Brasil, etiquetado y certificaciones necesarias" }
        ],
        deliverables: ["Brand Book completo", "Diseño de etiquetas únicos", "Manual de packaging y materiales", "Reporte de investigación de mercado", "Guía de compliance regulatorio Brasil"]
      },
      {
        id: 2,
        title: "Market Launch Brasil",
        subtitle: "Lanzamiento al Mercado",
        duration: "Meses 4-6",
        description: "Ejecución integral del lanzamiento en Brasil. Construimos tu presencia digital, creamos contenido premium y activamos campañas que generan awareness y demanda desde el día uno.",
        scope: [
          { title: "Estrategia Go-to-Market 360°", desc: "Plan de lanzamiento detallado con canales, timing, inversión publicitaria y KPIs de éxito" },
          { title: "Plataforma Digital & E-commerce", desc: "Website institucional + tienda online integrada con pasarelas de pago brasileñas y logística local" },
          { title: "Producción de Contenido Premium", desc: "Sesión fotográfica profesional, videos de marca, assets para redes sociales y materiales de venta" },
          { title: "Campaña de Lanzamiento", desc: "Activación en medios digitales, PR, eventos de presentación y sampling estratégico" },
          { title: "Red de Influencers & Sommeliers", desc: "Partnerships con líderes de opinión del mundo del vino en Brasil para amplificar el lanzamiento" }
        ],
        deliverables: ["Website + E-commerce funcionando", "500+ assets de contenido", "Video de marca (60s + cuts)", "Campaña activa en medios", "Red de 20+ influencers activada"]
      },
      {
        id: 3,
        title: "Growth & Management",
        subtitle: "Crecimiento y Gestión",
        duration: "Meses 7-12",
        description: "Gestión continua y optimización para escalar resultados. Monitoreamos performance, ajustamos estrategias y expandimos tu presencia para consolidar la marca en el mercado brasileño.",
        scope: [
          { title: "Optimización de Campañas", desc: "A/B testing continuo, optimización de audiencias, creatividades y pujas para maximizar ROAS" },
          { title: "Gestión de Performance", desc: "Monitoreo diario de KPIs, dashboards en tiempo real y reportes ejecutivos mensuales" },
          { title: "Estrategia de Expansión", desc: "Análisis de nuevos canales de distribución, regiones y oportunidades de crecimiento en Brasil" },
          { title: "Desarrollo Continuo de Marca", desc: "Evolución visual, nuevas líneas de producto, ediciones limitadas y colaboraciones especiales" },
          { title: "Campañas Estacionales", desc: "Activaciones para fechas clave: vendimia, fiestas, Día del Vino, eventos gastronómicos" }
        ],
        deliverables: ["12 reportes de performance mensuales", "Optimización continua de campañas", "4 campañas estacionales", "Plan de expansión año 2", "Evolución de marca documentada"]
      }
    ],
    timeline: {
      label: "Planificación",
      title: "Roadmap de 12 Meses",
      items: [
        { month: "1-3", label: "Brand Development", items: ["Naming", "Identidad", "Packaging", "Research"] },
        { month: "4-6", label: "Market Launch", items: ["Digital", "Contenido", "Campaña", "PR"] },
        { month: "7-12", label: "Growth", items: ["Optimización", "Expansión", "Performance"] }
      ]
    },
    methodology: {
      label: "Cómo Trabajamos",
      title: "Metodología WTF",
      desc: "Combinamos inteligencia artificial con 15 años de experiencia en la industria del vino para entregar resultados extraordinarios en tiempo récord.",
      items: [
        { title: "AI-Powered", desc: "Sistema de desarrollo de marca impulsado por inteligencia artificial" },
        { title: "85% Más Rápido", desc: "Que agencias tradicionales en tiempo de entrega" },
        { title: "Wine Expertise", desc: "Portfolio incluye Casillero del Diablo y marcas premium" },
        { title: "Brasil Office", desc: "Equipo local en São Paulo para el mercado brasileño" }
      ]
    },
    team: {
      label: "El Equipo",
      title: "Credenciales",
      credentials: [
        { value: "15+", label: "Años en industria del vino" },
        { value: "50+", label: "Marcas desarrolladas" },
        { value: "8", label: "Mercados internacionales" },
        { value: "360°", label: "Ejecución end-to-end" }
      ],
      items: [
        "Portfolio: Casillero del Diablo, Absolut, +50 marcas",
        "Oficina en São Paulo para mercado brasileño",
        "Especialista dedicado en industria del vino"
      ]
    },
    contact: {
      label: "Inversión",
      title: "Comenzar el Proyecto",
      monthlyFee: "Fee Mensual",
      program: "Programa de 12 meses",
      annualTotal: "Inversión Total Anual",
      cta: "Contáctanos para agendar una sesión estratégica y discutir los próximos pasos."
    },
    footer: {
      proposalFor: "Propuesta para"
    },
    quote: {
      text: "El diseño no es solo lo que se ve y lo que se siente. El diseño es cómo funciona.",
      author: "Steve Jobs"
    }
  }
};

const ICONS = [Zap, Target, Award, Globe];

export default function ProposalLanding() {
  const [activePhase, setActivePhase] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState("pt"); // Default Portuguese

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".section-animate").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const sectionId = id.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLang(lang === "pt" ? "es" : "pt");
  };

  const currentPhase = t.phases.find(p => p.id === activePhase);
  const PhaseIcons = [Palette, Megaphone, LineChart];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10" data-testid="navigation">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <img 
            src={ASSETS.logoWtfWhite} 
            alt="WTF Agency" 
            className="h-8 object-contain"
            data-testid="nav-logo"
          />
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {t.nav.map((item, i) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
                data-testid={`nav-${item.toLowerCase()}`}
              >
                {item}
              </button>
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors border border-white/20 px-3 py-2 hover:border-white/40"
              data-testid="language-toggle"
            >
              <Languages size={14} />
              {lang === "pt" ? "ES" : "PT"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/60 border border-white/20 px-2 py-1"
              data-testid="mobile-language-toggle"
            >
              <Languages size={12} />
              {lang === "pt" ? "ES" : "PT"}
            </button>
            <button 
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black py-8 px-6 border-t border-white/10">
            {t.nav.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left py-3 text-sm uppercase tracking-[0.15em] text-white/60 hover:text-white border-b border-white/5"
                data-testid={`mobile-nav-${item.toLowerCase()}`}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center" data-testid="hero-section">
        <div className="absolute inset-0">
          <img 
            src={ASSETS.vineyard2} 
            alt="Vineyard" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
          {/* Logos */}
          <div className="flex items-center gap-6 mb-16 opacity-0 animate-fade-in-up">
            <img src={ASSETS.logoWtfWhite} alt="WTF Agency" className="h-12" data-testid="hero-wtf-logo" />
            <div className="w-px h-10 bg-white/30" />
            <span className="text-white/60 text-sm uppercase tracking-[0.2em]" data-testid="hero-client-logo">
              Grupo Upper Blanc
            </span>
          </div>

          {/* Headline */}
          <div className="max-w-4xl">
            <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-6 opacity-0 animate-fade-in-up">
              {t.hero.label}
            </p>
            <h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.1] mb-8 opacity-0 animate-fade-in-up animate-delay-100"
              data-testid="hero-headline"
            >
              {t.hero.title1}<br />
              <span className="font-normal">{t.hero.title2}</span><br />
              <span className="text-white/50">{t.hero.title3}</span>
            </h1>

            {/* Subheadline */}
            <p 
              className="text-xl text-white/60 max-w-xl mb-12 opacity-0 animate-fade-in-up animate-delay-200"
              data-testid="hero-subheadline"
            >
              {t.hero.subtitle}
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up animate-delay-300">
              <button 
                onClick={() => scrollToSection("fases")}
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm uppercase tracking-[0.15em] hover:bg-white/90 transition-colors"
                data-testid="hero-cta-primary"
              >
                {t.hero.cta}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white/40" size={32} />
        </div>
      </section>

      {/* Project Overview */}
      <section id="projeto" className="py-32 px-6 bg-black" data-testid="project-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="section-animate">
              <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-6">{t.project.label}</p>
              <h2 className="text-4xl lg:text-5xl font-light mb-8">
                {t.project.title}
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                {t.project.desc}
              </p>
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-3xl font-light">12</p>
                  <p className="text-white/40 text-sm uppercase tracking-wider">{t.project.months}</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div>
                  <p className="text-3xl font-light">3</p>
                  <p className="text-white/40 text-sm uppercase tracking-wider">{t.project.phases}</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div>
                  <p className="text-3xl font-light">360°</p>
                  <p className="text-white/40 text-sm uppercase tracking-wider">{t.project.scope}</p>
                </div>
              </div>
            </div>

            <div className="section-animate">
              <div className="relative">
                <img 
                  src={ASSETS.grapes1} 
                  alt="Premium wine" 
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phases Section */}
      <section id="fases" className="py-32 px-6 bg-zinc-950" data-testid="phases-section">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 section-animate">
            <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-6">{t.phasesSection.label}</p>
            <h2 className="text-4xl lg:text-5xl font-light">
              {t.phasesSection.title}
            </h2>
          </div>

          {/* Phase Tabs */}
          <div className="flex flex-wrap gap-4 mb-12 section-animate">
            {t.phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                className={`px-6 py-3 text-sm uppercase tracking-[0.15em] border transition-all ${
                  activePhase === phase.id 
                    ? "bg-white text-black border-white" 
                    : "bg-transparent text-white/60 border-white/20 hover:border-white/40"
                }`}
                data-testid={`phase-tab-${phase.id}`}
              >
                Fase {phase.id}: {phase.title}
              </button>
            ))}
          </div>

          {/* Active Phase Content */}
          {currentPhase && (
            <div className="grid lg:grid-cols-5 gap-12 section-animate" data-testid="phase-content">
              {/* Left: Phase Info */}
              <div className="lg:col-span-2">
                <div className="sticky top-32">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-white/5 border border-white/10">
                      {activePhase === 1 && <Palette className="text-white" size={28} />}
                      {activePhase === 2 && <Megaphone className="text-white" size={28} />}
                      {activePhase === 3 && <LineChart className="text-white" size={28} />}
                    </div>
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-wider">{currentPhase.duration}</p>
                      <h3 className="text-2xl font-light">{currentPhase.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-white/60 text-lg leading-relaxed mb-8">
                    {currentPhase.description}
                  </p>

                  {/* Deliverables */}
                  <div className="bg-white/5 border border-white/10 p-6">
                    <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4">{t.phasesSection.deliverables}</p>
                    <div className="space-y-3">
                      {currentPhase.deliverables.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Check className="text-white/40 mt-0.5 flex-shrink-0" size={16} />
                          <span className="text-white/80 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Scope Details */}
              <div className="lg:col-span-3 space-y-6">
                {currentPhase.scope.map((item, i) => (
                  <div 
                    key={i} 
                    className="p-6 bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-white/20 text-sm font-mono">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <h4 className="text-lg font-medium mb-2">{item.title}</h4>
                        <p className="text-white/50 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 px-6 bg-black" data-testid="timeline-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 section-animate">
            <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-6">{t.timeline.label}</p>
            <h2 className="text-4xl lg:text-5xl font-light">
              {t.timeline.title}
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative section-animate">
            {/* Desktop Timeline */}
            <div className="hidden lg:block">
              <div className="flex items-center justify-between mb-8">
                {t.timeline.items.map((phase, i) => (
                  <div key={i} className="flex-1 text-center">
                    <p className="text-white/40 text-sm uppercase tracking-wider mb-2">{t.project.months} {phase.month}</p>
                    <h3 className="text-xl font-light mb-4">{phase.label}</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {phase.items.map((item, j) => (
                        <span key={j} className="text-xs text-white/40 bg-white/5 px-3 py-1">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* Progress bar */}
              <div className="h-px bg-white/10 relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1/4 h-1 bg-white" />
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-3 h-3 bg-white rounded-full" />
                <div className="absolute top-1/2 -translate-y-1/2 left-1/3 w-3 h-3 bg-white/30 rounded-full -translate-x-1/2" />
                <div className="absolute top-1/2 -translate-y-1/2 left-2/3 w-3 h-3 bg-white/30 rounded-full -translate-x-1/2" />
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-3 h-3 bg-white/30 rounded-full" />
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="lg:hidden space-y-8">
              {t.timeline.items.map((phase, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-white rounded-full" />
                    {i < t.timeline.items.length - 1 && <div className="w-px flex-1 bg-white/20" />}
                  </div>
                  <div className="pb-8">
                    <p className="text-white/40 text-sm uppercase tracking-wider mb-1">{t.project.months} {phase.month}</p>
                    <h3 className="text-lg font-light mb-3">{phase.label}</h3>
                    <div className="flex flex-wrap gap-2">
                      {phase.items.map((item, j) => (
                        <span key={j} className="text-xs text-white/40 bg-white/5 px-3 py-1">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="metodologia" className="py-32 px-6 bg-zinc-950" data-testid="methodology-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="section-animate">
              <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-6">{t.methodology.label}</p>
              <h2 className="text-4xl lg:text-5xl font-light mb-8">
                {t.methodology.title}
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-12">
                {t.methodology.desc}
              </p>

              <div className="grid grid-cols-2 gap-6">
                {t.methodology.items.map((item, i) => {
                  const Icon = ICONS[i];
                  return (
                    <div key={i} className="p-6 bg-white/[0.02] border border-white/10">
                      <Icon className="text-white/60 mb-4" size={24} />
                      <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                      <p className="text-white/40 text-sm">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="section-animate">
              <img 
                src={ASSETS.grapes2} 
                alt="Wine methodology" 
                className="w-full aspect-square object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Credentials Section with Quote */}
      <section id="equipe" className="py-32 px-6 bg-black" data-testid="credentials-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image with Quote Overlay */}
            <div className="order-2 lg:order-1 section-animate relative">
              <img 
                src={ASSETS.grapes3} 
                alt="Wine expertise" 
                className="w-full aspect-square object-cover"
              />
              {/* Quote Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex items-end">
                <div className="p-8 lg:p-12">
                  <p className="text-white/90 text-xl lg:text-2xl font-light italic leading-relaxed mb-4">
                    "{t.quote.text}"
                  </p>
                  <p className="text-white/50 text-sm uppercase tracking-[0.2em]">
                    — {t.quote.author}
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 section-animate">
              <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-6">{t.team.label}</p>
              <h2 className="text-4xl lg:text-5xl font-light mb-8">
                {t.team.title}
              </h2>

              <div className="grid grid-cols-2 gap-8 mb-12">
                {t.team.credentials.map((cred, i) => (
                  <div key={i}>
                    <p className="text-4xl font-light mb-2">{cred.value}</p>
                    <p className="text-white/40 text-sm">{cred.label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-white/10">
                {t.team.items.map((item, i) => {
                  const icons = [Award, Globe, Users];
                  const Icon = icons[i];
                  return (
                    <div key={i} className="flex items-center gap-4">
                      <Icon className="text-white/40" size={20} />
                      <span className="text-white/70">{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contato" className="py-32 px-6 bg-zinc-950" data-testid="contact-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 section-animate">
            <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-6">{t.contact.label}</p>
            <h2 className="text-4xl lg:text-5xl font-light mb-8">
              {t.contact.title}
            </h2>
            
            {/* Investment Display */}
            <div className="inline-flex flex-col items-center p-8 bg-white/[0.02] border border-white/10 mb-8">
              <p className="text-white/40 text-sm uppercase tracking-[0.2em] mb-4">{t.contact.monthlyFee}</p>
              <p className="text-5xl lg:text-6xl font-light mb-2" data-testid="investment-monthly">USD 7,500</p>
              <p className="text-white/40">{t.contact.program}</p>
              <div className="w-16 h-px bg-white/20 my-6" />
              <p className="text-white/40 text-sm uppercase tracking-[0.2em] mb-2">{t.contact.annualTotal}</p>
              <p className="text-2xl font-light" data-testid="investment-annual">USD 90,000</p>
            </div>

            <p className="text-white/50 max-w-xl mx-auto">
              {t.contact.cta}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black border-t border-white/10" data-testid="footer">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <img src={ASSETS.logoWtfWhite} alt="WTF Agency" className="h-8" />
            
            <p className="text-white/30 text-sm">
              © 2024 WTF Agency. Brief Destroyers.
            </p>

            <div className="flex items-center gap-4">
              <span className="text-white/30 text-sm">{t.footer.proposalFor}</span>
              <span className="text-white/60">Grupo Upper Blanc</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
