import { useState, useEffect, useCallback, useMemo } from "react";
import { CornerLeaves, Cross, GoldRule } from "./Ornaments";
import { GoldenDust } from "./GoldenDust";

const EVENT_DATE = new Date("2026-10-11T10:00:00+05:30");

const CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" +
  encodeURIComponent("புதுமனை புகுவிழா — R. Santhosh Kumar & M. Mercy Rani") +
  "&dates=20261011T043000Z/20261011T073000Z&details=" +
  encodeURIComponent("உங்கள் வருகை எங்கள் மகிழ்ச்சி… உங்கள் செபம் எங்கள் ஆசீர்வாதம்!\nPaithur, Attur, Salem, Tamil Nadu") +
  "&location=" +
  encodeURIComponent("Paithur, Attur, Salem, Tamil Nadu");

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Paithur, Attur, Salem, Tamil Nadu");

function generateIcsFile() {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Divine Dwelling Invites//House Warming//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "SUMMARY:புதுமனை புகுவிழா — R. Santhosh Kumar & M. Mercy Rani",
    "DESCRIPTION:உங்கள் வருகை எங்கள் மகிழ்ச்சி… உங்கள் செபம் எங்கள் ஆசீர்வாதம்!\\nHouse Warming Ceremony\\nPaithur, Attur, Salem",
    "LOCATION:Paithur, Attur, Salem, Tamil Nadu",
    "DTSTART:20261011T043000Z",
    "DTEND:20261011T073000Z",
    "DTSTAMP:20260901T000000Z",
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT1D",
    "DESCRIPTION:Reminder for House Warming Ceremony tomorrow",
    "ACTION:DISPLAY",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "House-Warming-Santhosh-Mercy.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const iconProps = {
  className: "h-5 w-5",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

function CalendarIcon() {
  return (
    <svg {...iconProps} aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg {...iconProps} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg {...iconProps} aria-hidden>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg {...iconProps} aria-hidden>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg {...iconProps} aria-hidden>
      <path d="M10 13a5 5 0 0 0 7.1.1l2-2A5 5 0 0 0 12 4l-1.2 1.2" />
      <path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.2-1.2" />
    </svg>
  );
}

/* Luxury Flip-Digit Card */
function FlipDigit({ value, label }: { value: number; label: string }) {
  const strVal = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-14 w-14 sm:h-18 sm:w-18 flex-col items-center justify-center rounded-xl border border-gold/40 bg-navy/95 shadow-md backdrop-blur-md transition-transform hover:scale-105">
        <span className="digit-animate font-serif-en text-2xl sm:text-3xl font-bold tracking-tight text-gold">
          {strVal}
        </span>
        <div className="absolute inset-x-0 top-1/2 h-px bg-black/40 shadow-[0_1px_0_rgba(212,175,55,0.2)]" />
      </div>
      <span className="mt-1.5 font-tamil text-[10px] font-medium text-ivory/80 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const diff = EVENT_DATE.getTime() - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto mt-7 max-w-lg rounded-2xl border border-gold/50 bg-navy/95 p-5 text-ivory shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-center gap-2">
        <span className="star-twinkle text-gold">✦</span>
        <p className="text-center font-tamil text-xs tracking-wider text-gold-soft uppercase sm:text-sm font-semibold">
          விழா தொடங்குவதற்கு இன்னும் ✦ Countdown to Ceremony
        </p>
        <span className="star-twinkle text-gold" style={{ animationDelay: "1.2s" }}>
          ✦
        </span>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2 text-center">
        <FlipDigit value={timeLeft.days} label="நாட்கள் / Days" />
        <FlipDigit value={timeLeft.hours} label="மணி / Hours" />
        <FlipDigit value={timeLeft.minutes} label="நிமிடம் / Mins" />
        <FlipDigit value={timeLeft.seconds} label="விநாடி / Secs" />
      </div>
    </div>
  );
}

