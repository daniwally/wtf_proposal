import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import { 
  Check, ChevronDown, ArrowRight, Target, Zap, Globe, 
  Users, TrendingUp, Calendar, Award, Lightbulb, BarChart3,
  Palette, Package, Megaphone, LineChart, Menu, X
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

// Phase data
const PHASES = [
  {
    id: 1,
    title: "Brand Development",
    subtitle: "Desarrollo de Marca",
    duration: "3 meses",
    total: "USD 22,500",
    monthly: "USD 7,500/mes",
    icon: Palette,
    deliverables: [
      "Naming + Arquitectura de Marca",
      "Logo + Sistema de Identidad Visual",
      "Diseño de Packaging (3 líneas de producto)",
      "Investigación de Mercado Brasil",
      "Análisis Competitivo",
      "Cumplimiento Regulatorio Brasil"
    ]
  },
  {
    id: 2,
    title: "Market Launch Brasil",
    subtitle: "Lanzamiento al Mercado",
    duration: "3 meses",
    total: "USD 22,500",
    monthly: "USD 7,500/mes",
    icon: Megaphone,
    deliverables: [
      "Estrategia Go-to-Market 360°",
      "Plataforma Digital + E-commerce",
      "Creación de Contenido + Sesión Fotográfica",
      "Campaña de Lanzamiento",
      "Partnerships con Influencers",
      "Estrategia PR + Relaciones con Medios"
    ]
  },
  {
    id: 3,
    title: "Growth & Management",
    subtitle: "Crecimiento y Gestión",
    duration: "6 meses",
    total: "USD 45,000",
    monthly: "USD 7,500/mes",
    icon: LineChart,
    deliverables: [
      "Optimización Continua de Campañas",
      "Gestión de Performance",
      "Estrategia de Expansión de Mercado",
      "Desarrollo Continuo de Marca",
      "Campañas Estacionales",
      "Analytics + Reportes Mensuales"
    ]
  }
];

// Timeline data
const TIMELINE = [
  { month: "1-3", label: "Brand Development", items: ["Naming", "Identidad", "Packaging"], color: "#4A0404" },
  { month: "4-6", label: "Market Launch", items: ["Digital", "Campaña", "Contenido"], color: "#C5A059" },
  { month: "7-12", label: "Growth Management", items: ["Optimización", "Expansión", "Performance"], color: "#1B4B36" }
];

// Methodology items
const METHODOLOGY = [
  { icon: Zap, title: "AI-Powered", desc: "Sistema de desarrollo de marca impulsado por IA" },
  { icon: Target, title: "85% Más Rápido", desc: "Que agencias tradicionales" },
  { icon: Award, title: "Wine Expertise", desc: "Portfolio: Casillero del Diablo" },
  { icon: Globe, title: "Brasil Office", desc: "Presencia en São Paulo" }
];

// Credentials
const CREDENTIALS = [
  { value: "15+", label: "Años de experiencia en industria del vino" },
  { value: "50+", label: "Marcas desarrolladas" },
  { value: "8", label: "Mercados internacionales" },
  { value: "360°", label: "Capacidad de ejecución end-to-end" }
];

export default function ProposalLanding() {
  const [activePhase, setActivePhase] = useState(1);
  const [formData, setFormData] = useState({ nombre: "", empresa: "", email: "", mensaje: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionsRef = useRef({});

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

  return (
    <div className="min-h-screen bg-[#F9F8F4]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 nav-sticky" data-testid="navigation">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <img 
            src={ASSETS.logoWtfBlack} 
            alt="WTF Agency" 
            className="h-10 object-contain"
            data-testid="nav-logo"
          />
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Fases", "Inversión", "Metodología", "Timeline", "Contacto"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-body text-[#1A1A1A] hover:text-[#4A0404] transition-colors tracking-wide"
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
          <div className="md:hidden bg-[#1A1616] text-white py-8 px-6">
            {["Fases", "Inversión", "Metodología", "Timeline", "Contacto"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left py-3 text-lg font-serif border-b border-white/10"
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
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            {/* Logos */}
            <div className="flex items-center gap-6 mb-12 opacity-0 animate-fade-in-up">
              <img src={ASSETS.logoWtfWhite} alt="WTF Agency" className="h-14" data-testid="hero-wtf-logo" />
              <div className="w-px h-12 bg-[#C5A059]" />
              <div className="logo-placeholder text-[#C5A059] text-xl" data-testid="hero-client-logo">
                GRUPO UPPER BLANC
              </div>
            </div>

            {/* Headline */}
            <h1 
              className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6 opacity-0 animate-fade-in-up animate-delay-100"
              data-testid="hero-headline"
            >
              Desarrollo Integral<br />
              <span className="text-[#C5A059]">Marca de Vinos</span><br />
              para Brasil
            </h1>

            {/* Subheadline */}
            <p 
              className="font-accent text-xl sm:text-2xl text-[#C5A059] mb-8 opacity-0 animate-fade-in-up animate-delay-200"
              data-testid="hero-subheadline"
            >
              De concepto a líder de mercado
            </p>

            {/* Price Badge */}
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-[#C5A059]/30 px-6 py-4 mb-10 opacity-0 animate-fade-in-up animate-delay-300">
              <span className="font-body text-sm text-white/70 uppercase tracking-wider">Tarifa Mensual</span>
              <span className="font-serif text-3xl text-white" data-testid="hero-price">USD 7,500</span>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up animate-delay-400">
              <button 
                onClick={() => scrollToSection("contacto")}
                className="btn-primary flex items-center justify-center gap-2"
                data-testid="hero-cta-primary"
              >
                Comenzar Proyecto
                <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => scrollToSection("fases")}
                className="btn-secondary"
                data-testid="hero-cta-secondary"
              >
                Ver Propuesta
              </button>
            </div>
          </div>

          {/* Right side decorative element */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 border border-[#C5A059]/30 rotate-45" />
              <div className="relative bg-[#1A1616]/50 backdrop-blur-sm p-8 border border-[#C5A059]/30">
                <p className="font-accent text-lg text-[#C5A059] mb-4">Inversión Anual</p>
                <p className="font-serif text-5xl text-white mb-2" data-testid="hero-annual-total">USD 90,000</p>
                <p className="font-body text-sm text-white/60">Programa de 12 meses</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-[#C5A059]" size={32} />
        </div>
      </section>

      {/* Phases Section */}
      <section id="fases" className="py-24 px-6" data-testid="phases-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 section-animate">
            <p className="font-accent text-[#C5A059] text-lg mb-4">Estructura del Proyecto</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] mb-6">
              Fases del Proyecto
            </h2>
            <div className="section-divider mx-auto" />
          </div>

          {/* Phase Selector */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {PHASES.map((phase) => {
              const Icon = phase.icon;
              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhase(phase.id)}
                  className={`phase-card card-wine p-8 text-left transition-all ${
                    activePhase === phase.id ? "active shadow-xl" : ""
                  }`}
                  data-testid={`phase-card-${phase.id}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 ${activePhase === phase.id ? "bg-[#4A0404]" : "bg-[#C5A059]/10"} transition-colors`}>
                      <Icon className={activePhase === phase.id ? "text-white" : "text-[#4A0404]"} size={24} />
                    </div>
                    <span className="font-accent text-[#595959]">{phase.duration}</span>
                  </div>
                  <p className="font-body text-sm text-[#C5A059] uppercase tracking-wider mb-2">Fase {phase.id}</p>
                  <h3 className="font-serif text-xl text-[#1A1A1A] mb-1">{phase.title}</h3>
                  <p className="font-accent text-[#595959] mb-4">{phase.subtitle}</p>
                  <div className="pt-4 border-t border-[#C5A059]/20">
                    <p className="font-serif text-2xl text-[#4A0404]">{phase.total}</p>
                    <p className="font-body text-sm text-[#595959]">{phase.monthly}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Deliverables for Active Phase */}
          <div className="bg-[#1A1616] p-8 lg:p-12 section-animate" data-testid="phase-deliverables">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <p className="font-accent text-[#C5A059] text-lg mb-2">
                  Fase {activePhase}: {PHASES[activePhase - 1].title}
                </p>
                <h3 className="font-serif text-2xl lg:text-3xl text-white mb-6">
                  Entregables Incluidos
                </h3>
                <p className="font-body text-white/60 leading-relaxed">
                  Cada fase incluye todos los entregables necesarios para alcanzar los objetivos establecidos, 
                  con revisiones ilimitadas y soporte dedicado.
                </p>
              </div>
              <div className="space-y-4">
                {PHASES[activePhase - 1].deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="p-1 bg-[#C5A059] mt-1">
                      <Check className="text-[#1A1616]" size={14} />
                    </div>
                    <span className="font-body text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section id="inversión" className="py-24 px-6 bg-[#1A1616]" data-testid="investment-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="section-animate">
              <p className="font-accent text-[#C5A059] text-lg mb-4">Propuesta de Inversión</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-8">
                Estructura de Inversión
              </h2>
              
              <div className="space-y-8">
                <div className="border-l-2 border-[#C5A059] pl-6">
                  <p className="font-body text-sm text-white/60 uppercase tracking-wider mb-2">Tarifa Mensual</p>
                  <p className="font-serif text-5xl text-white" data-testid="investment-monthly">USD 7,500</p>
                </div>
                
                <div className="border-l-2 border-[#C5A059]/50 pl-6">
                  <p className="font-body text-sm text-white/60 uppercase tracking-wider mb-2">Inversión Anual Total</p>
                  <p className="font-serif text-4xl text-[#C5A059]" data-testid="investment-annual">USD 90,000</p>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
                  <div>
                    <p className="font-body text-white/60 text-sm mb-1">Duración</p>
                    <p className="font-serif text-xl text-white">12 meses</p>
                  </div>
                  <div>
                    <p className="font-body text-white/60 text-sm mb-1">Facturación</p>
                    <p className="font-serif text-xl text-white">Mensual</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-animate">
              <div className="space-y-6">
                {[
                  { label: "Sin costos de setup", desc: "Todo incluido en la tarifa mensual" },
                  { label: "Sin tarifas ocultas", desc: "Precio transparente y predecible" },
                  { label: "Términos flexibles", desc: "Opciones de pago disponibles" },
                  { label: "Todos los entregables", desc: "Incluidos en cada fase" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 bg-white/5 border border-white/10">
                    <div className="p-2 bg-[#1B4B36]">
                      <Check className="text-white" size={16} />
                    </div>
                    <div>
                      <p className="font-serif text-lg text-white mb-1">{item.label}</p>
                      <p className="font-body text-sm text-white/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="metodología" className="py-24 px-6 relative overflow-hidden" data-testid="methodology-section">
        <div className="absolute inset-0 opacity-10">
          <img src={ASSETS.grapes1} alt="" className="w-full h-full object-cover" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 section-animate">
            <p className="font-accent text-[#C5A059] text-lg mb-4">Nuestra Metodología</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] mb-6">
              Metodología WTF
            </h2>
            <div className="section-divider mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {METHODOLOGY.map((item, i) => {
              const Icon = item.icon;
              return (
                <div 
                  key={i} 
                  className="card-wine p-8 text-center section-animate"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-[#4A0404] flex items-center justify-center">
                    <Icon className="text-[#C5A059]" size={28} />
                  </div>
                  <h3 className="font-serif text-xl text-[#1A1A1A] mb-2">{item.title}</h3>
                  <p className="font-body text-sm text-[#595959]">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Portfolio mention */}
          <div className="mt-16 text-center section-animate">
            <p className="font-accent text-[#595959] text-lg">
              Portfolio incluye trabajo con <span className="text-[#4A0404] font-semibold">Casillero del Diablo</span>, 
              <span className="text-[#4A0404] font-semibold"> Absolut</span> y más de 50 marcas premium
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-24 px-6 bg-[#F9F8F4]" data-testid="timeline-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 section-animate">
            <p className="font-accent text-[#C5A059] text-lg mb-4">Planificación</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] mb-6">
              Roadmap de 12 Meses
            </h2>
            <div className="section-divider mx-auto" />
          </div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            {/* Timeline line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#C5A059]/30 -translate-y-1/2" />
            
            <div className="grid grid-cols-3 gap-8">
              {TIMELINE.map((phase, i) => (
                <div key={i} className="relative section-animate" style={{ animationDelay: `${i * 0.2}s` }}>
                  {/* Node */}
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                    <div 
                      className="w-6 h-6 rounded-full border-4 border-[#F9F8F4]"
                      style={{ backgroundColor: phase.color }}
                    />
                  </div>
                  
                  {/* Card */}
                  <div className="pt-8 text-center">
                    <div className="card-wine p-8">
                      <p className="font-body text-sm text-[#C5A059] uppercase tracking-wider mb-2">
                        Meses {phase.month}
                      </p>
                      <h3 className="font-serif text-xl text-[#1A1A1A] mb-4">{phase.label}</h3>
                      <div className="space-y-2">
                        {phase.items.map((item, j) => (
                          <p key={j} className="font-body text-sm text-[#595959]">{item}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-6">
            {TIMELINE.map((phase, i) => (
              <div key={i} className="flex gap-6 section-animate">
                <div className="flex flex-col items-center">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: phase.color }}
                  />
                  {i < TIMELINE.length - 1 && (
                    <div className="w-0.5 flex-1 bg-[#C5A059]/30" />
                  )}
                </div>
                <div className="card-wine p-6 flex-1 mb-4">
                  <p className="font-body text-sm text-[#C5A059] uppercase tracking-wider mb-1">
                    Meses {phase.month}
                  </p>
                  <h3 className="font-serif text-lg text-[#1A1A1A] mb-3">{phase.label}</h3>
                  <div className="flex flex-wrap gap-2">
                    {phase.items.map((item, j) => (
                      <span key={j} className="font-body text-xs text-[#595959] bg-[#C5A059]/10 px-3 py-1">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Credentials Section */}
      <section className="py-24 px-6 bg-[#1A1616]" data-testid="credentials-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="section-animate">
              <div className="relative">
                <img 
                  src={ASSETS.grapes3} 
                  alt="Wine expertise" 
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1616] to-transparent" />
              </div>
            </div>

            <div className="section-animate">
              <p className="font-accent text-[#C5A059] text-lg mb-4">Credenciales del Equipo</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-white mb-8">
                Experiencia que Respalda
              </h2>

              <div className="grid grid-cols-2 gap-8 mb-8">
                {CREDENTIALS.map((cred, i) => (
                  <div key={i}>
                    <p className="font-serif text-4xl text-[#C5A059] mb-2">{cred.value}</p>
                    <p className="font-body text-sm text-white/60">{cred.label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <Award className="text-[#C5A059]" size={20} />
                  <span className="font-body text-white/80">Portfolio: Casillero del Diablo, Absolut, +50 marcas</span>
                </div>
                <div className="flex items-center gap-4">
                  <Globe className="text-[#C5A059]" size={20} />
                  <span className="font-body text-white/80">Oficina en São Paulo para mercado brasileño</span>
                </div>
                <div className="flex items-center gap-4">
                  <Users className="text-[#C5A059]" size={20} />
                  <span className="font-body text-white/80">Especialista dedicado en industria del vino</span>
                </div>
                <div className="flex items-center gap-4">
                  <Lightbulb className="text-[#C5A059]" size={20} />
                  <span className="font-body text-white/80">Sistema creativo AI-powered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Summary Section */}
      <section className="py-24 px-6" data-testid="deliverables-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 section-animate">
            <p className="font-accent text-[#C5A059] text-lg mb-4">Resumen Completo</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] mb-6">
              Entregables por Fase
            </h2>
            <div className="section-divider mx-auto" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {PHASES.map((phase, i) => {
              const Icon = phase.icon;
              return (
                <div 
                  key={phase.id} 
                  className="card-wine p-8 section-animate"
                  style={{ animationDelay: `${i * 0.1}s` }}
                  data-testid={`deliverables-phase-${phase.id}`}
                >
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#C5A059]/20">
                    <div className="p-3 bg-[#4A0404]">
                      <Icon className="text-[#C5A059]" size={24} />
                    </div>
                    <div>
                      <p className="font-body text-sm text-[#C5A059] uppercase tracking-wider">Fase {phase.id}</p>
                      <h3 className="font-serif text-xl text-[#1A1A1A]">{phase.title}</h3>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {phase.deliverables.map((item, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <Check className="text-[#1B4B36] mt-0.5 flex-shrink-0" size={16} />
                        <span className="font-body text-sm text-[#595959]">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-[#C5A059]/20">
                    <p className="font-body text-sm text-[#595959]">{phase.duration}</p>
                    <p className="font-serif text-2xl text-[#4A0404]">{phase.total}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contacto" className="py-24 px-6 bg-[#1A1616] relative overflow-hidden" data-testid="contact-section">
        <div className="absolute inset-0 opacity-5">
          <img src={ASSETS.vineyard1} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12 section-animate">
            <p className="font-accent text-[#C5A059] text-lg mb-4">Comenzar</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
              ¿Listo para Comenzar?
            </h2>
            <p className="font-body text-white/60 max-w-2xl mx-auto">
              Complete el formulario y nuestro equipo se pondrá en contacto para agendar 
              una sesión estratégica y discutir los próximos pasos.
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6 section-animate" data-testid="contact-form">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  placeholder="Nombre *"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full bg-transparent border-b border-white/30 focus:border-[#C5A059] text-white py-4 px-0 font-body placeholder:text-white/40 outline-none transition-colors"
                  data-testid="form-nombre"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Empresa *"
                  value={formData.empresa}
                  onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                  className="w-full bg-transparent border-b border-white/30 focus:border-[#C5A059] text-white py-4 px-0 font-body placeholder:text-white/40 outline-none transition-colors"
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
                className="w-full bg-transparent border-b border-white/30 focus:border-[#C5A059] text-white py-4 px-0 font-body placeholder:text-white/40 outline-none transition-colors"
                data-testid="form-email"
              />
            </div>

            <div>
              <textarea
                placeholder="Mensaje (opcional)"
                value={formData.mensaje}
                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                rows={4}
                className="w-full bg-transparent border-b border-white/30 focus:border-[#C5A059] text-white py-4 px-0 font-body placeholder:text-white/40 outline-none transition-colors resize-none"
                data-testid="form-mensaje"
              />
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-center sm:text-left">
                <p className="font-body text-sm text-white/60">Tarifa mensual desde</p>
                <p className="font-serif text-2xl text-[#C5A059]">USD 7,500/mes</p>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="form-submit"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    Comenzar Proyecto
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#0F0F0F]" data-testid="footer">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <img src={ASSETS.logoWtfWhite} alt="WTF Agency" className="h-10" />
            
            <p className="font-body text-sm text-white/40">
              © 2024 WTF Agency. Brief Destroyers.
            </p>

            <div className="flex items-center gap-6">
              <span className="font-body text-sm text-white/60">Propuesta para</span>
              <span className="font-serif text-[#C5A059]">Grupo Upper Blanc</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
