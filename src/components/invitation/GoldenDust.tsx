import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  pulseSpeed: number;
  pulseAngle: number;
  vx: number;
  vy: number;
  size: number;
}

export function GoldenDust({ className = "fixed inset-0 pointer-events-none z-30" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener("resize", resize);

    // Generate 45 glowing golden dust particles
    const particleCount = 42;
    const particles: Particle[] = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.8 + 1.2,
      baseAlpha: Math.random() * 0.45 + 0.35,
      alpha: Math.random() * 0.5 + 0.3,
      pulseSpeed: Math.random() * 0.03 + 0.015,
      pulseAngle: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.5 + 0.25), // float upwards
      size: Math.random() * 20 + 8, // glow radius
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        p.x += p.vx + Math.sin(p.pulseAngle) * 0.25;
        p.y += p.vy;
        p.pulseAngle += p.pulseSpeed;

        // Pulsing glow alpha
        p.alpha = p.baseAlpha + Math.sin(p.pulseAngle) * 0.25;

        // Wrap around screen boundaries
        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Draw soft glowing gold orb halo
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, `rgba(255, 235, 140, ${Math.min(1, p.alpha * 1.3)})`);
        grad.addColorStop(0.25, `rgba(218, 165, 32, ${Math.min(1, p.alpha * 0.7)})`);
        grad.addColorStop(0.65, `rgba(184, 134, 11, ${Math.min(1, p.alpha * 0.25)})`);
        grad.addColorStop(1, "rgba(212, 175, 55, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw intense sparkling center core
        ctx.fillStyle = `rgba(255, 255, 240, ${Math.min(1, p.alpha * 1.5)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
