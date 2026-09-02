import { useState, type ReactNode } from "react";
import { GoldenDust } from "./GoldenDust";
import { BgmPlayer } from "./BgmPlayer";

function RoseWindow({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 12 });
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <defs>
        <radialGradient id="rose-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--gold-soft)" stopOpacity="0.95" />
          <stop offset="55%" stopColor="var(--gold)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--navy)" stopOpacity="0.15" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="56" fill="url(#rose-core)" />
      {petals.map((_, i) => (
        <g key={i} transform={`rotate(${i * 30} 60 60)`}>
          <path
            d="M60 10c7 10 10 18 10 26s-4 14-10 14-10-6-10-14 3-16 10-26z"
            fill="currentColor"
            opacity={i % 2 ? 0.32 : 0.55}
          />
          <line x1="60" y1="8" x2="60" y2="52" stroke="currentColor" strokeWidth="0.7" opacity="0.8" />
        </g>
      ))}
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="60" cy="60" r="44" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <circle cx="60" cy="60" r="13" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M60 50v20M52 57h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function CarvedCross({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 100" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M30 12v76M10 38h40" strokeWidth="3.2" />
        <circle cx="30" cy="38" r="12" opacity="0.75" />
        <path d="M30 12c3 6 3 8 0 12M30 88c3-6 3-8 0-12" opacity="0.6" />
        <path d="M10 38c-4 3-5 5-4 8M50 38c4 3 5 5 4 8" opacity="0.6" />
      </g>
    </svg>
  );
}

function DoorPanel({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: "var(--gradient-door)",
        boxShadow: isLeft
          ? "inset -28px 0 46px -30px black, var(--shadow-door)"
          : "inset 28px 0 46px -30px black, var(--shadow-door)",
      }}
    >
      {/* wood door background texture */}
      <img
        src="/images/carved-doors.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-luminosity brightness-75 contrast-125"
        style={{
          objectPosition: isLeft ? "30% center" : "70% center",
        }}
      />

      {/* wood-grain striations */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(92deg, transparent 0 9px, color-mix(in oklab, black 45%, transparent) 9px 10px)",
        }}
        aria-hidden
      />

      {/* gold trims */}
      <div className="absolute inset-3 rounded-[10px] border border-gold/60 sm:inset-5 shadow-[inset_0_0_15px_rgba(212,175,55,0.2)]" aria-hidden />
      <div className="absolute inset-[18px] rounded-[8px] border border-gold/30 sm:inset-8" aria-hidden />

      {/* carved arched panel */}
      <div
        className="absolute border border-gold/45"
        style={{
          left: "14%",
          right: "14%",
          top: "10%",
          bottom: "32%",
          borderRadius: isLeft ? "999px 60px 8px 8px" : "60px 999px 8px 8px",
          background: "color-mix(in oklab, black 30%, transparent)",
          boxShadow: "inset 0 4px 20px color-mix(in oklab, black 70%, transparent), 0 0 15px rgba(212,175,55,0.2)",
        }}
        aria-hidden
      />

      {/* lower carved panel */}
      <div
        className="absolute rounded-sm border border-gold/35"
        style={{
          left: "14%",
          right: "14%",
          bottom: "8%",
          height: "20%",
          background: "color-mix(in oklab, black 30%, transparent)",
          boxShadow: "inset 0 2px 14px color-mix(in oklab, black 60%, transparent)",
        }}
        aria-hidden
      />

      {/* motif */}
      {isLeft ? (
        <div className="absolute top-[18%] left-1/2 flex -translate-x-1/2 flex-col items-center">
          <img
            src="/images/golden-cross.webp"
            alt=""
            className="h-28 w-28 rounded-full border border-gold/40 object-cover shadow-[0_0_20px_rgba(212,175,55,0.4)] sm:h-36 sm:w-36"
            aria-hidden
          />
        </div>
      ) : (
        <div className="absolute top-[18%] left-1/2 flex -translate-x-1/2 flex-col items-center">
          <img
            src="/images/holy-spirit-dove.webp"
            alt=""
            className="h-28 w-28 rounded-full border border-gold/40 object-cover shadow-[0_0_20px_rgba(212,175,55,0.4)] sm:h-36 sm:w-36"
            aria-hidden
          />
          <div className="mt-2 text-center font-tamil text-gold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <p className="text-base font-semibold sm:text-xl">இறைவன் அருளால்</p>
          </div>
        </div>
      )}

      {/* engraved names on lower panel */}
      <div className="absolute right-0 bottom-[11%] left-0 px-4 text-center font-serif-en text-[11px] font-bold tracking-[0.3em] text-gold uppercase drop-shadow sm:text-sm">
        {isLeft ? "R. Santhosh Kumar" : "M. Mercy Rani"}
      </div>

      {/* handle */}
      <div
        className={`handle-shine absolute top-1/2 h-12 w-12 -translate-y-1/2 rounded-full border-2 border-gold shadow-[0_0_20px_rgba(212,175,55,0.5)] ${
          isLeft ? "right-4" : "left-4"
        }`}
        style={{
          background:
            "radial-gradient(circle at 35% 30%, var(--gold-soft), color-mix(in oklab, var(--gold) 80%, black))",
        }}
        aria-hidden
      >
        <div className="absolute inset-1.5 rounded-full border border-gold/60" />
      </div>

      {/* sheen */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="sheen absolute inset-y-0 w-1/3"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklab, var(--gold-soft) 25%, transparent), transparent)",
          }}
        />
      </div>
    </div>
  );
}

