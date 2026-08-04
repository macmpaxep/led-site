import fs from "node:fs";
import path from "node:path";

function getWorkImages(): string[] {
  try {
    const dir = path.join(process.cwd(), "public", "works");
    const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
    return files.sort().map((f) => `/works/${f}`);
  } catch {
    return [];
  }
}

export default function OurWorks() {
  const images = getWorkImages();
  const placeholders = Math.max(0, 8 - images.length);

  return (
    <section className="bg-navy scanline relative overflow-hidden">
      <div className="pixel-grid pixel-grid-fade absolute inset-0 opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="mb-8">
          <p className="mono text-[11px] tracking-[0.2em] uppercase text-cyan mb-2">Портфолио</p>
          <h2 className="display text-white text-2xl md:text-3xl font-bold">Наши работы</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt="Реализованный проект LED-экрана"
              className="w-full aspect-[4/3] object-cover rounded-lg border border-white/10"
            />
          ))}
          {Array.from({ length: placeholders }).map((_, i) => (
            <div
              key={`ph-${i}`}
              className="aspect-[4/3] rounded-lg border border-dashed border-white/15 bg-white/[0.03] flex items-center justify-center text-white/25 text-xs text-center p-3"
            >
              Добавьте фото в /public/works
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
