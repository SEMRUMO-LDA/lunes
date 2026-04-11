"use client";

import { motion, useScroll, useSpring, useMotionValue, useTransform, AnimatePresence, useAnimationFrame } from "motion/react";
import { ArrowRight, Mail, ArrowUp, Phone } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
const ContactForm = dynamic(() => import("@/src/ContactForm"), { ssr: false });
import Footer from "@/src/components/Footer";
import MobileMenu from "@/src/components/MobileMenu";
import { useTestimonials } from "@/src/hooks/useTestimonials";
import { useTranslation } from "@/src/hooks/useTranslation";
import { SUB_BRANDS } from "@/src/data/brands";

// Custom Social Icons
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

// Fixed particle positions to avoid SSR/client hydration mismatch
const PARTICLES = [
  { size: 1, speed: 22, x: 12, y: 45, twinkle: 3, delay: 2 },
  { size: 2, speed: 18, x: 78, y: 23, twinkle: 4, delay: 5 },
  { size: 1, speed: 30, x: 34, y: 67, twinkle: 2, delay: 1 },
  { size: 2, speed: 25, x: 56, y: 12, twinkle: 5, delay: 8 },
  { size: 1, speed: 20, x: 91, y: 78, twinkle: 3, delay: 3 },
  { size: 1, speed: 28, x: 45, y: 34, twinkle: 4, delay: 6 },
  { size: 2, speed: 16, x: 67, y: 56, twinkle: 2, delay: 0 },
  { size: 1, speed: 35, x: 23, y: 89, twinkle: 3, delay: 4 },
  { size: 1, speed: 22, x: 89, y: 45, twinkle: 5, delay: 7 },
  { size: 2, speed: 19, x: 8, y: 67, twinkle: 3, delay: 9 },
  { size: 1, speed: 26, x: 52, y: 15, twinkle: 4, delay: 2 },
  { size: 1, speed: 32, x: 73, y: 82, twinkle: 2, delay: 5 },
  { size: 2, speed: 21, x: 18, y: 38, twinkle: 3, delay: 1 },
  { size: 1, speed: 27, x: 95, y: 52, twinkle: 5, delay: 8 },
  { size: 1, speed: 17, x: 41, y: 71, twinkle: 4, delay: 3 },
  { size: 2, speed: 24, x: 63, y: 28, twinkle: 2, delay: 6 },
  { size: 1, speed: 29, x: 5, y: 93, twinkle: 3, delay: 0 },
  { size: 1, speed: 23, x: 82, y: 16, twinkle: 5, delay: 4 },
  { size: 2, speed: 31, x: 37, y: 61, twinkle: 4, delay: 7 },
  { size: 1, speed: 18, x: 59, y: 43, twinkle: 2, delay: 9 },
  { size: 1, speed: 33, x: 14, y: 75, twinkle: 3, delay: 2 },
  { size: 2, speed: 20, x: 86, y: 31, twinkle: 5, delay: 5 },
  { size: 1, speed: 25, x: 48, y: 88, twinkle: 4, delay: 1 },
  { size: 1, speed: 28, x: 71, y: 9, twinkle: 2, delay: 8 },
  { size: 2, speed: 16, x: 26, y: 54, twinkle: 3, delay: 3 },
  { size: 1, speed: 34, x: 93, y: 66, twinkle: 5, delay: 6 },
  { size: 1, speed: 22, x: 38, y: 21, twinkle: 4, delay: 0 },
  { size: 2, speed: 19, x: 65, y: 79, twinkle: 2, delay: 4 },
  { size: 1, speed: 27, x: 11, y: 47, twinkle: 3, delay: 7 },
  { size: 1, speed: 30, x: 79, y: 35, twinkle: 5, delay: 9 },
];

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

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Interactive Logic
  const rotationValue = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Pre-compute transforms (hooks must be called unconditionally)
  const aura1X = useTransform(smoothMouseX, (v) => v * -1.5);
  const aura1Y = useTransform(smoothMouseY, (v) => v * -1.5);
  const aura2X = useTransform(smoothMouseX, (v) => v * 0.8);
  const aura2Y = useTransform(smoothMouseY, (v) => v * 0.8);

  const router = useRouter();

  const [hoveredBrand, setHoveredBrand] = useState<typeof SUB_BRANDS[0] | null>(null);
  const activeEffectBrand = hoveredBrand;
  const [isScrolled, setIsScrolled] = useState(false);
  const { testimonials } = useTestimonials();
  const { t } = useTranslation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>('hero');
  const [showContactForm, setShowContactForm] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : true
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);



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

  // Scroll tracking for header and scroll-to-top button (throttled)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const sy = window.scrollY;
        setIsScrolled(sy > 50);
        setShowScrollTop(sy > 500);

        if (!isMobile) {
          const scrollPosition = sy + window.innerHeight / 2;
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
              const elementTop = rect.top + sy;
              if (scrollPosition >= elementTop && scrollPosition < elementTop + rect.height) {
                setCurrentSection(section.id);
                break;
              }
            }
          }
        }
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Mouse tracking for parallax effects (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      outerX.set(e.clientX);
      outerY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, mouseX, mouseY, cursorX, cursorY, outerX, outerY]);

  useEffect(() => {
    if (showContactForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showContactForm]);

  // Auto-rotation effect (desktop only)
  useAnimationFrame((time) => {
    if (!isMobile) rotationValue.set(time * 0.01);
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen selection:bg-blackout selection:text-coconut" ref={containerRef}>

      {/* Custom cursor removed — using default browser cursor */}

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full px-8 transition-all duration-500 flex justify-between items-center text-coconut ${
        "z-50"
      } ${
        isScrolled
          ? "bg-blackout/95 backdrop-blur-sm py-4 border-b border-coconut/10 shadow-lg"
          : "py-6 mix-blend-difference"
      }`}>
        <div className="flex items-center cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <LunesLogo className="h-6 md:h-7 w-auto group-hover:drop-shadow-[0_0_10px_rgba(251,249,249,0.6)] transition-all duration-300" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-[10px] uppercase tracking-[0.5em] font-sans font-bold">
          <button
            onClick={() => scrollToSection('about')}
            className="hover:text-blackout hover:bg-coconut hover:shadow-[0_0_20px_rgba(251,249,249,0.4)] transition-all duration-300 px-4 py-1.5 rounded-full flex items-center h-full"
          >
            {t('nav.about', 'SOBRE')}
          </button>
          <button
            onClick={() => router.push('/move')}
            onMouseEnter={() => setHoveredBrand(SUB_BRANDS.find(b => b.id === 'move') || null)}
            onMouseLeave={() => setHoveredBrand(null)}
            className="hover:text-move-leaf hover:bg-move-citrus hover:shadow-[0_0_25px_rgba(195,234,79,0.5)] transition-all duration-300 px-4 py-1.5 rounded-full flex items-center"
          >
            MOVE
          </button>
          <button
            onClick={() => router.push('/explore')}
            onMouseEnter={() => setHoveredBrand(SUB_BRANDS.find(b => b.id === 'explore') || null)}
            onMouseLeave={() => setHoveredBrand(null)}
            className="hover:text-explore-blue hover:bg-explore-cyan hover:shadow-[0_0_25px_rgba(208,239,239,0.5)] transition-all duration-300 px-4 py-1.5 rounded-full flex items-center"
          >
            EXPLORE
          </button>
          <button
            onClick={() => router.push('/feel')}
            onMouseEnter={() => setHoveredBrand(SUB_BRANDS.find(b => b.id === 'feel') || null)}
            onMouseLeave={() => setHoveredBrand(null)}
            className="hover:text-feel-sage hover:bg-feel-athletics hover:shadow-[0_0_25px_rgba(234,234,203,0.5)] transition-all duration-300 px-4 py-1.5 rounded-full flex items-center"
          >
            FEEL
          </button>
          <button
            onClick={() => router.push('/stay')}
            onMouseEnter={() => setHoveredBrand(SUB_BRANDS.find(b => b.id === 'stay') || null)}
            onMouseLeave={() => setHoveredBrand(null)}
            className="hover:text-stay-pink hover:bg-stay-creame hover:shadow-[0_0_25px_rgba(247,234,223,0.5)] transition-all duration-300 px-4 py-1.5 rounded-full flex items-center"
          >
            STAY
          </button>
        </div>
        <button
          onClick={() => setShowContactForm(true)}
          className="hidden md:block border border-white/20 rounded-full px-8 py-2.5 text-[10px] uppercase tracking-[0.5em] font-sans font-bold hover:bg-white hover:text-blackout transition-all duration-300 bg-white/5 backdrop-blur-md hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          {t('nav.contact', 'CONTACTO')}
        </button>

        {/* Mobile Hamburger Menu */}
        <MobileMenu onContactClick={() => setShowContactForm(true)} lineColor="bg-coconut" />
      </nav>

      <div>
        {/* Hero Section */}
        <section className="relative h-screen flex flex-col items-center justify-center bg-blackout text-coconut overflow-hidden select-none">
          {/* Mobile Background Image */}
          {isMobile && (
            <div className="absolute inset-0 z-0">
              <img
                src="/images/tours/explore-services-3.webp"
                alt=""
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-blackout/50" />
            </div>
          )}

          {/* YouTube Background Video (desktop only) */}
          {!isMobile && (
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115vw] h-[115vh] min-w-[177.77vh] min-h-[56.25vw]">
                <iframe
                  src="https://www.youtube.com/embed/5ZBRAddjwwU?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&autohide=1&modestbranding=1&playlist=5ZBRAddjwwU&rel=0&enablejsapi=1"
                  className="w-full h-full pointer-events-none opacity-30 contrast-125 scale-110"
                  allow="autoplay; encrypted-media"
                  loading="lazy"
                  title="Lunes Background Video"
                />
              </div>
              <div className="absolute inset-0 bg-blackout/40" />
            </div>
          )}

          {/* Grainy Cinematic Overlay (desktop only) */}
          {!isMobile && (
            <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22300%22%20height%3D%22300%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%22.65%22%20numOctaves%3D%223%22/%3E%3C/filter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22/%3E%3C/svg%3E')]" />
          )}

          {/* Atmospheric Background (desktop only) */}
          {!isMobile && (
            <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
              <motion.div
                style={{
                  x: aura1X,
                  y: aura1Y,
                }}
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 90, 180, 270, 360],
                  opacity: activeEffectBrand ? 0.4 : 0.15,
                }}
                transition={{
                  scale: { duration: 20, repeat: Infinity, ease: "linear" },
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                }}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] h-[110vw] rounded-full blur-[100px] transition-colors duration-1000 will-change-transform ${activeEffectBrand ? activeEffectBrand.color : 'bg-coconut/10'}`}
              />
              <motion.div
                style={{
                  x: aura2X,
                  y: aura2Y,
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
              {PARTICLES.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ x: p.x + "vw", y: p.y + "vh", opacity: 0 }}
                  style={{ width: p.size + "px", height: p.size + "px", filter: p.size > 1.5 ? 'blur(0.5px)' : 'none' }}
                  animate={{ y: [null, -300], opacity: [0, 0.6, 0.2, 0.6, 0] }}
                  transition={{
                    y: { duration: p.speed, repeat: Infinity, ease: "linear", delay: p.delay },
                    opacity: { duration: p.twinkle, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.5, 0.8, 1] },
                  }}
                  className={`absolute rounded-full shadow-[0_0_8px_rgba(251,249,249,0.4)] will-change-transform transition-colors duration-1000 ${activeEffectBrand ? activeEffectBrand.color + ' ' + activeEffectBrand.accentShadow : 'bg-coconut'}`}
                />
              ))}
            </div>
          )}

          {/* Content Container */}
          <div className="relative z-30 flex flex-col items-center gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center pointer-events-none"
            >
              <h1 className="text-[12vw] md:text-[10vw] leading-none mb-6 italic tracking-tighter font-serif drop-shadow-2xl">
                Time to be You.
              </h1>
              <div className="flex items-center justify-center gap-4 opacity-100 mt-4">
                <p className="text-[10px] uppercase tracking-[0.5em] font-sans font-medium font-sans text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  {t('hero.tagline', 'O TEU MOMENTO. O TEU TEMPO.')}
                </p>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              onClick={() => scrollToSection('ecosystem')}
              className="group flex flex-col items-center gap-4 cursor-pointer pointer-events-auto"
            >
              <div className="w-[1.5px] h-24 bg-gradient-to-b from-coconut/0 via-coconut/100 to-coconut/0 shadow-[0_0_15px_rgba(251,249,249,0.6)] group-hover:shadow-[0_0_25px_rgba(251,249,249,0.8)] transition-all duration-300" />
              <span className="text-[10px] uppercase tracking-[0.5em] font-sans opacity-40 group-hover:opacity-100 transition-all duration-300 group-hover:text-coconut group-hover:drop-shadow-[0_0_12px_rgba(251,249,249,0.8)]">{t('hero.discover', 'Descobrir')}</span>
            </motion.button>
          </div>

          <motion.div
            style={{ rotate: scrollYProgress }}
            className="absolute w-[80vw] h-[80vw] border border-coconut/5 rounded-full -bottom-[40vw] z-0"
          />
        </section>

        <section id="ecosystem" className="py-32 px-8 overflow-hidden" style={{ backgroundColor: '#FBF9F9' }}>
          <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 relative">
                <div className="space-y-4">
                  <h2 className="text-5xl md:text-8xl italic leading-none tracking-tighter">{t('ecosystem.title', 'O Nosso Ecossistema')}</h2>
                  <p className="text-blackout/40 max-w-md uppercase tracking-[0.5em] text-[10px] font-bold font-sans">{t('ecosystem.subtitle', 'Quatro pilares, uma única essência.')}</p>
                </div>

                {/* Rotating Badge */}
                <div className="absolute -right-8 -bottom-16 md:-bottom-24 z-0 pointer-events-none">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="w-52 h-52 md:w-64 md:h-64 opacity-15 md:opacity-10"
                  >
                    <img
                      src="/images/brand/LUNES badge preto.png"
                      alt=""
                      loading="lazy"
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
                  onClick={() => router.push(`/${brand.id}`)}
                  className={`group relative h-[500px] md:h-[600px] lg:h-[650px] rounded-[2rem] overflow-hidden cursor-pointer transition-colors duration-1000 ${brand.color}`}
                  transition={cardTransition}
                >
                  {/* Background Image */}
                  <img
                    src={brand.image}
                    alt={brand.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-100 md:opacity-0 md:group-hover:opacity-100 grayscale-[0.3] md:group-hover:grayscale-0 md:group-hover:scale-110 transition-all duration-[2000ms] ease-out"
                  />

                  {/* Overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-blackout/80 via-blackout/30 to-transparent md:opacity-0 md:group-hover:opacity-80 transition-opacity duration-1000"
                  />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 transition-colors duration-1000">
                    <div className="flex justify-between items-start">
                      <motion.div
                        variants={{
                          hover: { scale: 1.1, rotate: -5, transition: { type: "spring", stiffness: 400 } }
                        }}
                        className={`p-3 rounded-xl transition-colors duration-1000 shadow-2xl text-white md:${brand.textColor} bg-white/30 md:group-hover:bg-opacity-80`}
                      >
                        {brand.icon}
                      </motion.div>
                      <span className="text-[10px] font-mono tracking-[0.4em] text-white/40 md:text-blackout/20 md:group-hover:!text-white/40 transition-colors duration-1000">0{idx + 1}</span>
                    </div>

                    <div className="space-y-1 [&_*]:!text-white md:[&_*]:!text-[unset]">
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className={`text-[10px] uppercase tracking-[0.5em] font-sans font-bold mb-2 transition-colors duration-500 ${brand.textColor} opacity-60 group-hover:!text-white/60 group-hover:opacity-100`}
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
                        className="flex items-center gap-4 pt-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 md:translate-y-4 md:group-hover:translate-y-0"
                      >
                        <div className={`h-[1px] w-8 transition-colors duration-500 ${brand.textColor} bg-current group-hover:bg-white`} />
                        <span className={`text-[10px] uppercase tracking-[0.5em] font-sans transition-colors duration-500 ${brand.textColor} group-hover:!text-white/80`}>{t('ecosystem.discover', 'Descobrir')}</span>
                        <ArrowRight className={`w-3 h-3 -rotate-45 transition-colors duration-500 ${brand.textColor} group-hover:!text-white`} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="bg-white py-32 px-8">
          <div className="max-w-7xl mx-auto space-y-16">
            {/* Main Header */}
            <h2 className="text-5xl md:text-7xl leading-[0.9] tracking-tighter italic">
              {t('about.title', 'A luz que abranda o tempo e devolve clareza.')}
            </h2>

            {/* 3-Column Grid */}
            <div className="grid lg:grid-cols-3 gap-16 md:gap-20 items-start">
              {/* Column 1: Photo */}
              <div className="relative px-8 md:px-0">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl"
                >
                  <img
                    src="/images/misc/lunes-home-about-1.webp"
                    alt="Manifesto LUNES"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              {/* Columns 2 & 3: Brand Story */}
              <div className="lg:col-span-2 space-y-12">
                <div className="space-y-4">
                  <p className="text-xl md:text-2xl font-serif italic text-blackout">{t('about.greeting', 'Olá, somos a Luísa e o Francisco.')}</p>

                  <div className="grid md:grid-cols-2 gap-12 text-base md:text-lg text-blackout/70 leading-relaxed font-normal font-sans">
                    {/* Text Column 1 */}
                    <div className="space-y-6">
                      <p>
                        {t('about.text1', 'A nossa história começou de forma inesperada: de cliente e treinador, transformámo-nos num casal unido por sonhos e cuidado mútuo. Crescemos, curamos e fortalecemo-nos juntos.')}
                      </p>
                      <p>
                        {t('about.text2', 'É esta parceria de amor e confiança que dá vida à Lunes -- um projeto que carrega a nossa identidade até na fusão dos nossos apelidos,')} <span className="font-semibold uppercase tracking-widest text-[10px] text-blackout border-b border-blackout/20 pb-0.5">Luz e Nunes.</span> {t('about.text2b', 'Mais do que a materialização de um sonho, é a vontade de criar um espaço onde cada momento se torna inesquecível.')}
                      </p>
                    </div>

                    {/* Text Column 2 */}
                    <div className="space-y-6">
                      <p>
                        {t('about.text3', 'Acreditamos que o tempo deixou de ser uma imposição. Aqui, o tempo não pressiona; ele acolhe. Convidamo-lo a viver ao seu próprio ritmo, no seu tempo -- finalmente seu.')}
                      </p>
                      <p>
                        {t('about.text4', 'A Lunes divide-se em quatro pilares inspirados nos ciclos da natureza:')} <span className="italic font-medium text-blackout text-sm uppercase tracking-wider">Move, Explore, Feel e Stay</span>. {t('about.text4b', 'Quatro formas de regressar ao essencial.')}
                      </p>
                      <p className="font-medium italic text-blackout leading-tight">
                        {t('about.text5', 'Mais do que serviços, criamos viagens de fora para dentro.')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-32 bg-coconut">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-12 md:mb-24 space-y-4">
              <h2 className="text-4xl md:text-7xl italic tracking-tight">{t('testimonials.title', 'Vozes da Comunidade')}</h2>
              <p className="text-[10px] uppercase tracking-[0.5em] font-sans font-bold opacity-40">{t('testimonials.subtitle', 'O que dizem sobre a experiência LUNES')}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-12">
              {testimonials.map((tm, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.8 }}
                  className="bg-white p-12 rounded-[3rem] shadow-sm hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="mb-8">
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">
                      {tm.image ? (
                        <img
                          src={tm.image}
                          alt={`Testemunho de ${tm.name}`}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full bg-blackout/10 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-blackout/30">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-serif italic">{tm.name}</h3>
                    <p className="text-[10px] uppercase tracking-[0.5em] font-sans font-bold opacity-40">{tm.role}</p>
                  </div>
                  <p className="text-lg leading-relaxed text-blackout/70 font-light italic">
                    &quot;{tm.quote}&quot;
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer onContactClick={() => setShowContactForm(true)} />
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="fixed bottom-6 right-6 z-[110] w-10 h-10 flex items-center justify-center rounded-full shadow-lg bg-blackout text-coconut border border-coconut/10 transition-all duration-300 group"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ContactForm -- state-driven overlay */}
      <AnimatePresence>
        {showContactForm && (
          <ContactForm onClose={() => setShowContactForm(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