/* Event Ceremony Program Item with Gentle Float */
function ScheduleItem({
  time,
  titleTamil,
  titleEn,
  desc,
  icon,
  blessingBy,
}: {
  time: string;
  titleTamil: string;
  titleEn: string;
  desc: string;
  icon: string;
  blessingBy?: string;
}) {
  return (
    <div className="relative flex items-start gap-4 pb-6 last:pb-0 group">
      <div className="float-subtle relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-navy text-gold shadow-md transition-transform group-hover:scale-110">
        <span className="text-base">{icon}</span>
      </div>
      <div className="flex-1 rounded-xl border border-gold/30 bg-ivory/80 p-3.5 shadow-sm transition-all hover:bg-ivory hover:shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-1">
          <h4 className="font-tamil text-base font-bold text-navy">{titleTamil}</h4>
          <span className="rounded-full bg-navy/10 px-2.5 py-0.5 font-serif-en text-xs font-bold text-gold">
            {time}
          </span>
        </div>
        <p className="font-serif-en text-xs font-semibold text-navy/70 tracking-wide uppercase">
          {titleEn}
        </p>
        {blessingBy && (
          <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-md border border-gold/50 bg-gold/15 px-2.5 py-1 font-serif-en text-xs font-bold text-navy shadow-xs">
            <span className="text-gold">✝</span>
            <span>Blessing By : {blessingBy}</span>
          </div>
        )}
        <p className="mt-1.5 font-tamil text-xs leading-relaxed text-navy/85 sm:text-sm">
          {desc}
        </p>
      </div>
    </div>
  );
}

function Detail({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 px-3 py-4 text-center">
      <div className="flex items-center justify-center gap-2 text-navy">
        <span aria-hidden className="text-gold">
          {icon}
        </span>
        <span className="font-tamil text-base font-bold text-navy sm:text-lg">{label}</span>
      </div>
      <div
        className="mx-auto my-3 h-px w-24"
        style={{ background: "var(--gradient-gold)" }}
        aria-hidden
      />
      <div className="font-tamil text-sm leading-relaxed text-navy/85 sm:text-base">{children}</div>
    </div>
  );
}

interface Particle {
  id: number;
  x: number;
  y: number;
  symbol: string;
  dx: number;
}

