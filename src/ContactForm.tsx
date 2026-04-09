import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, User, Mail, Phone, MessageSquare, Tag } from "lucide-react";
import { useTranslation } from "@/src/hooks/useTranslation";

interface ContactFormProps {
  onClose: () => void;
}

const AREAS = [
  { id: "move", label: "MOVE", color: "bg-move-citrus", textColor: "text-move-leaf" },
  { id: "explore", label: "EXPLORE", color: "bg-explore-cyan", textColor: "text-explore-blue" },
  { id: "feel", label: "FEEL", color: "bg-feel-athletics", textColor: "text-feel-sage" },
  { id: "stay", label: "STAY", color: "bg-stay-creame", textColor: "text-stay-pink" },
];

const ContactForm = ({ onClose }: ContactFormProps) => {
  const [selectedArea, setSelectedArea] = useState("");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useTranslation();

  // LunesLogo Component locally or imported? It's defined in App.tsx. 
  // For now I'll just use a text version or the SVG since I don't have it exported.
  // Actually, I can just use the SVG code or assume the user wants it at the top.
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-blackout/40 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-3 rounded-full bg-blackout/5 hover:bg-blackout/10 transition-colors group"
        >
          <X className="w-6 h-6 text-blackout" />
        </button>

        {/* Left Side: Info (Visible on Desktop) */}
        <div className="hidden md:flex md:w-1/3 bg-blackout text-coconut p-12 flex-col justify-between relative overflow-hidden">
          <div className="relative z-10 space-y-8">
            <div 
              onClick={onClose}
              className="cursor-pointer hover:opacity-80 transition-opacity mb-12 block"
            >
              <svg viewBox="0 0 1501 293" className="h-6 w-auto text-coconut">
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
            <h2 className="text-4xl italic leading-tight tracking-tighter">
              {t('contact.title', 'A sua viagem começa aqui.')}
            </h2>
            <p className="text-sm opacity-60 font-light leading-relaxed">
              {t('contact.subtitle', 'Diga-nos o que procura e a nossa equipa entrará em contacto para criar o seu momento LUNES.')}
            </p>
          </div>
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-4 opacity-40">
              <div className="w-1.5 h-1.5 rounded-full bg-coconut" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">LUNES EXPERIENCE</span>
            </div>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <Image src="/LUNES padrão texto.png" alt="" fill className="absolute bottom-0 left-0 w-full translate-y-1/2 -rotate-12 invert object-contain" sizes="100%" />
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 p-8 md:p-16 overflow-y-auto custom-scrollbar bg-white/80">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-[0.5em] font-sans font-bold opacity-30">{t('contact.pillar', 'Selecione o Pilar')}</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {AREAS.map((area) => (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => setSelectedArea(area.label)}
                        className={`py-3 rounded-2xl text-[10px] uppercase tracking-widest font-bold transition-all duration-300 border ${
                          selectedArea === area.label
                            ? `${area.color} ${area.textColor} border-transparent shadow-lg scale-105`
                            : "bg-blackout/5 border-blackout/5 text-blackout/40 hover:bg-blackout/[0.08]"
                        }`}
                      >
                        {area.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2 group">
                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-30 group-focus-within:opacity-100 transition-opacity">
                      <User className="w-3 h-3" />
                      <span>{t('contact.name', 'Nome')}</span>
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full bg-blackout/5 border-none rounded-2xl px-6 py-4 outline-none focus:bg-white focus:ring-1 focus:ring-blackout/10 transition-all text-sm"
                      placeholder={t('contact.name.placeholder', 'O seu nome completo')}
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2 group">
                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-30 group-focus-within:opacity-100 transition-opacity">
                      <Mail className="w-3 h-3" />
                      <span>Email</span>
                    </label>
                    <input
                      required
                      type="email"
                      className="w-full bg-blackout/5 border-none rounded-2xl px-6 py-4 outline-none focus:bg-white focus:ring-1 focus:ring-blackout/10 transition-all text-sm"
                      placeholder="exemplo@email.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="space-y-2 group">
                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-30 group-focus-within:opacity-100 transition-opacity">
                      <Phone className="w-3 h-3" />
                      <span>{t('contact.phone', 'Telemóvel')}</span>
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-blackout/5 border-none rounded-2xl px-6 py-4 outline-none focus:bg-white focus:ring-1 focus:ring-blackout/10 transition-all text-sm"
                      placeholder="+351 000 000 000"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-2 group">
                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-30 group-focus-within:opacity-100 transition-opacity">
                      <Tag className="w-3 h-3" />
                      <span>{t('contact.subject', 'Assunto')}</span>
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full bg-blackout/5 border-none rounded-2xl px-6 py-4 outline-none focus:bg-white focus:ring-1 focus:ring-blackout/10 transition-all text-sm"
                      placeholder={t('contact.subject.placeholder', 'Como podemos ajudar?')}
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2 group">
                  <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-30 group-focus-within:opacity-100 transition-opacity">
                    <MessageSquare className="w-3 h-3" />
                    <span>{t('contact.message', 'Mensagem')}</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full bg-blackout/5 border-none rounded-[2rem] px-6 py-4 outline-none focus:bg-white focus:ring-1 focus:ring-blackout/10 transition-all text-sm resize-none"
                    placeholder={t('contact.message.placeholder', 'Escreva aqui a sua mensagem...')}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-blackout text-white py-5 rounded-full flex items-center justify-center gap-4 group hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all duration-300"
                  >
                    <span className="text-[10px] uppercase tracking-[0.5em] font-sans font-bold">{t('contact.submit', 'Enviar Pedido')}</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <Send className="w-8 h-8" />
                  </motion.div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl italic">{t('contact.success.title', 'Mensagem enviada.')}</h3>
                  <p className="text-blackout/40 text-sm">{t('contact.success.subtitle', 'Entraremos em contacto brevemente.')}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;
