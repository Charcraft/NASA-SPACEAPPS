"use client";

import { useEffect, useRef, useState } from "react";

export function EmergencyTimer() {
  const [seconds, setSeconds] = useState(0);
  const [metronomeOn, setMetronomeOn] = useState(false);
  const [beatCount, setBeatCount] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!metronomeOn) {
      setBeatCount(0);
      return;
    }
    const intervalMs = Math.round(60000 / 110); // 110 compresiones por minuto
    const id = setInterval(() => {
      setBeatCount((c) => {
        const next = (c % 30) + 1;
        try {
          if (!audioCtxRef.current) {
            const Ctx =
              window.AudioContext ||
              (window as unknown as { webkitAudioContext: typeof AudioContext })
                .webkitAudioContext;
            audioCtxRef.current = new Ctx();
          }
          const ctx = audioCtxRef.current;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.frequency.value = next === 1 ? 880 : 620;
          gain.gain.value = 0.06;
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.045);
        } catch {
          // Audio bloqueado o sin salida
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(id);
  }, [metronomeOn]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="rounded-xl border border-[#1C2029] bg-[#101217] p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <span
            className={`h-2.5 w-2.5 rounded-full transition-transform ${
              metronomeOn && beatCount % 2 === 1
                ? "scale-125 bg-[#ECEFF4]"
                : "bg-[#484F5C]"
            }`}
          />
          <div>
            <p className="text-xl font-normal text-[#ECEFF4]">
              110 compresiones / min
            </p>
            <p className="mt-0.5 text-xs text-[#7D8594]">
              Profundidad de 5 a 6 cm · Relación 30:2 · Tiempo activo {mm}:{ss}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMetronomeOn((v) => !v)}
          className={`rounded-lg px-4 py-2 text-xs font-medium transition-colors ${
            metronomeOn
              ? "bg-[#ECEFF4] text-[#0A0B0E]"
              : "border border-[#262B36] bg-[#161922] text-[#ECEFF4] hover:border-[#ECEFF4]"
          }`}
        >
          {metronomeOn
            ? `Pulso activo (${beatCount}/30)`
            : "Activar guía sonora"}
        </button>
      </div>
    </div>
  );
}
