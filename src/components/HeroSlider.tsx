"use client";

import { useEffect, useState } from "react";
import { useRequestModal } from "@/components/RequestModalProvider";

const slides = [
  {
    eyebrow: "Наружные и фасадные решения",
    title: "LED-экраны, которые видно с любой точки города",
    text: "Яркость до 8 000 нит, защита IP65 и работа в диапазоне −40…+60°C — для рекламы, фасадов и стадионов.",
  },
  {
    eyebrow: "Аренда под ключ",
    title: "Модульные экраны для концертов и мероприятий",
    text: "Сборка за минуты, калиброванный цвет из коробки, доставка и монтаж в Астане и по Казахстану.",
  },
  {
    eyebrow: "Индивидуальные проекты",
    title: "От прозрачных витрин до креативных инсталляций",
    text: "Кубы, кольца, гибкие панели и напольные покрытия — рассчитаем экран под вашу задачу.",
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const { open } = useRequestModal();

  useEffect(() => {
    const id = setInterval(() => setActive((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-navy scanline">
      <div className="pixel-grid pixel-grid-fade absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40" />
      <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-cyan/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20 md:py-28 min-h-[420px] flex items-center">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-x-4 lg:inset-x-8 max-w-2xl transition-all duration-700 ${
              i === active
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <p className="mono text-cyan text-xs tracking-[0.25em] uppercase mb-4">{s.eyebrow}</p>
            <h1 className="display text-white text-3xl md:text-5xl font-bold leading-[1.1] mb-5">
              {s.title}
            </h1>
            <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl">{s.text}</p>
            <button
              onClick={() => open()}
              className="inline-flex items-center gap-2 bg-cyan text-navy font-semibold px-6 py-3.5 rounded-full hover:bg-white transition"
            >
              Оставить заявку
              <span aria-hidden>→</span>
            </button>
          </div>
        ))}
      </div>

      <div className="relative flex justify-center gap-2 pb-8">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Слайд ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-8 bg-cyan" : "w-4 bg-white/25"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
