import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { 
  Check, ChevronDown, ArrowRight, Target, Zap, Globe, 
  Users, TrendingUp, Award, Lightbulb,
  Palette, Package, Megaphone, LineChart, Menu, X,
  Briefcase, BarChart2, Camera, ShoppingBag, FileText, Search
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Asset URLs
const ASSETS = {
  logoWtfWhite: "https://customer-assets.emergentagent.com/job_wine-brand-brasil/artifacts/ychnnfb7_logo-wtf.png",
  logoWtfBlack: "https://customer-assets.emergentagent.com/job_wine-brand-brasil/artifacts/6fw22kmg_logo-wtf-negro.png",
  vineyard1: "https://customer-assets.emergentagent.com/job_wine-brand-brasil/artifacts/zcoibi26_u2462154512_imagine_close_up_shot_of_a_grape_tree_in_a_vineya_ac2b6445-5f2f-4b54-b627-c7ace1024fdc_1.png",
  vineyard2: "https://customer-assets.emergentagent.com/job_wine-brand-brasil/artifacts/oash0080_u2462154512_Rustic_vineyard_in_Puglia_during_golden_sunset_ro_b2d7dc40-0b37-41be-a164-333d55112326_0%20%281%29.png",
  grapes1: "https://customer-assets.emergentagent.com/job_wine-brand-brasil/artifacts/iz9dvpfg_u2462154512_Extreme_macro_editorial_photograph_of_strong_slig_d42a410b-8b34-44dd-93e5-b01f1b58fd9e_0.png",
  grapes2: "https://customer-assets.emergentagent.com/job_wine-brand-brasil/artifacts/5f7q5nas_u2462154512_Ultra-immersive_macro_perspective_moving_along_th_fd150ffc-adfd-4287-85d7-7f0444d56e86_1.png",
  grapes3: "https://customer-assets.emergentagent.com/job_wine-brand-brasil/artifacts/qq7k0y6g_u2462154512_Ultra-immersive_macro_perspective_moving_along_th_f392ba18-f102-4b67-8e8e-dd0bb783e650_0.png",
};

// Phase data with expanded scope
const PHASES = [
  {
    id: 1,
    title: "Brand Development",
    subtitle: "Desarrollo de Marca",
    duration: "Meses 1-3",
    icon: Palette,
    description: "Construcción de los cimientos estratégicos y visuales de tu marca de vinos. Desde la conceptualización hasta un sistema de identidad completo listo para conquistar el mercado brasileño.",
    scope: [
      {
        title: "Naming & Arquitectura de Marca",
        desc: "Desarrollo del nombre, tagline, propuesta de valor única y estructura de portfolio para posicionamiento premium en Brasil"
      },
      {
        title: "Sistema de Identidad Visual",
        desc: "Logo principal, variantes, paleta de colores, tipografía, iconografía y guidelines de uso completos"
      },
      {
        title: "Diseño de Packaging",
        desc: "3 líneas de producto con diseño de etiquetas, cápsulas, cajas y materiales POP diferenciados"
      },
      {
        title: "Investigación de Mercado Brasil",
        desc: "Análisis competitivo, mapeo de canales, perfil del consumidor brasileño y oportunidades de posicionamiento"
      },
      {
        title: "Cumplimiento Regulatorio",
        desc: "Guía de requisitos legales para comercialización de vinos en Brasil, etiquetado y certificaciones necesarias"
      }
    ],
    deliverables: [
      "Brand Book completo (80+ páginas)",
      "12 diseños de etiquetas únicos",
      "Manual de packaging y materiales",
      "Reporte de investigación de mercado",
      "Guía de compliance regulatorio Brasil"
    ]
  },
  {
    id: 2,
    title: "Market Launch Brasil",
    subtitle: "Lanzamiento al Mercado",
    duration: "Meses 4-6",
    icon: Megaphone,
    description: "Ejecución integral del lanzamiento en Brasil. Construimos tu presencia digital, creamos contenido premium y activamos campañas que generan awareness y demanda desde el día uno.",
    scope: [
      {
        title: "Estrategia Go-to-Market 360°",
        desc: "Plan de lanzamiento detallado con canales, timing, inversión publicitaria y KPIs de éxito"
      },
      {
        title: "Plataforma Digital & E-commerce",
        desc: "Website institucional + tienda online integrada con pasarelas de pago brasileñas y logística local"
      },
      {
        title: "Producción de Contenido Premium",
        desc: "Sesión fotográfica profesional, videos de marca, assets para redes sociales y materiales de venta"
      },
      {
        title: "Campaña de Lanzamiento",
        desc: "Activación en medios digitales, PR, eventos de presentación y sampling estratégico"
      },
      {
        title: "Red de Influencers & Sommeliers",
        desc: "Partnerships con líderes de opinión del mundo del vino en Brasil para amplificar el lanzamiento"
      }
    ],
    deliverables: [
      "Website + E-commerce funcionando",
      "500+ assets de contenido",
      "Video de marca (60s + cuts)",
      "Campaña activa en medios",
      "Red de 20+ influencers activada"
    ]
  },
  {
    id: 3,
    title: "Growth & Management",
    subtitle: "Crecimiento y Gestión",
    duration: "Meses 7-12",
    icon: LineChart,
    description: "Gestión continua y optimización para escalar resultados. Monitoreamos performance, ajustamos estrategias y expandimos tu presencia para consolidar la marca en el mercado brasileño.",
    scope: [
      {
        title: "Optimización de Campañas",
        desc: "A/B testing continuo, optimización de audiencias, creatividades y pujas para maximizar ROAS"
      },
      {
        title: "Gestión de Performance",
        desc: "Monitoreo diario de KPIs, dashboards en tiempo real y reportes ejecutivos mensuales"
      },
      {
        title: "Estrategia de Expansión",
        desc: "Análisis de nuevos canales de distribución, regiones y oportunidades de crecimiento en Brasil"
      },
      {
        title: "Desarrollo Continuo de Marca",
        desc: "Evolución visual, nuevas líneas de producto, ediciones limitadas y colaboraciones especiales"
      },
      {
        title: "Campañas Estacionales",
        desc: "Activaciones para fechas clave: vendimia, fiestas, Día del Vino, eventos gastronómicos"
      }
    ],
    deliverables: [
      "12 reportes de performance mensuales",
      "Optimización continua de campañas",
      "4 campañas estacionales",
      "Plan de expansión año 2",
      "Evolución de marca documentada"
    ]
  }
];

// Timeline data
const TIMELINE = [
  { month: "1-3", label: "Brand Development", items: ["Naming", "Identidad", "Packaging", "Research"], color: "#000" },
  { month: "4-6", label: "Market Launch", items: ["Digital", "Contenido", "Campaña", "PR"], color: "#000" },
  { month: "7-12", label: "Growth", items: ["Optimización", "Expansión", "Performance"], color: "#000" }
];

// Methodology items
const METHODOLOGY = [
  { icon: Zap, title: "AI-Powered", desc: "Sistema de desarrollo de marca impulsado por inteligencia artificial" },
  { icon: Target, title: "85% Más Rápido", desc: "Que agencias tradicionales en tiempo de entrega" },
  { icon: Award, title: "Wine Expertise", desc: "Portfolio incluye Casillero del Diablo y marcas premium" },
  { icon: Globe, title: "Brasil Office", desc: "Equipo local en São Paulo para el mercado brasileño" }
];

// Credentials
const CREDENTIALS = [
  { value: "15+", label: "Años en industria del vino" },
  { value: "50+", label: "Marcas desarrolladas" },
  { value: "8", label: "Mercados internacionales" },
  { value: "360°", label: "Ejecución end-to-end" }
];

export default function ProposalLanding() {
  const [activePhase, setActivePhase] = useState(1);
  const [formData, setFormData] = useState({ nombre: "", empresa: "", email: "", mensaje: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.empresa || !formData.email) {
      toast.error("Por favor complete todos los campos requeridos");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("¡Gracias! Nos pondremos en contacto pronto.");
      setFormData({ nombre: "", empresa: "", email: "", mensaje: "" });
    } catch (error) {
      toast.error("Error al enviar. Por favor intente nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const currentPhase = PHASES.find(p => p.id === activePhase);

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
            {["Proyecto", "Fases", "Metodología", "Equipo", "Contacto"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
                data-testid={`nav-${item.toLowerCase()}`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black py-8 px-6 border-t border-white/10">
            {["Proyecto", "Fases", "Metodología", "Equipo", "Contacto"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left py-3 text-sm uppercase tracking-[0.15em] text-white/60 hover:text-white border-b border-white/5"
                data-testid={`mobile-nav-${item.toLowerCase()}`}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section - No prices */}
      <section className="relative min-h-screen flex items-center" data-testid="hero-section">
        <div className="absolute inset-0">
          <img 
            src={ASSETS.vineyard2} 
            alt="Vineyard" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
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
              Propuesta de Proyecto
            </p>
            <h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.1] mb-8 opacity-0 animate-fade-in-up animate-delay-100"
              data-testid="hero-headline"
            >
              Desarrollo Integral<br />
              <span className="font-normal">Marca de Vinos</span><br />
              <span className="text-white/50">para Brasil</span>
            </h1>

            {/* Subheadline */}
            <p 
              className="text-xl text-white/60 max-w-xl mb-12 opacity-0 animate-fade-in-up animate-delay-200"
              data-testid="hero-subheadline"
            >
              De concepto a líder de mercado. Naming, identidad, packaging, 
              lanzamiento digital y gestión continua.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up animate-delay-300">
              <button 
                onClick={() => scrollToSection("fases")}
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm uppercase tracking-[0.15em] hover:bg-white/90 transition-colors"
                data-testid="hero-cta-primary"
              >
                Ver Propuesta
                <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => scrollToSection("contacto")}
                className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 text-sm uppercase tracking-[0.15em] hover:bg-white/10 transition-colors"
                data-testid="hero-cta-secondary"
              >
                Comenzar Proyecto
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
      <section id="proyecto" className="py-32 px-6 bg-black" data-testid="project-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="section-animate">
              <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-6">El Proyecto</p>
              <h2 className="text-4xl lg:text-5xl font-light mb-8">
                Construir una marca de vinos que conquiste Brasil
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Un programa de 12 meses para desarrollar, lanzar y escalar tu marca 
                de vinos en el mercado brasileño. Desde la creación del nombre hasta 
                la gestión continua de campañas y expansión.
              </p>
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-3xl font-light">12</p>
                  <p className="text-white/40 text-sm uppercase tracking-wider">Meses</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div>
                  <p className="text-3xl font-light">3</p>
                  <p className="text-white/40 text-sm uppercase tracking-wider">Fases</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div>
                  <p className="text-3xl font-light">360°</p>
                  <p className="text-white/40 text-sm uppercase tracking-wider">Alcance</p>
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

      {/* Phases Section - Detailed scope, no prices */}
      <section id="fases" className="py-32 px-6 bg-zinc-950" data-testid="phases-section">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 section-animate">
            <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-6">Alcance del Proyecto</p>
            <h2 className="text-4xl lg:text-5xl font-light">
              Fases del Proyecto
            </h2>
          </div>

          {/* Phase Tabs */}
          <div className="flex flex-wrap gap-4 mb-12 section-animate">
            {PHASES.map((phase) => (
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
                      <currentPhase.icon className="text-white" size={28} />
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
                    <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4">Entregables</p>
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
            <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-6">Planificación</p>
            <h2 className="text-4xl lg:text-5xl font-light">
              Roadmap 12 Meses
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative section-animate">
            {/* Desktop Timeline */}
            <div className="hidden lg:block">
              <div className="flex items-center justify-between mb-8">
                {TIMELINE.map((phase, i) => (
                  <div key={i} className="flex-1 text-center">
                    <p className="text-white/40 text-sm uppercase tracking-wider mb-2">Meses {phase.month}</p>
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
              {TIMELINE.map((phase, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-white rounded-full" />
                    {i < TIMELINE.length - 1 && <div className="w-px flex-1 bg-white/20" />}
                  </div>
                  <div className="pb-8">
                    <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Meses {phase.month}</p>
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
      <section id="metodología" className="py-32 px-6 bg-zinc-950" data-testid="methodology-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="section-animate">
              <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-6">Cómo Trabajamos</p>
              <h2 className="text-4xl lg:text-5xl font-light mb-8">
                Metodología WTF
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-12">
                Combinamos inteligencia artificial con 15 años de experiencia en la industria 
                del vino para entregar resultados extraordinarios en tiempo récord.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {METHODOLOGY.map((item, i) => {
                  const Icon = item.icon;
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

      {/* Team Credentials Section */}
      <section id="equipo" className="py-32 px-6 bg-black" data-testid="credentials-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 section-animate">
              <img 
                src={ASSETS.grapes3} 
                alt="Wine expertise" 
                className="w-full aspect-square object-cover"
              />
            </div>

            <div className="order-1 lg:order-2 section-animate">
              <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-6">El Equipo</p>
              <h2 className="text-4xl lg:text-5xl font-light mb-8">
                Credenciales
              </h2>

              <div className="grid grid-cols-2 gap-8 mb-12">
                {CREDENTIALS.map((cred, i) => (
                  <div key={i}>
                    <p className="text-4xl font-light mb-2">{cred.value}</p>
                    <p className="text-white/40 text-sm">{cred.label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <Award className="text-white/40" size={20} />
                  <span className="text-white/70">Portfolio: Casillero del Diablo, Absolut, +50 marcas</span>
                </div>
                <div className="flex items-center gap-4">
                  <Globe className="text-white/40" size={20} />
                  <span className="text-white/70">Oficina en São Paulo para mercado brasileño</span>
                </div>
                <div className="flex items-center gap-4">
                  <Users className="text-white/40" size={20} />
                  <span className="text-white/70">Especialista dedicado en industria del vino</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section - Investment here */}
      <section id="contacto" className="py-32 px-6 bg-zinc-950" data-testid="contact-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 section-animate">
            <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-6">Inversión</p>
            <h2 className="text-4xl lg:text-5xl font-light mb-8">
              Comenzar el Proyecto
            </h2>
            
            {/* Investment Display */}
            <div className="inline-flex flex-col items-center p-8 bg-white/[0.02] border border-white/10 mb-8">
              <p className="text-white/40 text-sm uppercase tracking-[0.2em] mb-4">Fee Mensual</p>
              <p className="text-5xl lg:text-6xl font-light mb-2" data-testid="investment-monthly">USD 7,500</p>
              <p className="text-white/40">Programa de 12 meses</p>
              <div className="w-16 h-px bg-white/20 my-6" />
              <p className="text-white/40 text-sm uppercase tracking-[0.2em] mb-2">Inversión Total Anual</p>
              <p className="text-2xl font-light" data-testid="investment-annual">USD 90,000</p>
            </div>

            <p className="text-white/50 max-w-xl mx-auto">
              Complete el formulario y nuestro equipo se pondrá en contacto para agendar 
              una sesión estratégica.
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-8 section-animate" data-testid="contact-form">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  placeholder="Nombre *"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 focus:border-white text-white py-4 px-0 placeholder:text-white/30 outline-none transition-colors"
                  data-testid="form-nombre"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Empresa *"
                  value={formData.empresa}
                  onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 focus:border-white text-white py-4 px-0 placeholder:text-white/30 outline-none transition-colors"
                  data-testid="form-empresa"
                />
              </div>
            </div>
            
            <div>
              <input
                type="email"
                placeholder="Email *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 focus:border-white text-white py-4 px-0 placeholder:text-white/30 outline-none transition-colors"
                data-testid="form-email"
              />
            </div>

            <div>
              <textarea
                placeholder="Mensaje (opcional)"
                value={formData.mensaje}
                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                rows={4}
                className="w-full bg-transparent border-b border-white/20 focus:border-white text-white py-4 px-0 placeholder:text-white/30 outline-none transition-colors resize-none"
                data-testid="form-mensaje"
              />
            </div>

            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-3 bg-white text-black px-12 py-5 text-sm uppercase tracking-[0.15em] hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="form-submit"
              >
                {isSubmitting ? "Enviando..." : "Comenzar Proyecto"}
                {!isSubmitting && <ArrowRight size={18} />}
              </button>
            </div>
          </form>
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
              <span className="text-white/30 text-sm">Propuesta para</span>
              <span className="text-white/60">Grupo Upper Blanc</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
