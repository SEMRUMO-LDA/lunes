import { Activity, Compass, Leaf, Home } from "lucide-react";

export const SUB_BRANDS = [
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
    image: "/images/misc/move-featured.jpg",
    gallery: [
      "/images/misc/move-featured.jpg",
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
    tours: [] as any[],
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
    image: "/images/tours/explore-featured.jpg",
    gallery: [
      "/images/tours/explore-featured.jpg",
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
    image: "/images/stay/stay-featured.jpg",
    gallery: [
      "/images/stay/stay-1.png",
      "/images/stay/stay-2.png",
      "/images/stay/stay-3.png",
      "/images/stay/stay-4.png"
    ]
  }
];

export type Brand = typeof SUB_BRANDS[0];

export function getBrandById(id: string): Brand | undefined {
  return SUB_BRANDS.find(b => b.id === id);
}
