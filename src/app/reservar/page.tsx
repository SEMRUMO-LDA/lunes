"use client";

import { Suspense, useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ArrowLeft,
  Clock,
  Users,
  Plus,
  Minus,
  Check,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTours } from "@/src/hooks/useTours";
import {
  checkAvailability,
  createBooking,
  type TimeSlot,
  type CreateBookingPayload,
} from "@/src/hooks/useBooking";

// ── Constants ──────────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const;
const STEP_LABELS = ["Experiencia", "Data & Hora", "Passageiros", "Resumo"];
const WEEKDAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];

// ── Logo ───────────────────────────────────────────────────────────────

const LunesLogo = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 1501 293"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    className={className}
  >
    <g transform="matrix(2,0,0,2,35.718,284.219664)">
      <path
        d="M0,-138.874C0,-95.038 -0.006,-53.758 -0.006,-10.005C-0.006,-9.433 0.469,-8.962 1.041,-8.962C22.699,-8.962 40.033,-8.961 60.187,-8.961C61.063,-8.961 61.788,-8.245 61.788,-7.369L61.788,0.009C61.788,0.87 61.09,1.568 60.229,1.568L-16.292,1.567C-17.154,1.567 -17.859,0.861 -17.859,-0.001L-17.859,-138.88C-17.859,-139.738 -17.157,-140.442 -16.299,-140.442L-1.563,-140.442C-0.703,-140.442 0,-139.734 0,-138.874"
        fill="currentColor"
        fillRule="nonzero"
      />
    </g>
    <g transform="matrix(2,0,0,2,374.2436,7.107064)">
      <path
        d="M0,142.258C-31.907,142.519 -52.186,123.675 -51.975,91.743C-52.14,60.386 -51.463,30.265 -51.949,-0.199C-51.963,-1.068 -51.265,-1.78 -50.395,-1.78L-36.498,-1.78C-35.635,-1.78 -34.938,-1.078 -34.941,-0.215C-35.069,30.324 -34.773,60.597 -34.935,91.946C-35.118,108.899 -27.787,125.521 -11.929,132.216C17.727,144.038 39.782,124.44 39.782,93.93C39.782,60.386 39.265,30.51 39.244,-0.212C39.243,-1.074 39.942,-1.78 40.803,-1.78L49.047,-1.78C49.907,-1.78 50.605,-1.082 50.605,-0.221L50.605,94.227C50.677,126.532 32.337,142.259 0,142.258"
        fill="currentColor"
        fillRule="nonzero"
      />
    </g>
    <g transform="matrix(2,0,0,2,849.697,287.563464)">
      <path
        d="M0,-142.211L-5.999,-142.211C-6.847,-142.211 -7.535,-141.528 -7.535,-140.679C-7.535,-125.921 -7.413,-84.203 -7.306,-55.896C-7.304,-55.425 -7.141,-54.973 -6.844,-54.608L-0.732,-47.088C0.033,-46.146 1.557,-46.687 1.557,-47.9L1.557,-140.655C1.557,-141.514 0.86,-142.211 0,-142.211M-97.238,-141.402C-97.532,-141.783 -97.99,-142.01 -98.475,-142.01L-109.994,-142.01C-110.853,-142.01 -111.55,-141.313 -111.55,-140.453L-111.55,-133.169C-111.55,-132.583 -111.351,-132.015 -110.985,-131.558L-97.192,-114.334C-66.758,-76.875 -36.706,-38.85 -7.427,-0.609C-7.133,-0.222 -6.679,0 -6.195,0L0,0C0.86,0 1.557,-0.697 1.557,-1.557L1.557,-17.582C1.557,-18.174 1.353,-18.748 0.979,-19.208C0.979,-19.208 -73.401,-110.376 -97.238,-141.402M-103.424,-96.095L-109.256,-103.381C-110.017,-104.331 -111.55,-103.793 -111.55,-102.576L-111.55,-1.557C-111.55,-0.697 -110.853,0 -109.994,0L-104.041,0C-103.175,0 -102.474,-0.706 -102.485,-1.572C-102.776,-32.793 -102.895,-63.373 -102.973,-94.81C-102.974,-95.277 -103.133,-95.731 -103.424,-96.095"
        fill="currentColor"
        fillRule="nonzero"
      />
    </g>
    <g transform="matrix(2,0,0,2,1024.6302,287.566864)">
      <path
        d="M0,-142.01L76.551,-142.01C77.412,-142.01 78.11,-141.312 78.11,-140.451L78.11,-133.334C78.11,-132.473 77.404,-131.774 76.543,-131.775C56.138,-131.776 37.909,-131.921 16.133,-131.923C15.561,-131.923 15.086,-131.457 15.086,-130.885C15.09,-112.895 15.296,-94.577 15.07,-76.255C15.063,-75.677 15.529,-75.205 16.106,-75.205L54.518,-75.205C55.381,-75.205 56.079,-74.505 56.077,-73.642L56.061,-68.276C56.061,-67.7 55.592,-67.234 55.016,-67.237L15.884,-67.49C15.31,-67.493 14.842,-67.023 14.839,-66.448C14.742,-46.893 14.415,-31.043 14.817,-11.507C14.829,-10.947 15.297,-10.48 15.858,-10.48C38.035,-10.485 56.23,-10.807 76.66,-10.836C77.522,-10.837 78.214,-10.138 78.214,-9.276L78.214,-1.559C78.214,-0.698 77.516,0 76.655,0L0,0C-0.861,0 -1.559,-0.698 -1.559,-1.559L-1.559,-140.451C-1.559,-141.312 -0.861,-142.01 0,-142.01"
        fill="currentColor"
        fillRule="nonzero"
      />
    </g>
    <g transform="matrix(2,0,0,2,1445.29,-3.603936)">
      <path
        d="M0,145.079C-24.814,153.849 -61.37,143.105 -67.168,115.038C-67.324,114.29 -66.888,113.542 -66.171,113.282L-56.839,109.915C-55.935,109.583 -54.948,110.144 -54.782,111.079C-47.934,149.672 8.458,151.688 10.391,116.129C10.921,106.393 6.952,96.864 -0.218,90.245C-18.673,73.162 -52.828,66.46 -57.858,41.916C-58.595,38.3 -58.543,34.559 -57.837,30.943C-51.002,-3.691 6.365,-8.77 22.026,22.822C22.482,23.74 22.862,24.695 23.227,25.653C23.404,26.12 23.57,26.559 23.632,26.733C24.962,30.224 25.479,32.907 25.926,34.84C26.082,35.546 25.739,36.263 25.084,36.585L16.044,41.002C15.14,41.438 14.07,40.918 13.841,39.942C13.363,37.936 12.313,34.32 9.996,28.792C4.073,16.188 -3.2,7.875 -17.571,8.238C-38.78,8.779 -49.399,32.574 -34.613,46.893C-20.304,60.724 4.344,68.216 17.571,83.408C36.909,103.005 25.77,137.597 0,145.079"
        fill="currentColor"
        fillRule="nonzero"
      />
    </g>
  </svg>
);

