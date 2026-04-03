import { motion } from "motion/react";
import { X, ArrowLeft } from "lucide-react";

interface PrivacyPolicyProps {
  onClose: () => void;
}

const PrivacyPolicy = ({ onClose }: PrivacyPolicyProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-white overflow-y-auto selection:bg-blackout selection:text-white"
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
            <svg viewBox="0 0 1501 293" className="h-5 w-auto text-blackout">
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
          </div>
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Voltar para a Home
        </button>

        <header className="mb-24">
          <h1 className="text-6xl md:text-8xl italic mb-8 tracking-tighter">Política de Privacidade</h1>
          <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-blackout/40">Data da última atualização: Fevereiro de 2026</p>
        </header>

        <div className="space-y-16 text-blackout/80 leading-relaxed font-light">
          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">1. Introdução</h2>
            <p>
              A presente Política de Privacidade estabelece a forma como a Lunes Experience, Lda., com sede na Estrada Municipal 529-1, 8400-492 Porches, pessoa coletiva número 518855252, doravante designada por “Empresa”, recolhe, utiliza, conserva e protege os dados pessoais dos utilizadores do website <a href="https://www.be-lunes.pt" className="underline underline-offset-4 hover:text-blackout transition-colors">www.be-lunes.pt</a>.
            </p>
            <p>
              A Empresa desenvolve a sua atividade nas áreas de fitness, atividade marítimo turística, transporte privado de passageiros e alojamento, disponibilizando serviços para venda online, receção de pedidos de informação, reservas e comunicações comerciais.
            </p>
            <p>
              A Lunes Experience, Lda. assume o compromisso de tratar os dados pessoais de forma lícita, leal, transparente e segura, respeitando integralmente a privacidade dos titulares dos dados, em conformidade com a legislação em vigor em Portugal e na União Europeia.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">2. Enquadramento Legal</h2>
            <p>O tratamento de dados pessoais é efetuado nos termos e para os efeitos do disposto em:</p>
            <ul className="list-disc pl-5 space-y-4">
              <li>Regulamento (UE) 2016/679 do Parlamento Europeu e do Conselho, de 27 de abril de 2016, Regulamento Geral sobre a Proteção de Dados (RGPD)</li>
              <li>Lei n.º 58/2019, de 8 de agosto, que assegura a execução do RGPD na ordem jurídica portuguesa</li>
              <li>Demais legislação nacional e europeia aplicável em matéria de proteção de dados pessoais, privacidade e comunicações eletrónicas</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">3. Responsável pelo Tratamento</h2>
            <div className="p-8 border border-blackout/10 rounded-2xl bg-blackout/[0.02]">
              <p className="font-bold text-blackout text-[10px] uppercase tracking-[0.2em] mb-4">Lunes Experience, Lda.</p>
              <p>NIF: 518855252</p>
              <p>Morada: Estrada Municipal 529-1, 8400-492 Porches</p>
              <p>Email: <a href="mailto:hello@be-lunes.pt" className="underline underline-offset-4 hover:text-blackout transition-colors">hello@be-lunes.pt</a></p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">4. Dados Pessoais Recolhidos</h2>
            <p>A Empresa poderá recolher e tratar dados pessoais de acordo com a natureza da relação estabelecida com o utilizador, nomeadamente:</p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-blackout mb-4">4.1 Dados de Identificação e Contacto</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Nome</li>
                  <li>Endereço de correio eletrónico</li>
                  <li>Número de telefone</li>
                  <li>Morada</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-blackout mb-4">4.2 Dados de Faturação e Contratuais</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Número de identificação fiscal</li>
                  <li>Dados necessários à emissão de faturas e recibos</li>
                  <li>Informação relativa a reservas, compras e serviços contratados</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-blackout mb-4">4.3 Dados de Navegação e Utilização do Website</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Endereço IP</li>
                  <li>Tipo de dispositivo e sistema operativo</li>
                  <li>Browser utilizado</li>
                  <li>Datas, horários e duração das visitas</li>
                  <li>Páginas visitadas e interações realizadas</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-blackout mb-4">4.4 Dados de Marketing e Comunicação</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Preferências de contacto</li>
                  <li>Subscrição de newsletters</li>
                  <li>Registos de consentimento</li>
                  <li>Histórico de comunicações</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-blackout mb-4">4.5 Outros Dados Fornecidos Voluntariamente</h3>
                <p>Informações transmitidas através de formulários de contacto, pedidos de informação, reservas, comentários ou comunicações diretas</p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">5. Finalidades do Tratamento</h2>
            <p>Os dados pessoais recolhidos são tratados para as seguintes finalidades:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc pl-5">
              <li>Gestão de pedidos de contacto, informações, reservas e orçamentos</li>
              <li>Prestação de serviços nas áreas de fitness, náutica, transporte e alojamento</li>
              <li>Venda online de serviços</li>
              <li>Gestão administrativa, comercial, contabilística e fiscal</li>
              <li>Cumprimento de obrigações legais e regulamentares</li>
              <li>Envio de newsletters e comunicações comerciais</li>
              <li>Gestão da relação com clientes e utilizadores</li>
              <li>Análise estatística e melhoria contínua do website</li>
              <li>Garantia da segurança do website</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">6. Fundamento Jurídico do Tratamento</h2>
            <p>O tratamento de dados pessoais é realizado com base nos seguintes fundamentos jurídicos:</p>
            <ul className="list-disc pl-5 space-y-4">
              <li>Consentimento do titular dos dados, quando aplicável</li>
              <li>Execução de contrato ou diligências pré-contratuais a pedido do titular</li>
              <li>Cumprimento de obrigações legais a que a Empresa esteja sujeita</li>
              <li>Interesse legítimo da Empresa, nomeadamente para a melhoria dos seus serviços e segurança do website</li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">7. Conservação dos Dados</h2>
            <p>Os dados pessoais são conservados apenas durante o período estritamente necessário para as finalidades que motivaram a sua recolha, ou pelo período exigido por lei:</p>
            <ul className="list-disc pl-5 space-y-4">
              <li>Dados contratuais e de faturação: pelo prazo legal aplicável</li>
              <li>Dados associados a marketing e newsletters: até à retirada do consentimento</li>
              <li>Dados de navegação: de acordo com os prazos definidos na Política de Cookies</li>
            </ul>
            <p>Findos os prazos de conservação, os dados pessoais serão eliminados ou anonimizados de forma segura.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">8. Partilha de Dados com Terceiros</h2>
            <p>Os dados pessoais poderão ser comunicados a terceiros apenas quando tal seja necessário para:</p>
            <ul className="list-disc pl-5 space-y-4">
              <li>Cumprimento de obrigações legais ou ordens de autoridades competentes</li>
              <li>Prestação de serviços por entidades subcontratadas (contabilistas, plataformas de pagamento, etc.)</li>
            </ul>
            <p>Estas entidades apenas tratarão os dados mediante instruções da Empresa e estão obrigadas a garantir a confidencialidade e segurança.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">9. Transferências Internacionais de Dados</h2>
            <p>Sempre que seja necessária a transferência de dados para fora do Espaço Económico Europeu, a Empresa assegurará o cumprimento dos requisitos legais aplicáveis.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">10. Direitos dos Titulares dos Dados</h2>
            <p>O titular dos dados pode, a qualquer momento, exercer os seus direitos:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm font-bold uppercase tracking-widest text-blackout/60 transition-colors">
              <span className="hover:text-blackout transition-colors">Direito de acesso</span>
              <span className="hover:text-blackout transition-colors">Direito de retificação</span>
              <span className="hover:text-blackout transition-colors">Direito ao apagamento</span>
              <span className="hover:text-blackout transition-colors">Direito à limitação</span>
              <span className="hover:text-blackout transition-colors">Direito de oposição</span>
              <span className="hover:text-blackout transition-colors">Direito à portabilidade</span>
              <span className="hover:text-blackout transition-colors">Direito de retirar consentimento</span>
            </div>
            <p>O exercício destes direitos pode ser efetuado através do email <a href="mailto:hello@be-lunes.pt" className="underline underline-offset-4 hover:text-blackout font-bold">hello@be-lunes.pt</a>.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">11. Segurança dos Dados</h2>
            <p>A Empresa adota medidas técnicas e organizativas adequadas para proteger os dados pessoais contra a destruição, perda, alteração, divulgação ou acesso não autorizado.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">12. Cookies</h2>
            <p>O website utiliza cookies essenciais, funcionais, analíticos e de marketing. A utilização de cookies é regulada por uma Política de Cookies própria.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl italic text-blackout">13. Alterações à Política de Privacidade</h2>
            <p>A Empresa reserva-se o direito de alterar a presente Política de Privacidade a qualquer momento. Quaisquer alterações serão publicadas no website.</p>
          </section>

          <footer className="pt-24 border-t border-blackout/10 flex flex-col items-center gap-8">
            <img src="/LUNES horizontal preto.png" alt="LUNES" className="h-8 w-auto opacity-20" />
            <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-blackout/40 text-center">
              LUNES EXPERIENCE, LDA. &copy; 2026
            </p>
          </footer>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
