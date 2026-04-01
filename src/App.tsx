import { motion, useScroll, useSpring, useMotionValue, useTransform, AnimatePresence, useAnimationFrame } from "motion/react";
import { ArrowRight, Mail, X, ArrowUp, Activity, Compass, Leaf, Home, Plus, Minus, Star, Clock, Phone } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsConditions from "./TermsConditions";
import ContactForm from "./ContactForm";

// Custom Social Icons (replacing deprecated lucide-react icons)
const InstagramIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const LunesLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 1501 293" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2 }} className={className}>
    <g transform="matrix(2,0,0,2,35.718,284.219664)">
        <path d="M0,-138.874C0,-95.038 -0.006,-53.758 -0.006,-10.005C-0.006,-9.433 0.469,-8.962 1.041,-8.962C22.699,-8.962 40.033,-8.961 60.187,-8.961C61.063,-8.961 61.788,-8.245 61.788,-7.369L61.788,0.009C61.788,0.87 61.09,1.568 60.229,1.568L-16.292,1.567C-17.154,1.567 -17.859,0.861 -17.859,-0.001L-17.859,-138.88C-17.859,-139.738 -17.157,-140.442 -16.299,-140.442L-1.563,-140.442C-0.703,-140.442 0,-139.734 0,-138.874" fill="currentColor" fillRule="nonzero"/>
    </g>
    <g transform="matrix(2,0,0,2,374.2436,7.107064)">
        <path d="M0,142.258C-31.907,142.519 -52.186,123.675 -51.975,91.743C-52.14,60.386 -51.463,30.265 -51.949,-0.199C-51.963,-1.068 -51.265,-1.78 -50.395,-1.78L-36.498,-1.78C-35.635,-1.78 -34.938,-1.078 -34.941,-0.215C-35.069,30.324 -34.773,60.597 -34.935,91.946C-35.118,108.899 -27.787,125.521 -11.929,132.216C17.727,144.038 39.782,124.44 39.782,93.93C39.782,60.386 39.265,30.51 39.244,-0.212C39.243,-1.074 39.942,-1.78 40.803,-1.78L49.047,-1.78C49.907,-1.78 50.605,-1.082 50.605,-0.221L50.605,94.227C50.677,126.532 32.337,142.259 0,142.258" fill="currentColor" fillRule="nonzero"/>
    </g>
    <g transform="matrix(2,0,0,2,849.697,287.563464)">
        <path d="M0,-142.211L-5.999,-142.211C-6.847,-142.211 -7.535,-141.528 -7.535,-140.679C-7.535,-125.921 -7.413,-84.203 -7.306,-55.896C-7.304,-55.425 -7.141,-54.973 -6.844,-54.608L-0.732,-47.088C0.033,-46.146 1.557,-46.687 1.557,-47.9L1.557,-140.655C1.557,-141.514 0.86,-142.211 0,-142.211M-97.238,-141.402C-97.532,-141.783 -97.99,-142.01 -98.475,-142.01L-109.994,-142.01C-110.853,-142.01 -111.55,-141.313 -111.55,-140.453L-111.55,-133.169C-111.55,-132.583 -111.351,-132.015 -110.985,-131.558L-97.192,-114.334C-66.758,-76.875 -36.706,-38.85 -7.427,-0.609C-7.133,-0.222 -6.679,0 -6.195,0L0,0C0.86,0 1.557,-0.697 1.557,-1.557L1.557,-17.582C1.557,-18.174 1.353,-18.748 0.979,-19.208C0.979,-19.208 -73.401,-110.376 -97.238,-141.402M-103.424,-96.095L-109.256,-103.381C-110.017,-104.331 -111.55,-103.793 -111.55,-102.576L-111.55,-1.557C-111.55,-0.697 -110.853,0 -109.994,0L-104.041,0C-103.175,0 -102.474,-0.706 -102.485,-1.572C-102.776,-32.793 -102.895,-63.373 -102.973,-94.81C-102.974,-95.277 -103.133,-95.731 -103.424,-96.095" fill="currentColor" fillRule="nonzero"/>
    </g>
    <g transform="matrix(2,0,0,2,1024.6302,287.566864)">
        <path d="M0,-142.01L76.551,-142.01C77.412,-142.01 78.11,-141.312 78.11,-140.451L78.11,-133.334C78.11,-132.473 77.404,-131.774 76.543,-131.775C56.138,-131.776 37.909,-131.921 16.133,-131.923C15.561,-131.923 15.086,-131.457 15.086,-130.885C15.09,-112.895 15.296,-94.577 15.07,-76.255C15.063,-75.677 15.529,-75.205 16.106,-75.205L54.518,-75.205C55.381,-75.205 56.079,-74.505 56.077,-73.642L56.061,-68.276C56.061,-67.7 55.592,-67.234 55.016,-67.237L15.884,-67.49C15.31,-67.493 14.842,-67.023 14.839,-66.448C14.742,-46.893 14.415,-31.043 14.817,-11.507C14.829,-10.947 15.297,-10.48 15.858,-10.48C38.035,-10.485 56.23,-10.807 76.66,-10.836C77.522,-10.837 78.214,-10.138 78.214,-9.276L78.214,-1.559C78.214,-0.698 77.516,0 76.655,0L0,0C-0.861,0 -1.559,-0.698 -1.559,-1.559L-1.559,-140.451C-1.559,-141.312 -0.861,-142.01 0,-142.01" fill="currentColor" fillRule="nonzero"/>
    </g>
    <g transform="matrix(2,0,0,2,1445.29,-3.603936)">
        <path d="M0,145.079C-24.814,153.849 -61.37,143.105 -67.168,115.038C-67.324,114.29 -66.888,113.542 -66.171,113.282L-56.839,109.915C-55.935,109.583 -54.948,110.144 -54.782,111.079C-47.934,149.672 8.458,151.688 10.391,116.129C10.921,106.393 6.952,96.864 -0.218,90.245C-18.673,73.162 -52.828,66.46 -57.858,41.916C-58.595,38.3 -58.543,34.559 -57.837,30.943C-51.002,-3.691 6.365,-8.77 22.026,22.822C22.482,23.74 22.862,24.695 23.227,25.653C23.404,26.12 23.57,26.559 23.632,26.733C24.962,30.224 25.479,32.907 25.926,34.84C26.082,35.546 25.739,36.263 25.084,36.585L16.044,41.002C15.14,41.438 14.07,40.918 13.841,39.942C13.363,37.936 12.313,34.32 9.996,28.792C4.073,16.188 -3.2,7.875 -17.571,8.238C-38.78,8.779 -49.399,32.574 -34.613,46.893C-20.304,60.724 4.344,68.216 17.571,83.408C36.909,103.005 25.77,137.597 0,145.079" fill="currentColor" fillRule="nonzero"/>
    </g>
  </svg>
);

