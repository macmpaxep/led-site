"use client";

import { useEffect, useState } from "react";
import { useRequestModal } from "@/components/RequestModalProvider";

const slides = [
  {
    eyebrow: "Наружные и фасадные решения",
    title: "LED-экраны, которые видно с любой точки города",
    text: "Яркость до 8 000 нит, защита IP65 и работа в диапазоне −40…+60°C — для рекламы, фасадов и стадионов.",
    image: "/works/work-07.jpg",
  },
  {
    eyebrow: "Аренда под ключ",
    title: "Модульные экраны для концертов и мероприятий",
    text: "Сборка за минуты, калиброванный цвет из коробки, доставка и монтаж в Астане и по Казахстану.",
    image: "/works/work-03.jpg",
  },
  {
    eyebrow: "Индивидуальные проекты",
    title: "От прозрачных витрин до креативных инсталляций",
    text: "Кубы, кольца, гибкие панели и напольные покрытия — рассчитаем экран под вашу задачу.",
    image: "/works/work-06.jpg",
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
    <section className="relative w-full overflow-hidden scanline" style={{ background: "var(--crimson-3)" }}>

      {/* Фоновые картинки каждого слайда */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.image}
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.4 }}
          />
        </div>
      ))}

      {/* Градиент для читаемости текста слева */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to right, var(--crimson-3) 30%, rgba(74,14,14,0.6) 65%, transparent 100%)",
        }}
      />

      {/* Пиксельная текстура */}
      <div className="pixel-grid pixel-grid-fade absolute inset-0 z-[2] opacity-25" />

      {/* Декоративное свечение */}
      <div
        className="absolute -right-24 top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-3xl z-[2]"
        style={{ background: "rgba(192,57,43,0.2)" }}
      />

      {/* Текст слайдов */}
      <div className="relative z-[3] max-w-7xl mx-auto px-4 lg:px-8 py-20 md:py-28 min-h-[420px] flex items-center">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-x-4 lg:inset-x-8 max-w-2xl transition-all duration-700 ${
              i === active
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <p
              className="mono text-xs tracking-[0.25em] uppercase mb-4 font-medium"
              style={{ color: "#f39c12" }}
            >
              {s.eyebrow}
            </p>
            <h1 className="display text-white text-3xl md:text-5xl font-bold leading-[1.1] mb-5">
              {s.title}
            </h1>
            <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl">{s.text}</p>
            <button
              onClick={() => open()}
              className="inline-flex items-center gap-2 font-semibold px-6 py-3.5 rounded-full text-white transition hover:opacity-90"
              style={{ background: "var(--red)" }}
            >
              Оставить заявку
              <span aria-hidden>→</span>
            </button>
          </div>
        ))}
      </div>

      {/* Точки навигации */}
      <div className="relative z-[3] flex justify-center gap-2 pb-8">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Слайд ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-8 bg-white" : "w-4 bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
