"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter, notFound } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, Star, Clock, Plus, Minus } from "lucide-react";
import { getBrandById, SUB_BRANDS } from "@/src/data/brands";
import { useTours } from "@/src/hooks/useTours";

// LunesLogo SVG
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
    <div className="border border-blackout/10 rounded-2xl bg-white overflow-hidden mb-4 transition-all duration-300 hover:border-blackout/30 hover:shadow-lg">
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

export default function BrandPage() {
  const params = useParams();
  const brandId = (params?.brandId as string) || "";
  const router = useRouter();
  const brand = getBrandById(brandId || "");
  const { tours: dynamicTours } = useTours();

  const [galleryOrder, setGalleryOrder] = useState<number[]>([]);

  if (!brand) {
    notFound();
  }

  const handleGalleryClick = () => {
    const totalCards = brand.gallery.length;
    setGalleryOrder(prev => {
      const currentOrder = prev.length ? prev : Array.from({ length: totalCards }, (_, i) => i);
      const newOrder = [...currentOrder];
      const first = newOrder.shift();
      if (first !== undefined) newOrder.push(first);
      return newOrder;
    });
  };

  const goHome = () => router.push("/");

  const currentGalleryOrder = galleryOrder.length
    ? galleryOrder
    : Array.from({ length: brand.gallery.length }, (_, i) => i);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-coconut/95 backdrop-blur-3xl text-blackout overflow-y-auto"
    >
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="max-w-7xl mx-auto w-full px-8 md:px-12 py-8 flex justify-between items-center">
          <div onClick={goHome} className="cursor-pointer hover:opacity-60 transition-opacity">
            <LunesLogo className={`h-7 w-auto ${brand.textColor}`} />
          </div>
          <button
            onClick={goHome}
            className={`p-4 hover:bg-blackout/5 rounded-full transition-all duration-300 group ${brand.textColor} -mr-4`}
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
                <div className={`p-4 rounded-2xl ${brand.color} ${brand.textColor}`}>
                  {brand.icon}
                </div>
                <p className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-40">{brand.subtitle}</p>
              </div>
              <h2 className="text-6xl md:text-8xl italic leading-none">{brand.title}</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <p className="text-lg md:text-xl font-normal leading-[1.6] tracking-tight opacity-70 font-sans">
                {brand.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-6 pt-8">
                {brand.details.map((detail: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
                    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{ delay: 0.3 + (i * 0.05), duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex items-center gap-4 p-6 rounded-3xl border border-blackout/5 ${brand.accentBorder} transition-colors bg-white/40 backdrop-blur-sm`}
                  >
                    <div className={`w-2 h-2 rounded-full ${brand.color}`} />
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
              {brand.id === 'explore' || brand.id === 'stay' ? (
                brand.reservationLink ? (
                  <a
                    href={brand.reservationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block text-center w-full sm:w-auto px-12 py-5 rounded-full ${brand.color} ${brand.textColor} text-[10px] uppercase tracking-[0.5em] font-bold hover:scale-105 transition-all duration-300 shadow-xl ${brand.accentShadow}`}
                  >
                    Reservar LUNES {brand.id === 'stay' ? 'STAY' : 'EXPLORE'}
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      const toursSection = document.getElementById('tours-section');
                      if (toursSection) toursSection.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full sm:w-auto px-12 py-5 rounded-full ${brand.color} ${brand.textColor} text-[10px] uppercase tracking-[0.5em] font-bold hover:scale-105 transition-all duration-300 shadow-xl ${brand.accentShadow}`}
                  >
                    Explorar Experiencias
                  </button>
                )
              ) : (
                <div className="flex flex-col items-center sm:items-start gap-4">
                  <div className={`px-8 py-4 rounded-full bg-blackout/5 border border-blackout/10 ${brand.textColor} text-[10px] uppercase tracking-[0.6em] font-bold opacity-60`}>
                    Novidades Brevemente...
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Gallery */}
          <div
            className="relative h-[60vh] lg:h-[80vh] flex items-center justify-center mt-12 lg:mt-0 sticky top-12 px-4 md:px-12 w-full max-w-2xl mx-auto cursor-pointer"
            onClick={handleGalleryClick}
          >
            {(() => {
              const galleryImages = brand.gallery.slice(0, 4);
              const rotations = [-10, 6, -4, 8];
              const offsetsX = [-50, 0, 50, 100];
              const offsetsY = [20, -10, 30, 0];

              return currentGalleryOrder.map((originalIdx: number, displayIdx: number) => {
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
                    <Image src={img} alt={`Gallery ${originalIdx}`} fill className="object-cover" sizes="(max-width: 768px) 220px, (max-width: 1024px) 320px, 360px" unoptimized />
                    <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] pointer-events-none rounded-xl" />
                  </motion.div>
                );
              });
            })()}

            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none">
              <span className="text-[9px] uppercase tracking-widest font-bold">Clique para rodar</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Explore Tours Section */}
        {brand.id === 'explore' && dynamicTours.length > 0 && (
          <div id="tours-section" className="py-32 border-t border-blackout/5 bg-[#F9FAF9]">
            <div className="max-w-7xl mx-auto px-8 md:px-16">
              <h3 className="text-4xl md:text-5xl font-light italic mb-16 text-center">Experiencias {brand.title}</h3>
              <div className="grid lg:grid-cols-3 gap-8">
                {dynamicTours.map((tour: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                    className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-blackout/5 flex flex-col group"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image src={tour.image} alt={tour.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 1024px) 100vw, 33vw" unoptimized />
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <h4 className="text-2xl text-blackout font-light mb-8 text-center">{tour.title}</h4>

                      <div className="flex justify-between items-center mb-8 px-4">
                        <div className="text-center">
                          <span className="text-[10px] uppercase tracking-[0.5em] block text-blackout/80 mb-2 font-bold">Duracao</span>
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
                              <span className="font-medium">Crianca</span>
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

                      <button
                        onClick={() => router.push(`/reservar?tour=${encodeURIComponent(tour.title)}`)}
                        className={`w-full py-4 rounded-full ${brand.color} ${brand.textColor} text-[10px] uppercase tracking-[0.5em] font-bold hover:scale-[1.02] hover:shadow-lg transition-all duration-300`}
                      >
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
        {brand.faqs && (
          <div className="py-24 bg-[#F9FAF9]">
            <div className="max-w-3xl mx-auto px-8 md:px-16">
              <div className="space-y-4">
                <h2 className="text-4xl font-light italic mb-12 text-center text-blackout">FAQ&apos;s</h2>
                {brand.faqs.map((faq: any, idx: number) => (
                  <FaqItem key={idx} question={faq.q} answer={faq.a} brandColor={brand.color} brandTextColor={brand.textColor} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