const FaqItem = ({ question, answer, brandColor, brandTextColor }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`border border-blackout/10 rounded-2xl bg-white overflow-hidden mb-4 transition-all duration-300 hover:border-blackout/30 hover:shadow-lg`}>
      <button
        className="w-full text-left px-8 py-6 flex items-center gap-4 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm ${brandColor} ${brandTextColor}`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" strokeWidth={3} />}
        </div>
        <span className="text-lg font-light text-blackout">{question}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-16 pb-8 text-base text-blackout/60 leading-relaxed font-light"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SUB_BRANDS = [
  {
    id: "move",
    title: "TIME TO MOVE",
    subtitle: "Movimento com Alma",
    description: "Mais do que um treino funcional, o nosso espaço Boutique é um ponto de encontro familiar. Onde o corpo é desafiado através da técnica e da comunidade. É o movimento que liberta a mente e fortalece o espírito.",
    details: [
      "Treino Personalizado e Funcional",
      "Comunidade e Networking",
      "Equipamentos de Alta Performance",
      "Eventos de Bem-Estar Mensais"
    ],
    color: "bg-move-citrus",
    textColor: "text-move-leaf",
    accentBorder: "hover:border-move-citrus",
    accentShadow: "shadow-move-citrus/20",
    icon: <Activity className="w-6 h-6" />,
    gradient: "lunes-gradient-move",
    image: "/move-featured.jpg",
    gallery: [
      "/move-featured.jpg",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: "explore",
    title: "TIME TO EXPLORE",
    subtitle: "A Liberdade do Horizonte",
    description: "Há experiências que não se explicam, sentem-se. O mar, a luz, o silêncio e a liberdade de estar presente. Partimos de Portimão para viver a costa sem pressas, com tempo para olhar, respirar e guardar. Seja ao nascer do sol, ao pôr do sol ou num dia tranquilo, este não é apenas um passeio de barco. Partimos sempre de Portimão, para aproveitar cada minuto no mar. Pode escolher um passeio partilhado ou criar uma experiência totalmente privada.",
    details: [
      "Expedições Náuticas Curadas",
      "Workshops de Navegação",
      "Retiros em Alto Mar",
      "Conexão com a Natureza Selvagem"
    ],
    tours: [
      {
        title: "Costa de Portimão à Sra. da Rocha",
        image: "/tours-coast.jpg",
        duration: "150 Min",
        rating: 5,
        capacity: "Por passageiro",
        priceTotal: "40€",
        description: "Navegamos entre grutas, falésias douradas e praias icónicas. Contamos histórias, exploramos recantos únicos e paramos para mergulho na inesquecível Praia da Marinha."
      },
      {
        title: "Rio Arade",
        image: "/tours-river.jpg",
        duration: "120 Min",
        rating: 5,
        capacity: "Por passageiro",
        priceTotal: "40€",
        description: "Um passeio calmo, perfeito para quem procura natureza, biodiversidade e silêncio. Aqui o tempo abranda e a ligação ao lugar acontece naturalmente."
      },
      {
        title: "Sunrise & Sunset",
        image: "/tours-sunset.jpg",
        duration: "120 Min",
        rating: 5,
        capacity: "Por passageiro",
        priceTotal: "40€",
        description: "Ao nascer ou ao pôr do sol, a luz transforma tudo. As cores, o mar e a atmosfera criam um momento íntimo e memorável, daqueles que se guardam."
      },
      {
        title: "Passeios Privados",
        image: "/private-tour.jpg",
        duration: "Flexível",
        rating: 5,
        capacity: "Até 17 pessoas",
        priceTotal: "550€",
        description: "Uma experiência feita à sua medida, no seu ritmo. Navegue com quem escolhe, descubra a costa com calma e desfrute de uma bebida de boas-vindas a bordo."
      }
    ],
    faqs: [
      { q: "Que cuidados de segurança devo ter?", a: "A segurança é a nossa prioridade. Coletes salva-vidas são fornecidos e obrigatórios em condições específicas." },
      { q: "Qual é o ponto de encontro?", a: "Receberá as coordenadas exatas da Marina e do nosso cais privado na confirmação da reserva." },
      { q: "E os aparelhos eletrónicos?", a: "Dispomos de compartimentos estanques no barco onde poderá guardar o telemóvel em segurança." },
      { q: "Onde posso estacionar?", a: "Existe estacionamento gratuito nas proximidades da Marina." },
      { q: "Que locais vou visitar?", a: "Iremos explorar grutas exclusivas e enseadas secretas ao longo da costa intocada." },
      { q: "Há alguma restrição?", a: "Não recomendado para grávidas em fases avançadas ou pessoas com lesões graves na coluna." },
      { q: "Devo preocupar-me com as condições do mar?", a: "Monitorizamos o mar 24h por dia. Em caso de más condições, remarcaremos a experiência." }
    ],
    color: "bg-explore-cyan",
    textColor: "text-explore-blue",
    accentBorder: "hover:border-explore-cyan",
    accentShadow: "shadow-explore-cyan/20",
    icon: <Compass className="w-6 h-6" />,
    gradient: "lunes-gradient-explore",
    image: "/explore-featured.jpg",
    gallery: [
      "/explore-featured.jpg",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464947644273-914a94b3f034?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: "feel",
    title: "TIME TO FEEL",
    subtitle: "A Raiz e a Nutrição",
    description: "A verdadeira sofisticação reside no orgânico. No nosso espaço de campo e agricultura bio, o FEEL traduz-se no toque da terra e no sabor do produto honesto. Um regresso aos sentidos.",
    details: [
      "Agricultura Biológica Certificada",
      "Experiências Farm-to-Table",
      "Workshops de Culinária Consciente",
      "Turismo Rural de Luxo"
    ],
    color: "bg-feel-athletics",
    textColor: "text-feel-sage",
    accentBorder: "hover:border-feel-athletics",
    accentShadow: "shadow-feel-athletics/20",
    icon: <Leaf className="w-6 h-6" />,
    gradient: "lunes-gradient-feel",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523348830342-d01f9fc9d55e?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: "stay",
    title: "TIME TO STAY",
    subtitle: "O Refúgio do Ser",
    description: "O nosso alojamento local é a materialização física desta identidade visual: espaços amplos, luz natural e uma calma regeneradora. Um lugar desenhado para 'estar', sem a urgência de 'fazer'.",
    details: [
      "Design Minimalista e Funcional",
      "Ambientes de Silêncio Curado",
      "Integração com a Paisagem",
      "Serviço de Concierge Personalizado"
    ],
    color: "bg-stay-creame",
    textColor: "text-stay-pink",
    accentBorder: "hover:border-stay-creame",
    accentShadow: "shadow-stay-creame/20",
    icon: <Home className="w-6 h-6" />,
    gradient: "lunes-gradient-stay",
    reservationLink: "https://www.airbnb.com.br/rooms/1578259404923411103?source_impression_id=p3_1774870114_P3oQM9EdXo4Gup30",
    image: "/stay-featured.jpg",
    gallery: [
      "/stay-1.png",
      "/stay-2.png",
      "/stay-3.png",
      "/stay-4.png"
    ]
  }
];

const TESTIMONIALS = [
  {
    name: "Sofia Martins",
    role: "LUNES MOVE Member",
    quote: "A LUNES não é apenas um ginásio, é onde encontro o meu equilíbrio semanal. O ambiente é acolhedor e os treinos são desafiantes mas respeitam o meu ritmo.",
    image: "https://i.pravatar.cc/150?u=sofia"
  },
  {
    name: "Ricardo Silva",
    role: "LUNES EXPLORE Guest",
    quote: "A expedição náutica foi transformadora. Estar em alto mar, com o silêncio curado da LUNES, permitiu-me reconectar com o que realmente importa.",
    image: "https://i.pravatar.cc/150?u=ricardo"
  },
  {
    name: "Ana Oliveira",
    role: "LUNES STAY Resident",
    quote: "Ficar no alojamento da LUNES foi como respirar pela primeira vez em meses. O design minimalista e a luz natural criam uma paz indescritível.",
    image: "https://i.pravatar.cc/150?u=ana"
  }
];

const MANIFESTO_CARDS = [
  { id: 1, title: "Manifesto", image: "/manifesto.png" },
  { id: 2, title: "MOVE", image: "https://picsum.photos/seed/lunes-move/800/1000" },
  { id: 3, title: "EXPLORE", image: "https://picsum.photos/seed/lunes-explore/800/1000" },
  { id: 4, title: "STAY", image: "https://picsum.photos/seed/lunes-stay/800/1000" },
  { id: 5, title: "EAT", image: "https://picsum.photos/seed/lunes-eat/800/1000" },
];

const ManifestoStack = () => {
  const [cards, setCards] = useState(MANIFESTO_CARDS);

  const rotateCards = () => {
    setCards((prev: typeof MANIFESTO_CARDS) => {
      const newCards = [...prev];
      const first = newCards.shift();
      if (first) newCards.push(first);
      return newCards;
    });
  };

  return (
    <div 
      className="relative w-full aspect-[4/5] cursor-pointer group" 
      onClick={rotateCards}
    >
      <AnimatePresence mode="popLayout">
        {cards.map((card: { id: number; title: string; image: string }, index: number) => (
          <motion.div
            key={card.id}
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1 - index * 0.05,
              opacity: 1 - index * 0.2,
              y: index * 15,
              zIndex: MANIFESTO_CARDS.length - index,
              rotate: index % 2 === 0 ? index * 1.5 : -index * 1.5
            }}
            exit={{ x: 400, opacity: 0, rotate: 25, transition: { duration: 0.4 } }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-blackout"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blackout/60 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10">
              <span className="text-[10px] uppercase tracking-[0.5em] text-coconut/80 font-bold">{card.title}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Interaction Hint */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-30 group-hover:opacity-60 transition-opacity">
        <span className="text-[9px] uppercase tracking-widest">Clique para rodar</span>
        <ArrowRight className="w-3 h-3" />
      </div>
    </div>
  );
};

export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const [galleryOrder, setGalleryOrder] = useState<{ [key: string]: number[] }>({});

  const handleGalleryClick = (brandId: string, totalCards: number) => {
    setGalleryOrder((prev: { [key: string]: number[] }) => {
      const currentOrder = prev[brandId] || Array.from({ length: totalCards }, (_: unknown, i: number) => i);
      // Move o primeiro card (topo) para o final da lista
      const newOrder = [...currentOrder];
      const firstCard = newOrder.shift();
      if (firstCard !== undefined) {
        newOrder.push(firstCard);
      }
      return { ...prev, [brandId]: newOrder };
    });
  };

  // Interactive Logic
  const rotationValue = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  const [selectedBrand, setSelectedBrand] = useState<typeof SUB_BRANDS[0] | null>(null);
  const [hoveredBrand, setHoveredBrand] = useState<typeof SUB_BRANDS[0] | null>(null);
  const activeEffectBrand = selectedBrand || hoveredBrand;
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>('hero');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<'privacy' | 'terms' | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const cardTransition = {
    type: "spring" as const,
    damping: 25,
    stiffness: 120,
    mass: 0.8,
  };

  const cursorX = useSpring(0, { stiffness: 600, damping: 40 });
  const cursorY = useSpring(0, { stiffness: 600, damping: 40 });
  const outerX = useSpring(0, { stiffness: 350, damping: 25 });
  const outerY = useSpring(0, { stiffness: 350, damping: 25 });

  // Scroll tracking for header and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);

      // Detectar seção atual baseado na posição do scroll
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const sections = [
        { id: 'hero', element: document.querySelector('section:nth-of-type(1)') },
        { id: 'ecosystem', element: document.querySelector('section:nth-of-type(2)') },
        { id: 'about', element: document.getElementById('about') },
        { id: 'testimonials', element: document.querySelector('section:nth-of-type(4)') },
        { id: 'contact', element: document.getElementById('contact') }
      ];

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setCurrentSection(section.id);
            break;
          }
        }
      }
    };

    handleScroll(); // Check initial position
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse tracking for parallax effects and custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      outerX.set(e.clientX);
      outerY.set(e.clientY);
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, cursorX, cursorY, outerX, outerY]);

  useEffect(() => {
    if (selectedBrand || activeOverlay || showContactForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedBrand, activeOverlay, showContactForm]);

  // Auto-rotation effect
  useAnimationFrame((time) => {
    rotationValue.set(time * 0.01);
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen selection:bg-blackout selection:text-coconut" ref={containerRef}>
      {/* Custom Cursor - Hidden on Mobile/Tablet */}
      <motion.div
        className="hidden lg:block fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] bg-white"
        animate={{
          x: cursorPosition.x - 12,
          y: cursorPosition.y - 12,
          scale: 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 500,
          mass: 0.4,
        }}
        style={{
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)',
          mixBlendMode: 'difference'
        }}
      />

      <motion.div
        className="hidden lg:block fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] border-2 border-white/50"
        animate={{
          x: cursorPosition.x - 20,
          y: cursorPosition.y - 20,
          scale: 1,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 400,
          mass: 0.6,
        }}
        style={{
          mixBlendMode: 'difference'
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 px-8 transition-all duration-500 flex justify-between items-center text-coconut ${
        isScrolled
          ? "bg-blackout/90 backdrop-blur-lg py-4 border-b border-coconut/10 shadow-2xl"
          : "py-6 mix-blend-difference"
      }`}>
        <div className="flex items-center cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <LunesLogo className="h-6 md:h-7 w-auto group-hover:drop-shadow-[0_0_10px_rgba(251,249,249,0.6)] transition-all duration-300" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-[10px] uppercase tracking-[0.5em] font-bold">
          <button
            onClick={() => scrollToSection('about')}
            className="hover:text-blackout hover:bg-coconut hover:shadow-[0_0_20px_rgba(251,249,249,0.4)] transition-all duration-300 px-4 py-1.5 rounded-full flex items-center h-full"
          >
            SOBRE
          </button>
          <button
            onClick={() => setSelectedBrand(SUB_BRANDS.find(b => b.id === 'move') || null)}
            onMouseEnter={() => setHoveredBrand(SUB_BRANDS.find(b => b.id === 'move') || null)}
            onMouseLeave={() => setHoveredBrand(null)}
            className="hover:text-move-leaf hover:bg-move-citrus hover:shadow-[0_0_25px_rgba(195,234,79,0.5)] transition-all duration-300 px-4 py-1.5 rounded-full flex items-center"
          >
            MOVE
          </button>
          <button
            onClick={() => setSelectedBrand(SUB_BRANDS.find(b => b.id === 'explore') || null)}
            onMouseEnter={() => setHoveredBrand(SUB_BRANDS.find(b => b.id === 'explore') || null)}
            onMouseLeave={() => setHoveredBrand(null)}
            className="hover:text-explore-blue hover:bg-explore-cyan hover:shadow-[0_0_25px_rgba(208,239,239,0.5)] transition-all duration-300 px-4 py-1.5 rounded-full flex items-center"
          >
            EXPLORE
          </button>
          <button
            onClick={() => setSelectedBrand(SUB_BRANDS.find(b => b.id === 'feel') || null)}
            onMouseEnter={() => setHoveredBrand(SUB_BRANDS.find(b => b.id === 'feel') || null)}
            onMouseLeave={() => setHoveredBrand(null)}
            className="hover:text-feel-sage hover:bg-feel-athletics hover:shadow-[0_0_25px_rgba(234,234,203,0.5)] transition-all duration-300 px-4 py-1.5 rounded-full flex items-center"
          >
            FEEL
          </button>
          <button
            onClick={() => setSelectedBrand(SUB_BRANDS.find(b => b.id === 'stay') || null)}
            onMouseEnter={() => setHoveredBrand(SUB_BRANDS.find(b => b.id === 'stay') || null)}
            onMouseLeave={() => setHoveredBrand(null)}
            className="hover:text-stay-pink hover:bg-stay-creame hover:shadow-[0_0_25px_rgba(247,234,223,0.5)] transition-all duration-300 px-4 py-1.5 rounded-full flex items-center"
          >
            STAY
          </button>
        </div>
        <button
          onClick={() => scrollToSection('contact')}
          className="hidden md:block border border-white/20 rounded-full px-8 py-2.5 text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-white hover:text-blackout transition-all duration-300 bg-white/5 backdrop-blur-md hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          CONTACTO
        </button>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 group z-[60]"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{
              rotate: isMobileMenuOpen ? 45 : 0,
              y: isMobileMenuOpen ? 8 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="w-6 h-0.5 bg-coconut rounded-full group-hover:bg-coconut/80 transition-colors"
          />
          <motion.span
            animate={{
              opacity: isMobileMenuOpen ? 0 : 1,
            }}
            transition={{ duration: 0.2 }}
            className="w-6 h-0.5 bg-coconut rounded-full group-hover:bg-coconut/80 transition-colors"
          />
          <motion.span
            animate={{
              rotate: isMobileMenuOpen ? -45 : 0,
              y: isMobileMenuOpen ? -8 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="w-6 h-0.5 bg-coconut rounded-full group-hover:bg-coconut/80 transition-colors"
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-blackout/95 backdrop-blur-xl z-[55] md:hidden"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-blackout border-l border-coconut/10 z-[60] md:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full p-8 pt-24">
                {/* Menu Items */}
                <div className="flex flex-col gap-6">
                  <button
                    onClick={() => {
                      scrollToSection('about');
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left text-2xl text-coconut font-light hover:text-coconut/60 transition-all duration-300 py-3 border-b border-coconut/10"
                  >
                    Sobre
                  </button>

                  <div className="space-y-4 py-3 border-b border-coconut/10">
                    <p className="text-[10px] uppercase tracking-[0.5em] text-coconut/40 font-bold">Ecossistema</p>
                    <button
                      onClick={() => {
                        setSelectedBrand(SUB_BRANDS.find(b => b.id === 'move') || null);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 text-xl text-coconut hover:text-move-citrus transition-all duration-300 w-full"
                    >
                      <div className="w-2 h-2 rounded-full bg-move-citrus" />
                      <span>MOVE</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedBrand(SUB_BRANDS.find(b => b.id === 'explore') || null);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 text-xl text-coconut hover:text-explore-cyan transition-all duration-300 w-full"
                    >
                      <div className="w-2 h-2 rounded-full bg-explore-cyan" />
                      <span>EXPLORE</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedBrand(SUB_BRANDS.find(b => b.id === 'feel') || null);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 text-xl text-coconut hover:text-feel-athletics transition-all duration-300 w-full"
                    >
                      <div className="w-2 h-2 rounded-full bg-feel-athletics" />
                      <span>FEEL</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedBrand(SUB_BRANDS.find(b => b.id === 'stay') || null);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 text-xl text-coconut hover:text-stay-creame transition-all duration-300 w-full"
                    >
                      <div className="w-2 h-2 rounded-full bg-stay-creame" />
                      <span>STAY</span>
                    </button>
                  </div>
                </div>

                {/* Contact Button */}
                <div className="mt-auto pt-8">
                  <button
                    onClick={() => {
                      scrollToSection('contact');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full border border-coconut/20 rounded-full px-8 py-4 text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-coconut hover:text-blackout transition-all duration-300 bg-coconut/5 backdrop-blur-md"
                  >
                    Contacto
                  </button>
                </div>

                {/* Social Links */}
                <div className="flex gap-6 justify-center mt-8 pt-8 border-t border-coconut/10">
                  <InstagramIcon className="w-5 h-5 text-coconut/60 hover:text-coconut cursor-pointer transition-all duration-300" />
                  <FacebookIcon className="w-5 h-5 text-coconut/60 hover:text-coconut cursor-pointer transition-all duration-300" />
                  <div
                    onClick={() => {
                      setShowContactForm(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="p-2 -m-2"
                  >
                    <Mail className="w-5 h-5 text-coconut/60 hover:text-coconut cursor-pointer transition-all duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          scale: selectedBrand ? 0.98 : 1,
          filter: selectedBrand ? "blur(10px)" : "blur(0px)",
          opacity: selectedBrand ? 0.6 : 1,
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center bg-blackout text-coconut overflow-hidden select-none">
        {/* YouTube Background Video */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115vw] h-[115vh] min-w-[177.77vh] min-h-[56.25vw]">
            <iframe
              src="https://www.youtube.com/embed/5ZBRAddjwwU?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&autohide=1&modestbranding=1&playlist=5ZBRAddjwwU&rel=0&enablejsapi=1"
              className="w-full h-full pointer-events-none opacity-30 grayscale contrast-125 scale-110"
              allow="autoplay; encrypted-media"
              title="Lunes Background Video"
            />
          </div>
          {/* Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-blackout/40" />
        </div>

        {/* Grainy Cinematic Overlay */}
        <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] will-change-opacity" />

        {/* 2026 Atmospheric Background: Liquid Aura & Micro-moments */}
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
          {/* Generative Aura */}
          <motion.div 
            style={{
              x: useTransform(smoothMouseX, (v) => v * -1.5),
              y: useTransform(smoothMouseY, (v) => v * -1.5),
            }}
            animate={{ 
              scale: [1, 1.15, 1],
              rotate: [0, 90, 180, 270, 360],
              opacity: selectedBrand ? 0.4 : 0.15,
            }}
            transition={{ 
              scale: { duration: 20, repeat: Infinity, ease: "linear" },
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            }}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] h-[110vw] rounded-full blur-[100px] transition-colors duration-1000 will-change-transform ${selectedBrand ? selectedBrand.color : 'bg-coconut/10'}`}
          />
          
          {/* Secondary Aura for Depth */}
          <motion.div 
            style={{
              x: useTransform(smoothMouseX, (v) => v * 0.8),
              y: useTransform(smoothMouseY, (v) => v * 0.8),
            }}
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 270, 180, 90, 0],
              opacity: 0.05,
            }}
            transition={{ 
              scale: { duration: 30, repeat: Infinity, ease: "linear" },
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] rounded-full blur-[120px] bg-coconut/5 will-change-transform"
          />

          {/* Micro-moments (Particles) */}
          {[...Array(30)].map((_, i) => {
            const size = Math.random() * 2 + 0.5;
            const speed = Math.random() * 20 + 15;
            const initialX = Math.random() * 100;
            const initialY = Math.random() * 100;
            const parallaxFactor = size * 0.8;
            const twinkleDuration = Math.random() * 3 + 2;

            return (
              <motion.div
                key={i}
                initial={{ 
                  x: initialX + "vw", 
                  y: initialY + "vh",
                  opacity: 0
                }}
                style={{
                  translateX: useTransform(smoothMouseX, (v) => v * parallaxFactor),
                  translateY: useTransform(smoothMouseY, (v) => v * parallaxFactor),
                  width: size, 
                  height: size,
                  filter: size > 1.5 ? 'blur(0.5px)' : 'none'
                }}
                animate={{ 
                  y: [null, -300],
                  opacity: [0, 0.6, 0.2, 0.6, 0],
                }}
                transition={{ 
                  y: { duration: speed, repeat: Infinity, ease: "linear", delay: Math.random() * 10 },
                  opacity: { 
                    duration: twinkleDuration, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1]
                  },
                }}
                className={`absolute rounded-full shadow-[0_0_8px_rgba(251,249,249,0.4)] will-change-transform transition-colors duration-1000 ${activeEffectBrand ? activeEffectBrand.color + ' ' + activeEffectBrand.accentShadow : 'bg-coconut'}`}
              />
            );
          })}
        </div>

        {/* Interaction Layer */}
        <motion.div 
          className="absolute inset-0 z-20 cursor-default"
          onClick={() => selectedBrand && setSelectedBrand(null)}
        />

        {/* Content Container */}
        <div className="relative z-30 flex flex-col items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ 
              opacity: selectedBrand ? 0 : 1, 
              filter: selectedBrand ? "blur(20px)" : "blur(0px)",
              y: selectedBrand ? -40 : 0
            }}
            transition={{ 
              opacity: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
              filter: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
            }}
            className="text-center pointer-events-none"
          >
            <h1 className="text-[12vw] md:text-[10vw] leading-none mb-6 italic tracking-tighter font-serif drop-shadow-2xl">
              Time to be You.
            </h1>
            <div className="flex items-center justify-center gap-4 opacity-100 mt-4">
              <p className="text-[10px] uppercase tracking-[0.5em] font-medium text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                O TEU MOMENTO. O TEU TEMPO.
              </p>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ 
              opacity: selectedBrand ? 0 : 1,
              filter: selectedBrand ? "blur(10px)" : "blur(0px)",
              y: selectedBrand ? 20 : 0
            }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => scrollToSection('ecosystem')}
            className="group flex flex-col items-center gap-4 cursor-pointer pointer-events-auto"
          >
            <div className="w-[1.5px] h-24 bg-gradient-to-b from-coconut/0 via-coconut/100 to-coconut/0 shadow-[0_0_15px_rgba(251,249,249,0.6)] group-hover:shadow-[0_0_25px_rgba(251,249,249,0.8)] transition-all duration-300" />
            <span className="text-[10px] uppercase tracking-[0.5em] opacity-40 group-hover:opacity-100 transition-all duration-300 group-hover:text-coconut group-hover:drop-shadow-[0_0_12px_rgba(251,249,249,0.8)]">Descobrir</span>
          </motion.button>
        </div>

        <motion.div 
          style={{ rotate: scrollYProgress }}
          className="absolute w-[80vw] h-[80vw] border border-coconut/5 rounded-full -bottom-[40vw] z-0"
        />
      </section>

      <section id="ecosystem" className="py-40 px-8 overflow-hidden" style={{ backgroundColor: '#FBF9F9' }}>
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 relative">
              <div className="space-y-4">
                <h2 className="text-5xl md:text-8xl italic leading-none tracking-tighter">O Nosso Ecossistema</h2>
                <p className="text-blackout/40 max-w-md uppercase tracking-[0.5em] text-[10px] font-bold">Quatro pilares, uma única essência.</p>
              </div>
              
              {/* Rotating Badge - Absolute Position to avoid height increase */}
              <div className="absolute -right-8 -bottom-16 md:-bottom-24 z-0 pointer-events-none">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="w-38 h-38 md:w-64 md:h-64 opacity-20 md:opacity-10"
                >
                  <img 
                    src="/LUNES badge preto.png" 
                    alt="LUNES Badge" 
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </div>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SUB_BRANDS.map((brand, idx) => (
              <motion.div
                key={brand.id}
                whileHover="hover"
                initial="initial"
                onClick={() => setSelectedBrand(brand)}
                className={`group relative h-[650px] rounded-[2rem] overflow-hidden cursor-pointer transition-colors duration-1000 ${brand.color}`}
                transition={cardTransition}
              >
                {/* Background Image - Hero of the card */}
                <motion.img 
                  src={brand.image} 
                  alt={brand.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2000ms] ease-out"
                  referrerPolicy="no-referrer"
                  transition={cardTransition}
                />
                
                {/* Minimalist Editorial Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-blackout/100 via-blackout/40 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-1000" 
                  transition={cardTransition}
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 transition-colors duration-1000">
                  <div className="flex justify-between items-start">
                    <motion.div 
                      variants={{
                        hover: { scale: 1.1, rotate: -5, transition: { type: "spring", stiffness: 400 } }
                      }}
                      className={`p-3 rounded-xl transition-colors duration-1000 shadow-2xl backdrop-blur-md ${brand.textColor} bg-white/30 group-hover:${brand.color} group-hover:bg-opacity-80`}
                    >
                      {brand.icon}
                    </motion.div>
                    <span className={`text-[10px] font-mono tracking-[0.4em] transition-colors duration-1000 ${brand.textColor} opacity-40 group-hover:!text-white group-hover:opacity-40`}>0{idx + 1}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1, duration: 0.8 }}
                      className={`text-[10px] uppercase tracking-[0.5em] font-bold mb-2 transition-colors duration-500 ${brand.textColor} opacity-60 group-hover:!text-white/60 group-hover:opacity-100`}
                    >
                      {brand.subtitle}
                    </motion.p>
                    <h3 className={`text-5xl md:text-6xl italic leading-[0.8] font-serif tracking-tighter transition-colors duration-500 ${brand.textColor} group-hover:!text-white`}>
                      {brand.title}
                    </h3>
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      whileInView={{ opacity: 1, width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 1 }}
                      className="flex items-center gap-4 pt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0"
                    >
                      <div className={`h-[1px] w-8 transition-colors duration-500 ${brand.textColor} group-hover:bg-white`} />
                      <span className={`text-[10px] uppercase tracking-[0.5em] transition-colors duration-500 ${brand.textColor} group-hover:!text-white/80`}>Descobrir</span>
                      <ArrowRight className={`w-3 h-3 -rotate-45 transition-colors duration-500 ${brand.textColor} group-hover:!text-white`} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-white py-48 px-8">
        <div className="max-w-7xl mx-auto space-y-24">
        {/* Main Header */}
        <h2 className="text-5xl md:text-8xl leading-[0.9] tracking-tighter italic">
          A luz que traz clareza ao caos.
        </h2>

        {/* 3-Column Grid: Gallery | Text col 1 | Text col 2 */}
        <div className="grid lg:grid-cols-3 gap-16 md:gap-20 items-start">
          {/* Column 1: Gallery */}
          <div className="relative px-8 md:px-0">
            <ManifestoStack />
          </div>

          {/* Columns 2 & 3: Brand Story (Manually Split) */}
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-4">
              <p className="text-xl md:text-2xl font-serif italic text-blackout">Olá, somos a Luísa e o Francisco.</p>
              
              <div className="grid md:grid-cols-2 gap-12 text-base md:text-lg text-blackout/70 leading-relaxed font-normal font-sans">
                {/* Text Column 1 */}
                <div className="space-y-6">
                  <p>
                    A nossa história começou de forma inesperada: de cliente e treinador, transformámo-nos num casal unido por sonhos e cuidado mútuo. Crescemos, curámos e fortalecemo-nos juntos.
                  </p>
                  <p>
                    É esta parceria de amor e confiança que dá vida à Lunes — um projeto que carrega a nossa identidade até na fusão dos nossos apelidos, <span className="font-semibold uppercase tracking-widest text-[10px] text-blackout border-b border-blackout/20 pb-0.5">Luz e Nunes.</span> Mais do que a materialização de um sonho, é a vontade de criar um espaço onde cada momento se torna inesquecível.
                  </p>
                </div>

                {/* Text Column 2 */}
                <div className="space-y-6">
                  <p>
                    Acreditamos que o tempo deixou de ser uma imposição. Aqui, o tempo não pressiona; ele acolhe. Convidamo-lo a viver ao seu próprio ritmo, no seu tempo — finalmente seu.
                  </p>
                  <p>
                    A Lunes divide-se em quatro pilares inspirados nos ciclos da natureza: <span className="italic font-medium text-blackout text-sm uppercase tracking-wider">Move, Explore, Feel e Stay</span>. Quatro formas de regressar ao essencial.
                  </p>
                  <p className="font-medium italic text-blackout leading-tight">
                    Mais do que serviços, criamos viagens de fora para dentro.
                  </p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 bg-blackout/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-5xl md:text-7xl italic tracking-tight">Vozes da Comunidade</h2>
            <p className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-40">O que dizem sobre a experiência LUNES</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, filter: "blur(15px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white p-12 rounded-[3rem] shadow-sm hover:shadow-xl transition-all duration-500 group"
              >
                <div className="mb-8">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">
                    <img 
                      src={t.image} 
                      alt={t.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="text-xl font-serif italic">{t.name}</h3>
                  <p className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-40">{t.role}</p>
                </div>
                <p className="text-lg leading-relaxed text-blackout/70 font-light italic">
                  "{t.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-blackout text-coconut pt-32 pb-12 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-16 mb-32 relative z-10">
          <div className="col-span-2 space-y-8">
            <img src="/LUNES horizontal branco.png" alt="LUNES" className="h-10 md:h-12 w-auto" />
            <p className="text-coconut/80 max-w-md font-light">
              LUNES não vende tempo. LUNES devolve o tempo. Junte-se à nossa comunidade e redescubra o seu ritmo natural.
            </p>
            <div className="flex gap-6">
              <InstagramIcon className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer transition-opacity" />
              <FacebookIcon className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer transition-opacity" />
              <div
                onClick={() => setShowContactForm(true)}
                className="relative group p-2 -m-2"
              >
                <div className="absolute inset-0 bg-coconut/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                <Mail className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer transition-opacity relative z-10" />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold">Links</h4>
            <ul className="space-y-4 text-sm text-coconut/70">
              <li>
                <a href="https://www.livroreclamacoes.pt/inicio/" target="_blank" rel="noopener noreferrer" className="relative w-fit hover:text-coconut cursor-pointer transition-colors group block">
                  Livro de Reclamações
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-coconut transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
              <li 
                onClick={() => setActiveOverlay('privacy')}
                className="relative w-fit hover:text-coconut cursor-pointer transition-colors group"
              >
                Política de Privacidade
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-coconut transition-all duration-300 group-hover:w-full" />
              </li>
              <li 
                onClick={() => setActiveOverlay('terms')}
                className="relative w-fit hover:text-coconut cursor-pointer transition-colors group"
              >
                Termos & Condições
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-coconut transition-all duration-300 group-hover:w-full" />
              </li>
              <li className="relative w-fit hover:text-coconut cursor-pointer transition-colors group">
                Parceiros
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-coconut transition-all duration-300 group-hover:w-full" />
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold">Contactos</h4>
            <ul className="space-y-4 text-sm text-coconut/70">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 opacity-60" />
                <span>+351 928 322 866</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 opacity-60" />
                <a href="mailto:hello@be-lunes.pt" className="hover:text-coconut transition-colors group relative w-fit">
                  hello@be-lunes.pt
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-coconut transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold">Newsletter</h4>
            <p className="text-sm text-coconut/70">Receba inspiração semanal para o seu bem-estar.</p>
            <div className="flex border-b border-coconut/20 py-2">
              <input 
                type="email" 
                placeholder="O seu email" 
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-coconut/40"
              />
              <ArrowRight className="w-4 h-4 opacity-80" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-12 border-t border-coconut/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.5em] font-medium opacity-50 text-center md:text-left">
          <span>© 2026 LUNES EXPERIENCE LDA</span>
          <a href="https://aorubro.pt" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity border-b border-coconut/20 pb-0.5">DESENVOLVIDO POR AORUBRO</a>
        </div>

        {/* Large Background Signature Logo */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[120%] opacity-[0.04] pointer-events-none select-none">
          <img 
            src="/LUNES padrão texto.png" 
            alt="" 
            className="w-full h-auto brightness-0 invert object-contain"
          />
        </div>
      </footer>
      </motion.div>

      {/* Information Panel (Full Screen Overlay) */}
      <AnimatePresence>
        {selectedBrand && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-coconut/95 backdrop-blur-3xl text-blackout overflow-y-auto"
          >
            <div className="min-h-screen flex flex-col">
              {/* Header / Close Button - Aligned with same max-width as site content */}
              <div className="max-w-7xl mx-auto w-full px-8 md:px-12 py-8 flex justify-between items-center">
                <div 
                  onClick={() => setSelectedBrand(null)} 
                  className="cursor-pointer hover:opacity-60 transition-opacity"
                >
                  <LunesLogo className={`h-7 w-auto ${selectedBrand.textColor}`} />
                </div>
                <button
                  onClick={() => setSelectedBrand(null)}
                  className={`p-4 hover:bg-blackout/5 rounded-full transition-all duration-300 group ${selectedBrand.textColor} -mr-4`}
                >
                  <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              <div className="flex-grow max-w-7xl mx-auto px-8 md:px-16 py-12 grid lg:grid-cols-2 gap-20 items-start">
                <div className="space-y-12">
                  <motion.div 
                    initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-2xl ${selectedBrand.color} ${selectedBrand.textColor}`}>
                        {selectedBrand.icon}
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-40">{selectedBrand.subtitle}</p>
                    </div>
                    <h2 className="text-6xl md:text-8xl italic leading-none">{selectedBrand.title}</h2>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-8"
                  >
                    <p className="text-lg md:text-xl font-normal leading-[1.6] tracking-tight opacity-70 font-sans">
                      {selectedBrand.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6 pt-8">
                      {selectedBrand.details.map((detail: string, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
                          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                          transition={{ delay: 0.3 + (i * 0.05), duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          className={`flex items-center gap-4 p-6 rounded-3xl border border-blackout/5 ${selectedBrand.accentBorder} transition-colors bg-white/40 backdrop-blur-sm`}
                        >
                          <div className={`w-2 h-2 rounded-full ${selectedBrand.color}`} />
                          <span className="text-sm font-medium tracking-normal font-sans opacity-80">{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, filter: "blur(15px)", y: 20 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="pt-12"
                  >
                    {selectedBrand.id === 'explore' || selectedBrand.id === 'stay' ? (
                      selectedBrand.reservationLink ? (
                        <a 
                          href={selectedBrand.reservationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-block text-center w-full sm:w-auto px-12 py-5 rounded-full ${selectedBrand.color} ${selectedBrand.textColor} text-[10px] uppercase tracking-[0.5em] font-bold hover:scale-105 transition-all duration-300 shadow-xl ${selectedBrand.accentShadow}`}
                        >
                          Reservar LUNES {selectedBrand.id === 'stay' ? 'STAY' : 'EXPLORE'}
                        </a>
                      ) : (
                        <button
                          onClick={() => {
                            const toursSection = document.getElementById('tours-section');
                            if (toursSection) toursSection.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className={`w-full sm:w-auto px-12 py-5 rounded-full ${selectedBrand.color} ${selectedBrand.textColor} text-[10px] uppercase tracking-[0.5em] font-bold hover:scale-105 transition-all duration-300 shadow-xl ${selectedBrand.accentShadow}`}
                        >
                          Explorar Experiências
                        </button>
                      )
                    ) : (
                      <div className="flex flex-col items-center sm:items-start gap-4">
                        <div className={`px-8 py-4 rounded-full bg-blackout/5 border border-blackout/10 ${selectedBrand.textColor} text-[10px] uppercase tracking-[0.6em] font-bold opacity-60`}>
                          Novidades Brevemente...
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
                
                <div
                  className="relative h-[60vh] lg:h-[80vh] flex items-center justify-center mt-12 lg:mt-0 sticky top-12 px-4 md:px-12 w-full max-w-2xl mx-auto cursor-pointer"
                  onClick={() => handleGalleryClick(selectedBrand.id, selectedBrand.gallery.length)}
                >
                  {(() => {
                    const galleryImages = selectedBrand.gallery.slice(0, 4);
                    const currentOrder = galleryOrder[selectedBrand.id] || Array.from({ length: galleryImages.length }, (_, i) => i);
                    const rotations = [-10, 6, -4, 8];
                    const offsetsX = [-50, 0, 50, 100];
                    const offsetsY = [20, -10, 30, 0];

                    return currentOrder.map((originalIdx: number, displayIdx: number) => {
                      const img = galleryImages[originalIdx];
                      if (!img) return null;

                      return (
                        <motion.div
                          key={originalIdx}
                          layout
                          initial={{ opacity: 0, y: 150, x: 0, rotate: 0 }}
                          animate={{
                            opacity: 1 - displayIdx * 0.15,
                            y: offsetsY[displayIdx],
                            x: offsetsX[displayIdx],
                            rotate: rotations[displayIdx],
                            scale: 1 - displayIdx * 0.03
                          }}
                          whileHover={{
                            scale: 1.05,
                            rotate: 0,
                            y: offsetsY[displayIdx] - 20
                          }}
                          transition={{
                            layout: { duration: 0.5, type: "spring", bounce: 0.2 },
                            delay: displayIdx * 0.05,
                            duration: 0.6,
                            type: "spring",
                            bounce: 0.3
                          }}
                          className="absolute w-[220px] md:w-[320px] lg:w-[360px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-[4px] md:border-[6px] border-white bg-white origin-bottom pointer-events-none"
                          style={{ zIndex: galleryImages.length - displayIdx }}
                        >
                          <img src={img} alt={`Gallery ${originalIdx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] pointer-events-none rounded-xl" />
                        </motion.div>
                      );
                    });
                  })()}

                  {/* Interaction Hint */}
                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none">
                    <span className="text-[9px] uppercase tracking-widest font-bold">Clique para rodar</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Explore Tours Section */}
              {selectedBrand.tours && (
                <div className="py-32 border-t border-blackout/5 bg-[#F9FAF9]">
                  <div className="max-w-7xl mx-auto px-8 md:px-16">
                     <h3 className="text-4xl md:text-5xl font-light italic mb-16 text-center">Experiências {selectedBrand.title}</h3>
                     <div className="grid lg:grid-cols-3 gap-8">
                        {selectedBrand.tours.map((tour: any, idx: number) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                            className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-blackout/5 flex flex-col group"
                          >
                            <div className="relative h-56 overflow-hidden">
                              <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                              <h4 className="text-2xl text-blackout font-light mb-8 text-center">{tour.title}</h4>
                              
                              <div className="flex justify-between items-center mb-8 px-4">
                                <div className="text-center">
                                  <span className="text-[10px] uppercase tracking-[0.5em] block text-blackout/80 mb-2 font-bold">Duração</span>
                                  <div className="flex items-center gap-2 justify-center text-blackout/70">
                                     <Clock className="w-4 h-4 text-explore-blue" />
                                     <span className="text-sm font-medium">{tour.duration}</span>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <span className="text-[10px] uppercase tracking-[0.5em] block text-blackout/80 mb-2 font-bold">Rating</span>
                                  <div className="flex items-center gap-1 text-[#FFD700]">
                                     <Star className="w-3 h-3 fill-current" />
                                     <Star className="w-3 h-3 fill-current" />
                                     <Star className="w-3 h-3 fill-current" />
                                     <Star className="w-3 h-3 fill-current" />
                                     <Star className="w-3 h-3 fill-current" />
                                  </div>
                                  <span className="text-[10px] text-blackout/40 mt-1 block">5/5</span>
                                </div>
                              </div>

                              <div className="space-y-4 mb-12 flex-grow">
                                {tour.priceAdult && (
                                  <div>
                                    <div className="flex items-center justify-between text-lg font-light text-blackout">
                                      <span className="font-medium">Adulto</span>
                                      <div className="flex-grow border-b border-dotted border-blackout/20 mx-4 relative top-1" />
                                      <span className="font-bold">{tour.priceAdult}</span>
                                    </div>
                                  </div>
                                )}
                                {tour.priceChild && (
                                  <div>
                                    <div className="flex items-center justify-between text-lg font-light text-blackout">
                                      <span className="font-medium">Criança</span>
                                      <div className="flex-grow border-b border-dotted border-blackout/20 mx-4 relative top-1" />
                                      <span className="font-bold">{tour.priceChild}</span>
                                    </div>
                                    <span className="text-[10px] text-blackout/40 mt-1 block">{tour.childAge}</span>
                                  </div>
                                )}
                                {tour.capacity && (
                                  <div>
                                    <div className="flex items-center justify-between text-lg font-light text-blackout">
                                      <span className="font-bold">{tour.capacity}</span>
                                      <div className="flex-grow border-b border-dotted border-blackout/20 mx-4 relative top-1" />
                                      <span className="font-bold">{tour.priceTotal}</span>
                                    </div>
                                    {tour.description && <p className="text-xs text-blackout/50 mt-4 leading-relaxed">{tour.description}</p>}
                                  </div>
                                )}
                              </div>

                              <button className={`w-full py-4 rounded-full ${selectedBrand.color} ${selectedBrand.textColor} text-[10px] uppercase tracking-[0.5em] font-bold hover:scale-[1.02] hover:shadow-lg transition-all duration-300`}>
                                Reservar
                              </button>
                            </div>
                          </motion.div>
                        ))}
                     </div>
                  </div>
                </div>
              )}

              {/* FAQs Section */}
              {selectedBrand.faqs && (
                <div className="py-24 bg-[#F9FAF9]">
                  <div className="max-w-3xl mx-auto px-8 md:px-16">
                     <div className="space-y-4">
                        <h2 className="text-4xl font-light italic mb-12 text-center text-blackout">FAQ's</h2>
                        {selectedBrand.faqs.map((faq: any, idx: number) => (
                           <FaqItem key={idx} question={faq.q} answer={faq.a} brandColor={selectedBrand.color} brandTextColor={selectedBrand.textColor} />
                        ))}
                     </div>
                  </div>
                </div>
              )}

              {/* Interaction Hint for Gallery moved inside gallery container */}

              {/* Custom Sections per brand */}
              

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.8 }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              scale: 1,
            }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (selectedBrand) {
                const overlay = document.querySelector('.fixed.inset-0.z-\\[100\\]');
                if (overlay) overlay.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className={`fixed bottom-8 right-8 z-[110] p-4 rounded-full shadow-2xl border backdrop-blur-md transition-all duration-500 group ${
              selectedBrand
                ? `${selectedBrand.color} ${selectedBrand.textColor} border-transparent hover:shadow-[0_0_30px_rgba(0,0,0,0.15)]`
                : currentSection === 'about' || currentSection === 'ecosystem' || currentSection === 'testimonials'
                ? 'bg-blackout text-coconut border-coconut/10 hover:shadow-[0_0_30px_rgba(251,249,249,0.3)]'
                : currentSection === 'contact'
                ? 'bg-coconut text-blackout border-blackout/10 hover:shadow-[0_0_30px_rgba(30,30,30,0.3)]'
                : 'bg-blackout text-coconut border-coconut/10 hover:shadow-[0_0_30px_rgba(251,249,249,0.3)]'
            }`}
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Legal Overlays */}
      <AnimatePresence>
        {activeOverlay === 'privacy' && (
          <PrivacyPolicy onClose={() => setActiveOverlay(null)} />
        )}
        {activeOverlay === 'terms' && (
          <TermsConditions onClose={() => setActiveOverlay(null)} />
        )}
        {showContactForm && (
          <ContactForm onClose={() => setShowContactForm(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