function Dust() {
  const motes = Array.from({ length: 24 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {motes.map((_, i) => {
        const left = (i * 37) % 100;
        const size = 2 + ((i * 7) % 5);
        return (
          <span
            key={i}
            className="dust absolute bottom-0 rounded-full bg-gold/80 shadow-[0_0_8px_rgba(212,175,55,0.8)]"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              ["--dx" as string]: `${((i % 5) - 2) * 26}px`,
              animationDuration: `${8 + (i % 6) * 2.5}s`,
              animationDelay: `${(i % 9) * 0.9}s`,
            }}
          />
        );
      })}
    </div>
  );
}

export function DoorReveal({ children }: { children: ReactNode }) {
  const [state, setState] = useState<"closed" | "opening" | "open">("closed");
  const opening = state === "opening";

  const open = () => {
    if (state !== "closed") return;
    setState("opening");
    window.setTimeout(() => setState("open"), 2300);
  };

  return (
    <div className="relative">
      <BgmPlayer autoPlayTrigger={state === "opening" || state === "open"} />
      {children}

      {state !== "open" && (
        <div
          role="button"
          tabIndex={0}
          onClick={open}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") open();
          }}
          aria-label="அழைப்பிதழைத் திறக்க — Tap to open the invitation"
          className={`fixed inset-0 z-50 cursor-pointer overflow-hidden select-none ${opening ? "veil-out" : ""}`}
          style={{
            background:
              "radial-gradient(120% 90% at 50% 55%, color-mix(in oklab, var(--navy) 70%, black), color-mix(in oklab, var(--navy) 30%, black) 70%, black)",
          }}
        >
        <Dust />
        <GoldenDust className="pointer-events-none absolute inset-0 z-10" />

        {/* warm light behind the doors */}
        <div
          className={`pointer-events-none absolute top-1/2 left-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full ${
            opening ? "light-bloom" : "opacity-40"
          }`}
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--gold-soft) 85%, transparent), transparent 62%)",
          }}
          aria-hidden
        />

        <div className="relative flex h-full w-full items-center justify-center px-4">
          <div className="relative flex h-full w-full max-w-2xl flex-col justify-end">
            {/* stone arch frame */}
            <div
              className="absolute inset-x-0 top-[3%] bottom-[7%] rounded-t-[999px] border-2 border-gold/40"
              style={{
                background: "color-mix(in oklab, var(--navy) 60%, black)",
                boxShadow: "0 0 90px -20px color-mix(in oklab, var(--gold) 45%, transparent)",
              }}
              aria-hidden
            />

            {/* tympanum with rose window */}
            <div className="absolute inset-x-0 top-[3.5%] flex h-[23%] items-center justify-center">
              <RoseWindow className="rose-glow h-full w-auto max-w-[46%] text-gold" />
            </div>

            {/* doors */}
            <div
              className="relative mx-[3%] mb-[7%] h-[70%]"
              style={{ perspective: "2200px", transformStyle: "preserve-3d" }}
            >
              {/* light seam between doors */}
              <div
                className={`pointer-events-none absolute inset-y-0 left-1/2 z-20 -translate-x-1/2 bg-gold-soft ${
                  opening ? "seam-grow" : "w-[2px] opacity-40"
                }`}
                aria-hidden
              />
              <div className="flex h-full w-full">
                <div
                  className={`relative h-full w-1/2 origin-left ${opening ? "door-open-left" : ""}`}
                  style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                >
                  <DoorPanel side="left" />
                  <div className={`pointer-events-none absolute inset-0 bg-black ${opening ? "door-shade" : "opacity-0"}`} aria-hidden />
                </div>
                <div
                  className={`relative h-full w-1/2 origin-right ${opening ? "door-open-right" : ""}`}
                  style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                >
                  <DoorPanel side="right" />
                  <div className={`pointer-events-none absolute inset-0 bg-black ${opening ? "door-shade" : "opacity-0"}`} aria-hidden />
                </div>
              </div>
            </div>

            {/* threshold light pool */}
            <div
              className="pointer-events-none absolute inset-x-[6%] bottom-[4%] h-[6%] rounded-[50%] blur-md"
              style={{ background: "color-mix(in oklab, var(--gold-soft) 55%, transparent)" }}
              aria-hidden
            />
          </div>
        </div>

        <div
          className={`pointer-events-none absolute inset-x-0 bottom-5 flex flex-col items-center gap-2 px-6 text-center transition-opacity duration-500 ${
            opening ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="rounded-full border border-gold/50 bg-navy/70 px-5 py-1.5 font-serif-en text-[11px] tracking-[0.22em] text-gold-soft uppercase sm:text-xs">
            R. Santhosh Kumar &amp; M. Mercy Rani
          </span>
          <span className="animate-pulse font-tamil text-sm text-ivory/85 sm:text-base">
            கதவைத் திறக்க தொடவும் ✦ Tap to open
          </span>
        </div>
      </div>
      )}
    </div>
  );
}
