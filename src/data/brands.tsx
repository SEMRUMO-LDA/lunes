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
      "Conforto e Segurança Garantidos",
      "Histórias e Cultura da Costa",
      "Recantos Secretos à sua Espera",
      "Momentos que Ficam na Memória"
    ],
    tours: [] as any[],
    faqs: [
      { q: "Qual a duração e horários dos passeios?", a: "Cada passeio tem o seu próprio ritmo. Pode escolher experiências de 2 horas, meio dia ou dia completo, bem como momentos especiais ao nascer e ao pôr do sol, quando a luz transforma o mar e a costa." },
      { q: "Os passeios são privados ou partilhados?", a: "Oferecemos passeios partilhados, ideais para quem gosta de partilhar a experiência, e tours privados para quem procura exclusividade, silêncio e tempo de qualidade." },
      { q: "O que está incluído no passeio?", a: "Uma tripulação experiente, combustível, equipamento de segurança completo com coletes salva-vidas e o privilégio de viver a costa algarvia a partir do mar." },
      { q: "É seguro a bordo?", a: "A segurança é uma prioridade absoluta. Os nossos barcos cumprem todas as normas legais e a tripulação acompanha cada momento com atenção e profissionalismo. A embarcação encontra-se equipada com todos os meios de segurança legalmente exigidos, incluindo coletes salva-vidas, balsas salva-vidas, meios de comunicação e equipamento de emergência." },
      { q: "Onde é o embarque?", a: "Todos os passeios partem de Portimão, no Cais de São Francisco." },
      { q: "Quando devo chegar?", a: "Recomendamos chegar cerca de 20 minutos antes da hora marcada, para um embarque calmo e sem pressas." },
      { q: "Onde posso estacionar?", a: "Existe estacionamento gratuito nas imediações do ponto de embarque, para que chegue e comece a experiência com tranquilidade." },
      { q: "O que devo levar para o passeio?", a: "Roupa confortável, casaco, óculos de sol, protetor solar, roupa de banho, toalha, água e vontade de estar presente. O resto acontece naturalmente." },
      { q: "Que sítios irei visitar?", a: "Navegamos desde Portimão até à Praia da Senhora da Rocha, passando por falésias douradas, grutas esculpidas pelo tempo, enseadas isoladas e recantos acessíveis apenas pelo mar. Cada percurso é único, tal como o momento." },
      { q: "Posso mergulhar no mar?", a: "Sempre que o estado do mar o permitir, fazemos paragens para mergulho em águas calmas e convidativas." },
      { q: "E se as condições atmosféricas não forem favoráveis?", a: "Quando as condições não garantem conforto e segurança, o passeio é reagendado sem custos. Preferimos esperar pelo dia certo a comprometer a experiência." },
      { q: "Qual é a lotação máxima dos passeios partilhados?", a: "Limitamos os passeios partilhados a um máximo de 17 pessoas, para garantir espaço, conforto e uma experiência cuidada." },
      { q: "É necessário reservar com antecedência?", a: "Sim. Trabalhamos com grupos reduzidos e horários limitados. Reservar antecipadamente é a melhor forma de garantir o seu lugar." },
      { q: "Há acompanhamento e explicações durante o passeio?", a: "Sim. Ao longo da navegação partilhamos histórias, curiosidades geológicas, lendas e detalhes sobre a fauna, flora e identidade da costa algarvia, sempre de forma natural e envolvente." },
      { q: "Quanto tempo dura o trajeto entre paragens?", a: "Os trajetos variam conforme o itinerário e as condições do mar, permitindo tempo para fotografar, mergulhar e simplesmente observar." },
      { q: "É possível criar uma experiência totalmente personalizada?", a: "Sim. Através das nossas experiências Taylor Made, desenhamos o passeio ao seu ritmo, combinando percursos, horários e momentos especiais de forma totalmente personalizada." },
      { q: "O passeio é adequado para todos?", a: "Para garantir conforto e segurança, esta experiência não é recomendada a pessoas com mobilidade reduzida, problemas cardíacos ou outras condições sensíveis à vibração do barco durante a navegação. Em caso de dúvida, aconselhamos sempre o contacto prévio connosco." }
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
      "Sensação Imediata de Casa",
      "Ambiente Tranquilo e Acolhedor",
      "Comunicação Fácil",
      "Limpeza Detalhada"
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
