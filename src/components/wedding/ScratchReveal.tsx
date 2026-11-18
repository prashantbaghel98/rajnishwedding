import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { wedding } from "@/lib/wedding-data";

export function ScratchReveal({ date }: { date: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const scratchMoves = useRef(0);

  const resetCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const box = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = box.width * ratio;
    canvas.height = box.height * ratio;
    context.scale(ratio, ratio);
    const gradient = context.createLinearGradient(0, 0, box.width, box.height);
    gradient.addColorStop(0, "#b98a41");
    gradient.addColorStop(0.5, "#ead19e");
    gradient.addColorStop(1, "#a97732");
    context.fillStyle = gradient;
    context.fillRect(0, 0, box.width, box.height);
    context.fillStyle = "rgba(95, 23, 39, .72)";
    context.textAlign = "center";
    context.font = "600 13px Manrope, sans-serif";
    context.fillText("SCRATCH TO REVEAL", box.width / 2, box.height / 2 - 7);
    context.font = "12px Manrope, sans-serif";
    context.fillText("Move your finger across the card", box.width / 2, box.height / 2 + 17);
    context.globalCompositeOperation = "destination-out";
  }, []);

  useEffect(() => {
    resetCanvas();
    window.addEventListener("resize", resetCanvas);
    return () => window.removeEventListener("resize", resetCanvas);
  }, [resetCanvas]);

  const scratch = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing || revealed) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const rect = canvas.getBoundingClientRect();
    context.beginPath();
    context.arc(event.clientX - rect.left, event.clientY - rect.top, 25, 0, Math.PI * 2);
    context.fill();
    scratchMoves.current += 1;
    if (scratchMoves.current > 24) setRevealed(true);
  };

  return (
    <div className="relative mx-auto aspect-[2/1] w-full max-w-xl overflow-hidden rounded-sm border border-gold/40 bg-primary p-6 text-center shadow-royal sm:p-10">
      <div className="absolute inset-2 border border-gold/30" aria-hidden="true" />
      <div className="relative flex h-full flex-col items-center justify-center text-primary-foreground">
        <p className="eyebrow text-gold-soft">Save our date</p>
        <p className="mt-3 font-display text-3xl sm:text-5xl">{date}</p>
        <p className="mt-2 text-xs uppercase tracking-[0.25em] text-primary-foreground/70">{wedding.venue.name} · {wedding.cityShort}</p>
      </div>
      {!revealed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full touch-none cursor-crosshair"
          onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); setDrawing(true); }}
          onPointerMove={scratch}
          onPointerUp={() => setDrawing(false)}
          onPointerCancel={() => setDrawing(false)}
          aria-label="Scratch the gold surface to reveal the wedding date"
        />
      )}
      {revealed && (
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="pointer-events-none absolute inset-0 grid place-items-center">
          <Sparkles className="absolute right-8 top-7 size-7 text-gold-soft" />
          <Sparkles className="absolute bottom-8 left-8 size-5 text-gold-soft" />
        </motion.div>
      )}
    </div>
  );
}