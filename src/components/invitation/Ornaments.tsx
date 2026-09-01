export function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <span
        className="h-px w-16 sm:w-24"
        style={{ background: "var(--gradient-gold)" }}
        aria-hidden
      />
      <span className="text-gold text-xs" aria-hidden>
        ❦
      </span>
      <span
        className="h-px w-16 sm:w-24"
        style={{ background: "var(--gradient-gold)" }}
        aria-hidden
      />
    </div>
  );
}

export function Cross({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 40" className={className} aria-hidden fill="none">
      <path
        d="M10.5 1h3v10H23v3h-9.5v25h-3V14H1v-3h9.5V1z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Dove({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden>
      <path
        d="M4 24c10 4 20 2 27-5 3-3 6-7 11-8 6-1 11 2 14 6-3 1-5 1-7 0 1 3 0 6-2 8 5 3 4 9-1 12-6 4-16 5-24 2-8-3-14-9-18-15z"
        fill="currentColor"
        opacity="0.9"
      />
      <circle cx="50" cy="15" r="1.4" fill="var(--navy)" />
    </svg>
  );
}

export function CornerLeaves({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M6 6c26 8 48 26 62 50" />
        <path d="M6 34c20 6 36 20 46 38" />
        <path d="M34 6c18 8 32 22 40 40" />
      </g>
      <g fill="currentColor" opacity="0.55">
        {[
          [22, 20],
          [40, 34],
          [58, 50],
          [16, 46],
          [34, 60],
          [52, 18],
        ].map(([x, y]) => (
          <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="9" ry="4.6" transform={`rotate(35 ${x} ${y})`} />
        ))}
      </g>
      <g fill="var(--color-ivory)" stroke="currentColor" strokeWidth="1">
        <circle cx="14" cy="66" r="7" />
        <circle cx="66" cy="14" r="5" />
      </g>
    </svg>
  );
}
