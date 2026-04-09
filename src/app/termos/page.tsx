"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { X, ArrowLeft } from "lucide-react";

const LunesLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 1501 293" className={className}>
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

export default function TermosPage() {
  const router = useRouter();
  const onClose = () => router.push("/");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-white overflow-y-auto selection:bg-blackout selection:text-white"
    >
      <div className="max-w-4xl mx-auto px-8 py-24 md:py-32">
        <button
          onClick={onClose}
          className="fixed top-8 right-8 z-[110] p-4 rounded-full bg-blackout text-white hover:scale-110 transition-transform active:scale-95 group"
        >
          <X className="w-5 h-5" />
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase tracking-[0.3em] whitespace-nowrap pointer-events-none text-blackout font-bold">Fechar</span>
        </button>

        <button
          onClick={onClose}
          className="mb-16 flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] font-bold text-blackout/40 hover:text-blackout transition-colors group"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="cursor-pointer hover:opacity-60 transition-opacity mb-8 block -ml-2"
          >
            <LunesLogo className="h-5 w-auto text-blackout" />
          </div>
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Voltar para a Home
        </button>

        <header className="mb-24">
          <h1 className="text-6xl md:text-8xl italic mb-8 tracking-tighter">Termos e Condicoes</h1>
          <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-blackout/40">Data da ultima atualizacao: Fevereiro de 2026</p>
        </header>

        <div className="space-y-16 text-blackout/80 leading-relaxed font-light">
          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">A Nossa Filosofia</h2>
            <p>
              Na Lunes acreditamos que o mar nao e apenas um cenario, e um espaco vivo que merece respeito, cuidado e presenca consciente.
            </p>
            <p>
              Cada experiencia e pensada para criar momentos de conexao, liberdade e bem-estar, com a seguranca como prioridade e um profundo respeito pela natureza, pela comunidade local e por quem partilha o mar connosco.
            </p>
            <p>
              Ao participar numa experiencia Lunes, cada pessoa torna-se parte ativa desta filosofia. Cuidar do oceano, da embarcacao e de todos a bordo faz parte da viagem.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">1. Identificacao da Empresa</h2>
            <p>
              Os presentes Termos e Condicoes regulam a utilizacao do website e a contratacao dos servicos prestados por Lunes Experience, Lda., pessoa coletiva n.o 518855252, doravante designada por &quot;Lunes Experience&quot;.
            </p>
            <p>Contacto de email: <a href="mailto:hello@be-lunes.pt" className="underline underline-offset-4 font-bold">hello@be-lunes.pt</a></p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">2. Filosofia, Organizacao e Codigo de Conduta</h2>
            <p>
              A Lunes Experience promove atividades maritimo-turisticas assentes no respeito pela natureza, pelo patrimonio cultural e pelos modos de vida locais. Durante as experiencias, espera-se de todos os participantes uma conduta responsavel, consciente e respeitosa.
            </p>
            <p>
              A Lunes Experience reserva-se o direito de interromper ou cancelar qualquer atividade caso o comportamento de um ou mais participantes coloque em causa a seguranca, o ambiente, a tripulacao, a embarcacao ou a filosofia da experiencia, sem direito a reembolso.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">3. Ambito de Aplicacao</h2>
            <p>
              Os presentes Termos e Condicoes aplicam-se a todos os utilizadores do website e a todos os clientes que contratem servicos da Lunes Experience, independentemente do canal de reserva utilizado.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">4. Reservas</h2>
            <div>
              <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-blackout mb-4">4.1 Processo de Reserva</h3>
              <p>As reservas podem ser efetuadas atraves do website, por email ou por outros canais devidamente autorizados. A reserva considera-se valida apenas apos o pagamento total do valor e confirmacao expressa pela Lunes Experience.</p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">5. Voucher de Embarque</h2>
            <p>
              Apos confirmacao do pagamento, o cliente recebera uma comunicacao eletronica que funciona como voucher de embarque, devendo ser apresentada em formato digital ou impresso no momento do check-in.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">6. Precos e Promocoes</h2>
            <p>
              Todos os precos sao apresentados em euros e incluem IVA a taxa legal em vigor. Alteracoes de precos nao afetam reservas ja confirmadas.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">7. Criancas e Condicoes de Participacao</h2>
            <p>
              Algumas experiencias podem ter precos diferenciados para criancas. A Lunes Experience reserva-se o direito de solicitar documentacao para verificacao da idade dos menores. Todos os menores devem estar acompanhados por um adulto responsavel.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">8. Horarios, Check-in e Nao Comparecimento</h2>
            <p>
              O check-in deve ser efetuado ate 30 minutos antes da hora marcada. A nao comparencia ou atraso podera resultar na exclusao do participante, sem direito a reembolso.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">9. Condicoes Meteorologicas e Seguranca</h2>
            <p>
              Todas as atividades estao dependentes das condicoes meteorologicas. A decisao final cabe exclusivamente ao comandante da embarcacao. Em caso de cancelamento por seguranca, o cliente podera optar por reagendamento ou reembolso total.
            </p>
            <div className="p-8 border border-blackout/10 rounded-2xl bg-blackout/[0.02] space-y-4">
              <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-blackout">Seguranca a Bordo</h3>
              <p>Os participantes devem seguir sempre as instrucoes da tripulacao. O acionamento indevido ou negligente de um colete salva-vidas implica o pagamento de uma taxa de 90EUR.</p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">10. Cancelamentos e Reembolsos</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Cancelamento ate 72 horas antes: reembolso total</li>
              <li>Cancelamento entre 72 e 24 horas antes: reembolso de 50%</li>
              <li>Cancelamentos com menos de 24 horas: sem reembolso</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">11. Condicoes para Embarque e Comportamento</h2>
            <p>A Lunes Experience podera recusar o embarque a participantes sob efeito excessivo de alcool, substancias ilicitas ou que demonstrem comportamentos de risco.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">12. Regras a Bordo e Consciencia Ambiental</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>E proibido fumar ou vaporizar a bordo</li>
              <li>Nao e permitido deitar qualquer objeto ao mar</li>
              <li>Todos os residuos devem ser entregues a tripulacao no final</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">13. Utilizacao de Embarcacoes</h2>
            <p>Reservamos o direito de substituir a embarcacao por outra de caracteristicas semelhantes por motivos tecnicos ou de seguranca.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">14. Uso de Imagem e Video</h2>
            <p>A participacao implica autorizacao para captacao de imagens para fins promocionais, salvo indicacao em contrario ate ao check-in.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">15. Responsabilidade e Bens Pessoais</h2>
            <p>A empresa dispoe de seguros obrigatorios, mas nao se responsabiliza por perdas ou danos em bens pessoais dos participantes.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">16. Protecao de Dados</h2>
            <p>Tratamos os dados em conformidade com o RGPD. Para mais detalhe, consulte a nossa Politica de Privacidade.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">17. Reclamacoes</h2>
            <p>Disponibilizamos Livro de Reclamacoes em formato fisico e eletronico.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">18. Alteracoes aos Termos</h2>
            <p>A Lunes reserva-se o direito de alterar estes Termos a qualquer momento.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">19. Lei e Foro</h2>
            <p>Regem-se pela lei portuguesa. O foro competente e o da comarca da sede da Lunes Experience.</p>
          </section>

          <footer className="pt-24 border-t border-blackout/10 flex flex-col items-center gap-8">
            <Image src="/images/brand/LUNES horizontal preto.png" alt="LUNES" width={160} height={32} className="h-8 w-auto opacity-20" />
            <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-blackout/40 text-center">
              LUNES EXPERIENCE, LDA. &copy; 2026
            </p>
          </footer>
        </div>
      </div>
    </motion.div>
  );
}