export function InvitationCard() {
  const [houseView, setHouseView] = useState<"festive" | "original">("festive");
  const [qrModal, setQrModal] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCardClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const symbols = ["✝", "✦", "✨", "🌸", "🕊️"];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const dx = (Math.random() - 0.5) * 60;
    const id = Date.now() + Math.random();

    setParticles((prev) => [...prev.slice(-15), { id, x, y, symbol, dx }]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 1200);
  }, []);

  // Ambient floating motes across the card
  const ambientMotes = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: `${(i * 19 + 7) % 94}%`,
        top: `${(i * 23 + 11) % 85}%`,
        delay: `${(i * 0.7) % 6}s`,
        duration: `${6 + (i % 4) * 2}s`,
        size: 3 + (i % 3) * 2,
      })),
    []
  );

  return (
    <main className="relative flex min-h-screen justify-center px-3 py-6 sm:px-6 sm:py-12">
      {/* Multi-Layer Background Parallax Ornaments */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute -top-10 left-10 text-gold/15 text-7xl select-none transition-transform duration-75 ease-out"
          style={{ transform: `translate3d(0, ${scrollY * -0.18}px, 0)` }}
        >
          ✝
        </div>
        <div
          className="absolute top-1/3 -right-6 text-gold/15 text-8xl select-none transition-transform duration-75 ease-out"
          style={{ transform: `translate3d(0, ${scrollY * -0.28}px, 0)` }}
        >
          ✦
        </div>
        <div
          className="absolute top-2/3 -left-4 text-gold/15 text-6xl select-none transition-transform duration-75 ease-out"
          style={{ transform: `translate3d(0, ${scrollY * -0.12}px, 0)` }}
        >
          🕊️
        </div>
      </div>

      <article
        onClick={handleCardClick}
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-gold/40 select-none cursor-default"
        style={{
          background: "var(--gradient-paper)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        {/* Floating Glowing Pulsing Golden Dust Canvas Layer */}
        <GoldenDust className="pointer-events-none absolute inset-0 z-20 h-full w-full" />

        {/* Ambient Golden Fireflies / Dust Motes */}
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden>
          {ambientMotes.map((m) => (
            <span
              key={m.id}
              className="ambient-particle absolute rounded-full bg-gold/70 shadow-[0_0_6px_rgba(212,175,55,0.8)]"
              style={{
                left: m.left,
                top: m.top,
                width: m.size,
                height: m.size,
                animationDelay: m.delay,
                animationDuration: m.duration,
              }}
            />
          ))}
        </div>

        {/* Floating Tap Blessings Sparkles */}
        <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden" aria-hidden>
          {particles.map((p) => (
            <span
              key={p.id}
              className="tap-particle absolute font-serif text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.9)]"
              style={{
                left: p.x - 10,
                top: p.y - 10,
                fontSize: "18px",
                ["--dx" as string]: `${p.dx}px`,
              }}
            >
              {p.symbol}
            </span>
          ))}
        </div>

        {/* Subtle Luxury Ivory Paper Texture Overlay with Parallax Depth */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply transition-transform duration-100 ease-out"
          style={{
            backgroundImage: "url('/images/ivory-paper.webp')",
            backgroundSize: "cover",
            transform: `translate3d(0, ${scrollY * 0.04}px, 0)`,
          }}
          aria-hidden
        />

        {/* Christian Blessing Floral Header Festoon with Parallax */}
        <div
          className="relative -mx-2 -mt-2 sm:-mx-4 sm:-mt-4 transition-transform duration-75 ease-out"
          style={{ transform: `translate3d(0, ${Math.max(-20, scrollY * -0.06)}px, 0)` }}
        >
          <img
            src="/images/floral-toran.webp"
            alt="Christian blessing floral header with white lilies, golden bells, and cross"
            className="w-full object-contain drop-shadow-md"
            loading="eager"
          />
        </div>

        <div className="pointer-events-none absolute inset-2 rounded-xl border border-gold/50" aria-hidden />
        <div className="pointer-events-none absolute inset-3.5 rounded-lg border border-navy/15" aria-hidden />

        {/* Parallax Corner Leaves */}
        <div
          className="pointer-events-none absolute top-12 left-2 z-10 transition-transform duration-100 ease-out"
          style={{ transform: `translate3d(0, ${scrollY * 0.1}px, 0)` }}
        >
          <CornerLeaves className="h-28 w-28 text-navy/20 sm:h-40 sm:w-40" />
        </div>
        <div
          className="pointer-events-none absolute right-2 bottom-12 z-10 transition-transform duration-100 ease-out"
          style={{ transform: `translate3d(0, ${scrollY * -0.08}px, 0) rotate(180deg)` }}
        >
          <CornerLeaves className="h-28 w-28 text-navy/20 sm:h-40 sm:w-40" />
        </div>

        <div className="relative z-10 px-5 pt-4 pb-8 sm:px-12 sm:pt-8">
          {/* Holy Spirit & Divine Header with Radiant Glowing Halo */}
          <section className="rise flex flex-col items-center text-center">
            <div
              className="relative mb-3 flex items-center justify-center transition-transform duration-75 ease-out"
              style={{ transform: `translate3d(0, ${scrollY * -0.05}px, 0)` }}
            >
              <div className="absolute -inset-3 animate-pulse rounded-full bg-gold/35 blur-lg" />
              <div className="gold-glow-pulse absolute -inset-1 rounded-full border-2 border-gold/60" />
              <img
                src="/images/holy-spirit-dove.webp"
                alt="Sacred Holy Spirit Dove"
                className="relative h-20 w-20 rounded-full border-2 border-gold object-cover shadow-[0_0_25px_rgba(212,175,55,0.6)] sm:h-24 sm:w-24"
              />
            </div>

            <p className="mx-auto max-w-xl font-tamil text-base font-semibold leading-relaxed text-navy sm:text-lg">
              “நேர்மையாளரின் இல்லத்தில் ஆண்டவரின் ஆசீர்வாதம் தங்கும்.”
            </p>
            <p className="mt-1 font-tamil text-sm font-medium text-gold">— நீதிமொழிகள் 3:33</p>
            <GoldRule className="mt-4" />
          </section>

          {/* Title */}
          <section className="rise mt-6 text-center">
            <p className="font-tamil text-lg font-medium text-navy/80 sm:text-xl">இறைவன் அருளால்…</p>
            <h1 className="mt-2 font-tamil-display text-5xl leading-tight font-extrabold text-navy drop-shadow-sm sm:text-7xl">
              புதிய இல்லம்
            </h1>
            <p className="mt-2 font-tamil-display text-2xl font-bold text-gold sm:text-4xl">
              புதுமனை புகுவிழா
            </p>
            <div className="mt-4 flex items-center justify-center gap-3 text-navy/70">
              <Cross className="star-twinkle h-7 w-4 text-gold" />
              <span className="font-serif-en text-sm tracking-widest text-navy uppercase font-semibold">
                House Warming Invitation
              </span>
              <Cross className="star-twinkle h-7 w-4 text-gold" style={{ animationDelay: "1s" }} />
            </div>
          </section>

          {/* Hero Actual House Showcase with View Switcher */}
          <section className="rise mt-8">
            <div className="mb-3 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setHouseView("festive");
                }}
                className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-5 py-2 font-tamil text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
                  houseView === "festive"
                    ? "border border-gold bg-navy text-gold shadow-md"
                    : "border border-navy/20 bg-ivory/80 text-navy/70 hover:bg-ivory"
                }`}
              >
                <span className="star-twinkle">✦</span> விழா அலங்காரம் (Festive View)
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setHouseView("original");
                }}
                className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-5 py-2 font-tamil text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
                  houseView === "original"
                    ? "border border-gold bg-navy text-gold shadow-md"
                    : "border border-navy/20 bg-ivory/80 text-navy/70 hover:bg-ivory"
                }`}
              >
                <span>📷</span> இல்ல புகைப்படம் (Actual Home)
              </button>
            </div>

            <figure className="group relative overflow-hidden rounded-2xl border-2 border-gold/60 bg-navy/90 shadow-2xl transition-all duration-500">
              <img
                src={
                  houseView === "festive"
                    ? "/images/actual-house-festive.webp"
                    : "/images/actual-house.webp"
                }
                alt="புதிய இல்லம் — Santhosh Kumar & Mercy Rani's newly built family home in Paithur, Attur"
                className="mx-auto h-auto max-h-[640px] w-full object-contain object-top transition-transform duration-700 group-hover:scale-[1.02]"
                width={859}
                height={1024}
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-transparent opacity-90" />
              <div className="absolute right-3 bottom-3 left-3 flex items-end justify-between text-ivory">
                <div>
                  <span className="rounded-full bg-gold px-3 py-1 font-tamil text-xs font-bold text-navy shadow">
                    புதிய இல்லம் • Divine Dwelling
                  </span>
                  <p className="mt-1.5 font-serif-en text-xs tracking-wider text-ivory/95 italic sm:text-sm">
                    R. Santhosh Kumar &amp; M. Mercy Rani Villa • Paithur, Salem
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/golden-cross.webp"
                    alt=""
                    className="gold-glow-pulse h-11 w-11 rounded-full border-2 border-gold object-cover shadow-lg"
                    aria-hidden
                  />
                </div>
              </div>
            </figure>
          </section>

          {/* Holy Family Intercession & Invitation Message */}
          <section className="rise mt-8 rounded-xl border border-gold/50 bg-ivory/90 p-5 shadow-md backdrop-blur-sm sm:p-6">
            <div className="grid items-center gap-6 md:grid-cols-12">
              <div className="flex flex-col items-center md:col-span-4">
                <div className="relative">
                  <div className="absolute -inset-1.5 rounded-2xl bg-gold/40 blur-sm" />
                  <img
                    src="/images/holy-family-blessing.webp"
                    alt="Holy Family of Nazareth — Jesus, Mary and Joseph"
                    className="relative h-52 w-36 rounded-xl border-2 border-gold object-cover shadow-lg sm:h-60 sm:w-44"
                  />
                </div>
                <span className="mt-2 text-center font-tamil text-xs font-semibold text-navy/80">
                  திருக்குடும்ப ஆசீர்வாதம்
                </span>
                <span className="text-center font-serif-en text-[11px] text-navy/60 uppercase tracking-wider">
                  The Holy Family
                </span>
              </div>

              <div className="text-center font-tamil text-base leading-8 text-navy md:col-span-8 md:text-left sm:text-lg sm:leading-9">
                <p className="font-semibold text-navy">
                  மூவொரு இறைவனாகிய ஆண்டவரின் அருளாலும்,
                  <br />
                  அன்னை மரியாளின் பரிந்துரையாலும்,
                  <br />
                  எங்களுக்குக் கிடைத்துள்ள இந்தப் புதிய இல்லத்தை
                  <br />
                  இறைவனுக்கே அர்ப்பணித்து,
                  <br />
                  புதுமனை புகுவிழாவை நடத்துகிறோம்.
                </p>
                <GoldRule className="my-4 md:justify-start" />
                <p className="text-navy/90">
                  தாங்கள் தங்கள் குடும்பத்தினருடன் வருகை தந்து,
                  <br />
                  எங்கள் இல்லத்தை ஆசீர்வதித்து,
                  <br />
                  எங்கள் மகிழ்ச்சியைப் பகிர்ந்து கொள்ள
                  <br />
                  அன்புடன் அழைக்கிறோம்.
                </p>
              </div>
            </div>
          </section>

          {/* Sacred Heart of Jesus — House Dedication & Blessing Prayer */}
          <section className="rise mt-8 overflow-hidden rounded-xl border border-gold/50 bg-ivory/90 shadow-md backdrop-blur-sm">
            <div className="grid items-center gap-6 p-5 sm:grid-cols-12 sm:p-6">
              <div className="flex flex-col items-center sm:col-span-4">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-2xl bg-gold/30 blur-md" />
                  <img
                    src="/images/sacred-heart-jesus.webp"
                    alt="Sacred Heart of Jesus — Divine Blessing"
                    className="relative h-52 w-40 rounded-2xl border-2 border-gold object-cover shadow-xl sm:h-60 sm:w-48"
                    loading="lazy"
                  />
                </div>
                <span className="mt-2 text-center font-tamil text-xs font-semibold text-navy/80">
                  இயேசுவின் திரு இருதயம்
                </span>
                <span className="text-center font-serif-en text-[11px] text-navy/60 uppercase tracking-wider">
                  Sacred Heart of Jesus
                </span>
              </div>
              <div className="text-center sm:col-span-8 sm:text-left">
                <span className="rounded-full bg-navy/10 px-3 py-1 font-tamil text-xs font-bold text-gold">
                  இறை அருளும் ஆசீர்வாதமும் ✦ Divine Dedication
                </span>
                <h3 className="mt-2 font-tamil text-lg font-bold text-navy sm:text-xl">
                  குடும்பத்தின் செபமும் அர்ப்பணிப்பும்
                </h3>
                <p className="mt-1 font-tamil text-xs italic text-navy/70 sm:text-sm">
                  “ஆண்டவரே வீட்டைக் கட்டினாலன்றி, அதைக் கட்டுவோரின் உழைப்பு வீணாகும்.” — திருப்பாடல்கள் 127:1
                </p>
                <div className="my-3 h-px w-full bg-gradient-to-r from-gold/50 via-gold to-transparent" />
                <ul className="space-y-2.5 font-tamil text-sm font-medium text-navy sm:text-base">
                  {[
                    "எங்கள் இல்லம் – இறைவனின் இல்லமாகட்டும்!",
                    "எங்கள் வாசல் – அன்பின் வாசலாகட்டும்!",
                    "எங்கள் வாழ்வு – இறைவனுக்கே அர்ப்பணமாகட்டும்!",
                  ].map((line, i) => (
                    <li key={i} className="flex items-center justify-center gap-2 sm:justify-start">
                      <span className="text-gold" aria-hidden>
                        ✝
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* The Good Shepherd Blessing & Psalm 23 */}
          <section className="rise mt-8 overflow-hidden rounded-xl border border-gold/50 bg-ivory/90 shadow-md backdrop-blur-sm">
            <div className="grid items-center gap-6 p-5 sm:grid-cols-12 sm:p-6">
              <div className="flex flex-col items-center sm:col-span-4">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-2xl bg-gold/30 blur-md" />
                  <img
                    src="/images/good-shepherd-jesus.webp"
                    alt="The Good Shepherd — Lord Jesus Christ"
                    className="relative h-52 w-36 rounded-2xl border-2 border-gold object-cover shadow-xl sm:h-60 sm:w-44"
                    loading="lazy"
                  />
                </div>
                <span className="mt-2 text-center font-tamil text-xs font-semibold text-navy/80">
                  நல்ல ஆயன் இயேசு
                </span>
                <span className="text-center font-serif-en text-[11px] text-navy/60 uppercase tracking-wider">
                  The Good Shepherd
                </span>
              </div>
              <div className="text-center sm:col-span-8 sm:text-left">
                <span className="rounded-full bg-navy/10 px-3 py-1 font-tamil text-xs font-bold text-gold">
                  திருப்பாடல் 23 ✦ Psalm of Grace
                </span>
                <h3 className="mt-2 font-tamil text-lg font-bold text-navy sm:text-xl">
                  “ஆண்டவரே என் ஆயர்; எனக்கேதும் குறையில்லை”
                </h3>
                <p className="mt-1 font-tamil text-xs italic text-navy/70 sm:text-sm">
                  — திருப்பாடல்கள் 23:1 (Psalm 23:1)
                </p>
                <div className="my-3 h-px w-full bg-gradient-to-r from-gold/50 via-gold to-transparent" />
                <p className="font-tamil text-sm leading-7 text-navy/90 sm:text-base sm:leading-8">
                  பசுமையான புல்வெளிகளில் எங்களை இளைப்பாறச் செய்து,
                  அமைதியான நீர்நிலைகளுக்கு எங்களை வழிநடத்தும் நல்ல ஆயனின் அன்பும் ஆசீரும் என்றும் நம் அனைவரோடும் இருப்பதாக!
                </p>
              </div>
            </div>
          </section>

          {/* Ceremony Timeline & Program */}
          <section className="rise mt-8 rounded-xl border border-gold/50 bg-ivory/90 p-5 shadow-md backdrop-blur-sm sm:p-6">
            <div className="text-center mb-6">
              <span className="rounded-full border border-gold/60 bg-navy/10 px-4 py-1 font-tamil text-xs font-bold text-gold">
                நிகழ்ச்சி நிரல் ✦ Schedule of Ceremonies
              </span>
              <h3 className="mt-2 font-tamil text-xl font-bold text-navy">
                விழா நிகழ்வுகள்
              </h3>
            </div>

            <div className="relative max-w-xl mx-auto before:absolute before:top-4 before:bottom-6 before:left-5 before:w-0.5 before:bg-gradient-to-b before:from-gold before:via-gold/50 before:to-gold/10">
              <ScheduleItem
                time="10:00 AM"
                icon="✝"
                titleTamil="இல்ல ஆசீர்வாத செபம்"
                titleEn="House Blessing & Thanksgiving Prayer"
                blessingBy="Fr. R. Charles"
                desc="இறைவனின் அருளாசியோடு, புதிய இல்லத்தின் ஆசீர்வாத வழிபாடு நடைபெறும்."
              />
              <ScheduleItem
                time="10:30 AM"
                icon="✨"
                titleTamil="புதுமனை புகுவிழா & திருவிளக்கேற்றுதல்"
                titleEn="Ceremonial House Warming & Lamp Lighting"
                desc="குடும்பத்தினருடன் இல்லத்தில் மங்கலகரமாகப் பிரவேசித்து சுடரேற்றி இறைவனைப் போற்றுதல்."
              />
              <ScheduleItem
                time="11:00 AM"
                icon="❦"
                titleTamil="அன்பின் விருந்து உபசரிப்பு"
                titleEn="Celebratory Festive Feast"
                desc="வருகை தந்த அனைத்து அன்பான உறவுகளுக்கும் நண்பர்களுக்கும் மகிழ்ச்சியான விருந்து."
              />
            </div>
          </section>

          {/* Countdown Timer with Flip Digits */}
          <section className="rise">
            <CountdownTimer />
          </section>

          {/* Details & Location Banner with Parallax Image */}
          <section className="rise mt-9 overflow-hidden rounded-xl border border-gold/60 bg-ivory/90 shadow-lg">
            {/* Scenic Salem Landscape Header with Parallax Shift */}
            <div className="relative h-32 w-full overflow-hidden sm:h-44">
              <img
                src="/images/salem-landscape.webp"
                alt="Scenic beauty of Paithur, Attur, Salem"
                className="h-[120%] w-full object-cover transition-transform duration-100 ease-out"
                style={{
                  transform: `translate3d(0, ${Math.min(scrollY * 0.08, 30)}px, 0) scale(1.05)`,
                }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
              <div className="absolute right-4 bottom-3 left-4 flex items-center justify-between text-ivory">
                <div>
                  <p className="font-tamil text-xs text-gold-soft">நிகழ்ச்சி நடைபெறும் இடம்</p>
                  <p className="font-serif-en text-lg font-bold text-ivory sm:text-xl">
                    Paithur, Attur, Salem
                  </p>
                </div>
                <span className="rounded-full border border-gold/50 bg-navy/60 px-3 py-1 font-tamil text-xs text-gold-soft">
                  ஞாயிறு 11.10.2026
                </span>
              </div>
            </div>

            <div className="p-3 sm:p-5">
              <div className="flex flex-col divide-y divide-gold/40 sm:flex-row sm:divide-x sm:divide-y-0">
                <Detail icon={<CalendarIcon />} label="நாள்">
                  <span className="font-bold text-navy">11.10.2026</span>
                  <br />
                  ஞாயிற்றுக்கிழமை
                  <br />
                  <span className="text-xs text-navy/70">Sunday</span>
                </Detail>
                <Detail icon={<ClockIcon />} label="நேரம்">
                  காலை
                  <br />
                  <span className="font-bold text-navy">10.00 மணி முதல்</span>
                  <br />
                  11.00 மணி வரை
                </Detail>
                <Detail icon={<PinIcon />} label="இடம்">
                  <span className="font-bold text-navy">பைத்தூர்</span>,
                  <br />
                  ஆத்தூர்,
                  <br />
                  சேலம் மாவட்டம்.
                </Detail>
                <Detail icon={<LinkIcon />} label="QR குறியீடு">
                  வரைபடத்தைக் காண
                  <br />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setQrModal(true);
                    }}
                    className="inline-flex items-center gap-1 text-xs text-gold underline hover:text-navy mt-1"
                  >
                    பெரிதாக்க தொடவும் (Tap to Zoom)
                  </button>
                  <img
                    src="/images/venue-qr.webp"
                    alt="QR code linking to the venue location in Paithur, Attur, Salem"
                    onClick={(e) => {
                      e.stopPropagation();
                      setQrModal(true);
                    }}
                    className="mx-auto mt-2 h-20 w-20 cursor-pointer rounded-md border-2 border-navy/20 bg-white p-1 shadow-md transition-transform hover:scale-105 sm:h-24 sm:w-24"
                    width={96}
                    height={96}
                    loading="lazy"
                  />
                </Detail>
              </div>
            </div>
          </section>

          {/* Action Buttons (≥44px touch targets in thumb zone) */}
          <section className="rise mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                generateIcsFile();
              }}
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-navy px-6 py-2.5 font-tamil text-sm font-semibold text-ivory shadow-md transition-all hover:bg-navy/90 hover:shadow-lg active:scale-95 sm:text-base"
            >
              <DownloadIcon />
              நிகழ்வைச் சேமிக்க (.ics)
            </button>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-gold/70 bg-navy/90 px-6 py-2.5 font-tamil text-sm font-semibold text-gold shadow-md transition-all hover:bg-navy hover:shadow-lg active:scale-95 sm:text-base"
            >
              <CalendarIcon />
              Google Calendar
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full border-2 border-navy/40 bg-ivory/80 px-6 py-2.5 font-tamil text-sm font-semibold text-navy shadow-sm transition-all hover:bg-navy/10 active:scale-95 sm:text-base"
            >
              <PinIcon />
              வழி காட்டு (Google Maps)
            </a>
            <ShareButton />
          </section>

          {/* Hosts Section with Royal Wax Seal & Pulsing Glow */}
          <section className="rise mt-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-navy px-6 py-2 shadow-md">
              <span className="star-twinkle text-gold">✦</span>
              <p className="font-tamil text-sm font-bold text-ivory sm:text-base">
                அன்புடன் அழைப்பவர்கள்
              </p>
              <span className="star-twinkle text-gold" style={{ animationDelay: "1s" }}>
                ✦
              </span>
            </div>

            <div className="mt-6 space-y-3 font-serif-en text-navy">
              <p className="text-lg font-bold text-navy sm:text-2xl">
                Fr. R. Charles
              </p>

              <p className="text-lg font-bold text-navy sm:text-2xl">
                திருமதி. R. Anjala Mary
              </p>

              <p className="text-xl font-extrabold text-navy sm:text-3xl">
                திரு. R. Santhosh Kumar &amp; திருமதி. M. Mercy Rani
              </p>

              <div className="pt-2 space-y-1 text-lg font-semibold text-navy/90 sm:text-xl">
                <p>S.M. Jenoel Raj</p>
                <p>S.M. Joviya Antoinetta</p>
              </div>
            </div>

            {/* 3D Embossed Gold Wax Seal with Pulsing Halo */}
            <div className="mt-7 flex justify-center">
              <div
                className="relative group transition-transform duration-100 ease-out"
                style={{
                  transform: `translate3d(0, ${Math.sin(scrollY * 0.01) * 6}px, 0)`,
                }}
              >
                <div className="gold-glow-pulse absolute -inset-3 rounded-full bg-gold/40 blur-lg transition-opacity group-hover:opacity-100 opacity-70" />
                <img
                  src="/images/gold-wax-seal.webp"
                  alt="Home Blessed by God royal gold seal emblem"
                  className="relative h-28 w-28 rounded-full border-2 border-gold/80 object-cover shadow-2xl transition-transform duration-300 hover:scale-105 sm:h-36 sm:w-36"
                  loading="lazy"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="relative z-10 border-t border-gold/40 bg-navy px-5 py-5 text-center font-tamil text-sm font-semibold text-ivory sm:text-base">
          <div className="flex items-center justify-center gap-2 text-gold">
            <span className="star-twinkle">❦</span>
            <span className="text-ivory">உங்கள் வருகை எங்கள் மகிழ்ச்சி… உங்கள் செபம் எங்கள் ஆசீர்வாதம்!</span>
            <span className="star-twinkle" style={{ animationDelay: "1.5s" }}>❦</span>
          </div>
        </footer>
      </article>

      {/* QR Code Zoom Modal */}
      {qrModal && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setQrModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm rounded-2xl border-2 border-gold bg-ivory p-6 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          >
            <button
              type="button"
              onClick={() => setQrModal(false)}
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-navy text-gold text-lg font-bold transition-transform active:scale-90"
              aria-label="Close modal"
            >
              ✕
            </button>
            <h3 className="font-tamil text-lg font-bold text-navy">
              பைத்தூர் இல்ல இருப்பிட QR
            </h3>
            <p className="font-serif-en text-xs text-navy/70 mt-1 uppercase tracking-wider">
              Paithur, Attur, Salem
            </p>
            <div className="my-4 flex justify-center">
              <img
                src="/images/venue-qr.webp"
                alt="Venue Location QR Code"
                className="h-60 w-60 rounded-xl border-4 border-gold bg-white p-2 shadow-lg"
              />
            </div>
            <p className="font-tamil text-xs text-navy/80">
              கேமராவால் ஸ்கேன் செய்து கூகுள் மேப்ஸில் வழியைக் காணவும்
            </p>
            <div className="mt-4">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-navy px-6 py-2.5 font-tamil text-sm font-semibold text-ivory shadow transition-all hover:bg-navy/90 active:scale-95"
              >
                <PinIcon /> Google Maps-ல் திறக்க
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function ShareButton() {
  const [copied, setCopied] = useState(false);

  const share = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = window.location.href;
    const data = {
      title: "புதுமனை புகுவிழா | House Warming Invitation",
      text: "எங்கள் புதுமனை புகுவிழாவிற்கு தாங்கள் தங்கள் குடும்பத்தினருடன் வருகை தந்து ஆசீர்வதிக்குமாறு அன்புடன் அழைக்கிறோம்.",
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      /* dismissed */
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex min-h-[46px] items-center gap-2 rounded-full border-2 border-gold/60 bg-gold/10 px-6 py-2.5 font-tamil text-sm font-semibold text-navy shadow-sm transition-all hover:bg-gold/20 active:scale-95 sm:text-base"
    >
      <svg
        className="h-4 w-4 text-gold"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
      {copied ? "இணைப்பு நகலெடுக்கப்பட்டது!" : "அழைப்பைப் பகிர (Share)"}
    </button>
  );
}