// ── Helpers ────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function formatDateDisplay(date: Date): string {
  return date.toLocaleDateString("pt-PT", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

/** Parse "40€" or "40" into a number. Returns 0 if unparseable. */
function parsePrice(raw: string | number | undefined): number {
  if (typeof raw === "number") return raw;
  if (!raw) return 0;
  const n = parseFloat(raw.replace(/[^\d.,]/g, "").replace(",", "."));
  return isNaN(n) ? 0 : n;
}

// ── Calendar helpers ───────────────────────────────────────────────────

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  // Mon=0 ... Sun=6
  let startWeekday = firstDay.getDay() - 1;
  if (startWeekday < 0) startWeekday = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  // pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

// ── Component ──────────────────────────────────────────────────────────

export default function ReservarPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-coconut flex items-center justify-center"><p className="text-blackout/40 text-sm uppercase tracking-widest">A carregar...</p></div>}>
      <ReservarPage />
    </Suspense>
  );
}

function ReservarPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tourParam = searchParams.get("tour");

  const { tours: rawTours, loading: toursLoading } = useTours();

  // ─── State ─────────────────────────────────────────────────────────

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 forward, -1 back

  // Step 1
  const [selectedTourIdx, setSelectedTourIdx] = useState<number | null>(null);

  // Step 2
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlotIdx, setSelectedSlotIdx] = useState<number | null>(null);

  // Step 3
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formNotes, setFormNotes] = useState("");

  // Step 4
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // ─── Derived ───────────────────────────────────────────────────────

  const tours = rawTours as any[];
  const selectedTour = selectedTourIdx !== null ? tours[selectedTourIdx] : null;

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const adultPrice = selectedTour ? parsePrice(selectedTour.priceAdult || selectedTour.priceTotal) : 0;
  const childPrice = selectedTour ? parsePrice(selectedTour.priceChild) : 0;
  const totalPrice = adults * adultPrice + children * childPrice;

  const selectedSlot = selectedSlotIdx !== null ? slots[selectedSlotIdx] : null;
  const maxAvailable = selectedSlot?.available ?? 99;

  // ─── Auto-select tour from query param ─────────────────────────────

  useEffect(() => {
    if (!tourParam || toursLoading || tours.length === 0) return;
    const paramSlug = slugify(tourParam);
    const idx = tours.findIndex(
      (t: any) => slugify(t.title) === paramSlug || t.title === tourParam,
    );
    if (idx >= 0) {
      setSelectedTourIdx(idx);
      setStep(2);
    }
  }, [tourParam, toursLoading, tours]);

  // ─── Fetch availability ────────────────────────────────────────────

  useEffect(() => {
    if (!selectedTour || !selectedDate) return;
    let cancelled = false;
    setSlotsLoading(true);
    setSlots([]);
    setSelectedSlotIdx(null);

    checkAvailability(slugify(selectedTour.title), formatDate(selectedDate))
      .then((data) => {
        if (!cancelled) setSlots(data.slots || []);
      })
      .catch(() => {
        // API unavailable — show placeholder slots
        if (!cancelled) {
          setSlots([
            { time: "09:00", available: 12 },
            { time: "11:30", available: 8 },
            { time: "14:00", available: 15 },
            { time: "16:30", available: 6 },
          ]);
        }
      })
      .finally(() => {
        if (!cancelled) setSlotsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedTour, selectedDate]);

  // ─── Navigation ────────────────────────────────────────────────────

  const goNext = useCallback(() => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, 4));
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  // ─── Submit booking ────────────────────────────────────────────────

  const handleSubmit = async () => {
    if (!selectedTour || !selectedDate || !selectedSlot) return;
    setSubmitting(true);
    setSubmitError("");

    const payload: CreateBookingPayload = {
      tour: slugify(selectedTour.title),
      date: formatDate(selectedDate),
      time: selectedSlot.time,
      adults,
      children,
      name: formName,
      email: formEmail,
      phone: formPhone,
      notes: formNotes || undefined,
    };

    try {
      const result = await createBooking(payload);
      if (result.checkout_url) {
        window.location.href = result.checkout_url;
      } else {
        router.push(`/reservar/confirmacao?booking_id=${result.booking_id}`);
      }
    } catch (err: any) {
      setSubmitError(err.message || "Erro ao processar reserva. Tente novamente.");
      setSubmitting(false);
    }
  };

  // ─── Calendar ──────────────────────────────────────────────────────

  const calendarDays = useMemo(
    () => getCalendarDays(calendarMonth.year, calendarMonth.month),
    [calendarMonth],
  );

  const monthLabel = new Date(calendarMonth.year, calendarMonth.month).toLocaleDateString("pt-PT", {
    month: "long",
    year: "numeric",
  });

  const prevMonth = () =>
    setCalendarMonth((m) => {
      const d = new Date(m.year, m.month - 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });

  const nextMonth = () =>
    setCalendarMonth((m) => {
      const d = new Date(m.year, m.month + 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });

  // ─── Step validation ───────────────────────────────────────────────

  const canProceed = (() => {
    switch (step) {
      case 1:
        return selectedTourIdx !== null;
      case 2:
        return selectedDate !== null && selectedSlotIdx !== null;
      case 3:
        return (
          adults >= 1 &&
          adults + children <= maxAvailable &&
          formName.trim().length > 0 &&
          formEmail.trim().length > 0 &&
          formPhone.trim().length > 0
        );
      case 4:
        return termsAccepted;
      default:
        return false;
    }
  })();

  // ─── Animation variants ────────────────────────────────────────────

  const stepVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      filter: "blur(8px)",
    }),
    center: { x: 0, opacity: 1, filter: "blur(0px)" },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      filter: "blur(8px)",
    }),
  };

  // ─── Render ────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-coconut text-blackout font-sans">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto w-full px-6 md:px-12 py-6 flex justify-between items-center">
        <div
          onClick={() => router.push("/")}
          className="cursor-pointer hover:opacity-60 transition-opacity"
        >
          <LunesLogo className="h-6 w-auto text-blackout" />
        </div>
        <button
          onClick={() => router.push("/")}
          className="p-3 hover:bg-blackout/5 rounded-full transition-all duration-300 group -mr-3"
        >
          <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </header>

      {/* ── Step indicator ─────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-6 md:px-12 pt-4 pb-8">
        <div className="flex items-center justify-between">
          {STEP_LABELS.map((label, i) => {
            const stepNum = i + 1;
            const isActive = stepNum === step;
            const isDone = stepNum < step;
            return (
              <div key={label} className="flex items-center gap-2 flex-1 last:flex-initial">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                      isDone
                        ? "bg-explore-cyan text-explore-blue"
                        : isActive
                          ? "bg-blackout text-coconut"
                          : "bg-blackout/5 text-blackout/30"
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : stepNum}
                  </div>
                  <span
                    className={`text-[9px] uppercase tracking-[0.3em] font-bold hidden sm:block transition-opacity ${
                      isActive || isDone ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < STEP_LABELS.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-2 transition-colors duration-500 ${
                      isDone ? "bg-explore-cyan" : "bg-blackout/10"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 md:px-12 pb-32">
        <AnimatePresence mode="wait" custom={direction}>
          {/* ───── Step 1: Tour Selection ──────────────────────────── */}
          {step === 1 && (
            <motion.div
              key="step-1"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: EASE }}
            >
              <h2 className="text-4xl md:text-5xl italic mb-2 text-center">
                Escolha a experiencia
              </h2>
              <p className="text-center text-blackout/50 text-sm mb-12">
                Selecione o passeio que pretende reservar
              </p>

              {toursLoading ? (
                <div className="flex justify-center py-24">
                  <Loader2 className="w-8 h-8 animate-spin text-explore-blue" />
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tours.map((tour: any, idx: number) => {
                    const isSelected = selectedTourIdx === idx;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08, duration: 0.6, ease: EASE }}
                        onClick={() => {
                          setSelectedTourIdx(idx);
                          setTimeout(goNext, 300);
                        }}
                        className={`group bg-white rounded-[2rem] overflow-hidden border transition-all duration-300 hover:shadow-xl cursor-pointer ${
                          isSelected
                            ? "border-explore-cyan shadow-xl ring-2 ring-explore-cyan/30"
                            : "border-blackout/5 shadow-sm"
                        }`}
                      >
                        <div className="relative h-44 overflow-hidden">
                          <Image
                            src={tour.image}
                            alt={tour.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            unoptimized
                          />
                          {isSelected && (
                            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-explore-cyan flex items-center justify-center">
                              <Check className="w-4 h-4 text-explore-blue" />
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-light text-blackout mb-3">
                            {tour.title}
                          </h3>
                          <div className="flex items-center justify-between text-sm text-blackout/60">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-explore-blue" />
                              <span>{tour.duration}</span>
                            </div>
                            <span className="font-bold text-blackout">
                              {tour.priceAdult || tour.priceTotal}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* ───── Step 2: Date & Time ─────────────────────────────── */}
          {step === 2 && (
            <motion.div
              key="step-2"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: EASE }}
            >
              <h2 className="text-4xl md:text-5xl italic mb-2 text-center">
                Data & Horario
              </h2>
              <p className="text-center text-blackout/50 text-sm mb-12">
                {selectedTour?.title}
              </p>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Calendar */}
                <div className="bg-white rounded-[2rem] border border-blackout/5 p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={prevMonth}
                      className="p-2 hover:bg-blackout/5 rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm font-bold uppercase tracking-[0.3em] capitalize">
                      {monthLabel}
                    </span>
                    <button
                      onClick={nextMonth}
                      className="p-2 hover:bg-blackout/5 rounded-full transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Weekday headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {WEEKDAYS.map((wd) => (
                      <div
                        key={wd}
                        className="text-center text-[10px] uppercase tracking-[0.2em] font-bold text-blackout/30 py-2"
                      >
                        {wd}
                      </div>
                    ))}
                  </div>

                  {/* Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, i) => {
                      if (!day)
                        return <div key={`empty-${i}`} className="aspect-square" />;

                      const isPast = day < today;
                      const isSelected =
                        selectedDate && formatDate(day) === formatDate(selectedDate);

                      return (
                        <button
                          key={formatDate(day)}
                          disabled={isPast}
                          onClick={() => {
                            setSelectedDate(day);
                            setSelectedSlotIdx(null);
                          }}
                          className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                            isPast
                              ? "text-blackout/15 cursor-not-allowed"
                              : isSelected
                                ? "bg-explore-cyan text-explore-blue font-bold shadow-md"
                                : "hover:bg-explore-cyan/30 text-blackout/70"
                          }`}
                        >
                          {day.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time slots */}
                <div className="bg-white rounded-[2rem] border border-blackout/5 p-6 md:p-8">
                  <h3 className="text-[10px] uppercase tracking-[0.5em] font-bold text-blackout/40 mb-6">
                    Horarios disponiveis
                  </h3>

                  {!selectedDate ? (
                    <div className="flex flex-col items-center justify-center py-16 text-blackout/30">
                      <Clock className="w-10 h-10 mb-4 opacity-40" />
                      <p className="text-sm">Selecione uma data primeiro</p>
                    </div>
                  ) : slotsLoading ? (
                    <div className="flex justify-center py-16">
                      <Loader2 className="w-8 h-8 animate-spin text-explore-blue" />
                    </div>
                  ) : slots.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-blackout/30">
                      <p className="text-sm">Sem horarios para esta data</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {slots.map((slot, idx) => {
                        const isSoldOut = slot.available <= 0;
                        const isSelected = selectedSlotIdx === idx;
                        return (
                          <button
                            key={slot.time}
                            disabled={isSoldOut}
                            onClick={() => setSelectedSlotIdx(idx)}
                            className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl border transition-all duration-200 text-sm ${
                              isSoldOut
                                ? "border-blackout/5 bg-blackout/[0.02] text-blackout/25 cursor-not-allowed"
                                : isSelected
                                  ? "border-explore-cyan bg-explore-cyan/20 text-explore-blue font-bold shadow-sm"
                                  : "border-blackout/5 hover:border-explore-cyan/40 hover:bg-explore-cyan/5 text-blackout/70"
                            }`}
                          >
                            <span className="font-medium">{slot.time}</span>
                            <span className="text-xs">
                              {isSoldOut ? (
                                <span className="text-red-400 font-bold">Esgotado</span>
                              ) : (
                                <span className="flex items-center gap-1">
                                  <Users className="w-3.5 h-3.5" />
                                  {slot.available} lugares
                                </span>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ───── Step 3: Passengers & Contact ────────────────────── */}
          {step === 3 && (
            <motion.div
              key="step-3"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: EASE }}
            >
              <h2 className="text-4xl md:text-5xl italic mb-2 text-center">
                Passageiros & Contacto
              </h2>
              <p className="text-center text-blackout/50 text-sm mb-12">
                {selectedTour?.title}
                {selectedDate && ` \u2014 ${formatDateDisplay(selectedDate)}`}
              </p>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Passengers */}
                <div className="bg-white rounded-[2rem] border border-blackout/5 p-6 md:p-8 space-y-8">
                  <h3 className="text-[10px] uppercase tracking-[0.5em] font-bold text-blackout/40">
                    Passageiros
                  </h3>

                  {/* Adults */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-light">Adultos</p>
                      {adultPrice > 0 && (
                        <p className="text-xs text-blackout/40">{adultPrice}\u20AC / pessoa</p>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        disabled={adults <= 1}
                        className="w-10 h-10 rounded-full border border-blackout/10 flex items-center justify-center hover:bg-blackout/5 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-2xl font-bold w-8 text-center">{adults}</span>
                      <button
                        onClick={() => setAdults(adults + 1)}
                        disabled={adults + children >= maxAvailable}
                        className="w-10 h-10 rounded-full border border-blackout/10 flex items-center justify-center hover:bg-blackout/5 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-light">Criancas</p>
                      {childPrice > 0 ? (
                        <p className="text-xs text-blackout/40">
                          {childPrice}\u20AC / crianca
                          {selectedTour?.childAge && ` (${selectedTour.childAge})`}
                        </p>
                      ) : (
                        selectedTour?.childAge && (
                          <p className="text-xs text-blackout/40">{selectedTour.childAge}</p>
                        )
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        disabled={children <= 0}
                        className="w-10 h-10 rounded-full border border-blackout/10 flex items-center justify-center hover:bg-blackout/5 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-2xl font-bold w-8 text-center">{children}</span>
                      <button
                        onClick={() => setChildren(children + 1)}
                        disabled={adults + children >= maxAvailable}
                        className="w-10 h-10 rounded-full border border-blackout/10 flex items-center justify-center hover:bg-blackout/5 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {adults + children > maxAvailable && (
                    <p className="text-red-500 text-xs font-medium">
                      Maximo de {maxAvailable} lugares disponiveis neste horario.
                    </p>
                  )}

                  {/* Price summary */}
                  <div className="border-t border-blackout/5 pt-6">
                    <div className="space-y-2 text-sm text-blackout/60">
                      {adultPrice > 0 && (
                        <div className="flex justify-between">
                          <span>
                            {adults} adulto{adults > 1 ? "s" : ""} x {adultPrice}\u20AC
                          </span>
                          <span className="font-medium text-blackout">
                            {adults * adultPrice}\u20AC
                          </span>
                        </div>
                      )}
                      {children > 0 && childPrice > 0 && (
                        <div className="flex justify-between">
                          <span>
                            {children} crianca{children > 1 ? "s" : ""} x {childPrice}\u20AC
                          </span>
                          <span className="font-medium text-blackout">
                            {children * childPrice}\u20AC
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between mt-4 pt-4 border-t border-blackout/5 text-lg">
                      <span className="font-light">Total</span>
                      <span className="font-bold">{totalPrice}\u20AC</span>
                    </div>
                  </div>
                </div>

                {/* Contact form */}
                <div className="bg-white rounded-[2rem] border border-blackout/5 p-6 md:p-8 space-y-6">
                  <h3 className="text-[10px] uppercase tracking-[0.5em] font-bold text-blackout/40">
                    Dados de contacto
                  </h3>

                  <div>
                    <label className="block text-xs font-medium text-blackout/50 mb-2">
                      Nome *
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="O seu nome completo"
                      className="w-full px-5 py-3.5 rounded-2xl border border-blackout/10 bg-coconut/50 text-sm focus:outline-none focus:border-explore-cyan focus:ring-2 focus:ring-explore-cyan/20 transition-all placeholder:text-blackout/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-blackout/50 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="email@exemplo.com"
                      className="w-full px-5 py-3.5 rounded-2xl border border-blackout/10 bg-coconut/50 text-sm focus:outline-none focus:border-explore-cyan focus:ring-2 focus:ring-explore-cyan/20 transition-all placeholder:text-blackout/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-blackout/50 mb-2">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="+351 912 345 678"
                      className="w-full px-5 py-3.5 rounded-2xl border border-blackout/10 bg-coconut/50 text-sm focus:outline-none focus:border-explore-cyan focus:ring-2 focus:ring-explore-cyan/20 transition-all placeholder:text-blackout/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-blackout/50 mb-2">
                      Notas
                    </label>
                    <textarea
                      value={formNotes}
                      onChange={(e) => setFormNotes(e.target.value)}
                      placeholder="Alguma informacao adicional (opcional)"
                      rows={3}
                      className="w-full px-5 py-3.5 rounded-2xl border border-blackout/10 bg-coconut/50 text-sm focus:outline-none focus:border-explore-cyan focus:ring-2 focus:ring-explore-cyan/20 transition-all placeholder:text-blackout/20 resize-none"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ───── Step 4: Summary & Payment ───────────────────────── */}
          {step === 4 && (
            <motion.div
              key="step-4"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: EASE }}
            >
              <h2 className="text-4xl md:text-5xl italic mb-2 text-center">
                Resumo da Reserva
              </h2>
              <p className="text-center text-blackout/50 text-sm mb-12">
                Verifique todos os detalhes antes de pagar
              </p>

              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-[2rem] border border-blackout/5 overflow-hidden">
                  {/* Tour header */}
                  {selectedTour && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={selectedTour.image}
                        alt={selectedTour.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 672px"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blackout/60 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-8 right-8">
                        <h3 className="text-2xl text-white font-light">
                          {selectedTour.title}
                        </h3>
                      </div>
                    </div>
                  )}

                  <div className="p-8 space-y-6">
                    {/* Details grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-coconut/50">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-blackout/30 block mb-1">
                          Data
                        </span>
                        <span className="text-sm font-medium capitalize">
                          {selectedDate ? formatDateDisplay(selectedDate) : "-"}
                        </span>
                      </div>
                      <div className="p-4 rounded-2xl bg-coconut/50">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-blackout/30 block mb-1">
                          Horario
                        </span>
                        <span className="text-sm font-medium">
                          {selectedSlot?.time || "-"}
                        </span>
                      </div>
                      <div className="p-4 rounded-2xl bg-coconut/50">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-blackout/30 block mb-1">
                          Passageiros
                        </span>
                        <span className="text-sm font-medium">
                          {adults} adulto{adults > 1 ? "s" : ""}
                          {children > 0 &&
                            `, ${children} crianca${children > 1 ? "s" : ""}`}
                        </span>
                      </div>
                      <div className="p-4 rounded-2xl bg-coconut/50">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-blackout/30 block mb-1">
                          Contacto
                        </span>
                        <span className="text-sm font-medium">{formName}</span>
                        <span className="text-xs text-blackout/40 block">{formEmail}</span>
                      </div>
                    </div>

                    {/* Price breakdown */}
                    <div className="border-t border-blackout/5 pt-6 space-y-2 text-sm">
                      {adultPrice > 0 && (
                        <div className="flex justify-between text-blackout/60">
                          <span>
                            {adults} adulto{adults > 1 ? "s" : ""} x {adultPrice}\u20AC
                          </span>
                          <span>{adults * adultPrice}\u20AC</span>
                        </div>
                      )}
                      {children > 0 && childPrice > 0 && (
                        <div className="flex justify-between text-blackout/60">
                          <span>
                            {children} crianca{children > 1 ? "s" : ""} x {childPrice}\u20AC
                          </span>
                          <span>{children * childPrice}\u20AC</span>
                        </div>
                      )}
                      <div className="flex justify-between text-xl pt-4 border-t border-blackout/5">
                        <span className="font-light">Total</span>
                        <span className="font-bold">{totalPrice}\u20AC</span>
                      </div>
                    </div>

                    {/* Terms */}
                    <label className="flex items-start gap-3 cursor-pointer group pt-2">
                      <div
                        className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                          termsAccepted
                            ? "bg-explore-cyan border-explore-cyan"
                            : "border-blackout/20 group-hover:border-blackout/40"
                        }`}
                        onClick={() => setTermsAccepted(!termsAccepted)}
                      >
                        {termsAccepted && (
                          <Check className="w-3 h-3 text-explore-blue" />
                        )}
                      </div>
                      <span
                        className="text-xs text-blackout/50 leading-relaxed"
                        onClick={() => setTermsAccepted(!termsAccepted)}
                      >
                        Li e aceito os{" "}
                        <a
                          href="/termos"
                          target="_blank"
                          className="underline hover:text-blackout transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Termos e Condicoes
                        </a>{" "}
                        e a{" "}
                        <a
                          href="/privacidade"
                          target="_blank"
                          className="underline hover:text-blackout transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Politica de Privacidade
                        </a>
                        .
                      </span>
                    </label>

                    {submitError && (
                      <p className="text-red-500 text-xs font-medium text-center">
                        {submitError}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bottom navigation ─────────────────────────────────────── */}
        <div className="max-w-2xl mx-auto mt-10 flex items-center justify-between gap-4">
          {step > 1 ? (
            <button
              onClick={goBack}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-blackout/10 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-blackout/5 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={goNext}
              disabled={!canProceed}
              className={`px-10 py-3.5 rounded-full text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-300 ${
                canProceed
                  ? "bg-explore-cyan text-explore-blue hover:scale-[1.02] hover:shadow-lg shadow-explore-cyan/20"
                  : "bg-blackout/5 text-blackout/20 cursor-not-allowed"
              }`}
            >
              Continuar
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed || submitting}
              className={`px-10 py-3.5 rounded-full text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-300 flex items-center gap-2 ${
                canProceed && !submitting
                  ? "bg-explore-cyan text-explore-blue hover:scale-[1.02] hover:shadow-lg shadow-explore-cyan/20"
                  : "bg-blackout/5 text-blackout/20 cursor-not-allowed"
              }`}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  A processar...
                </>
              ) : (
                `Pagar ${totalPrice}\u20AC`
              )}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
