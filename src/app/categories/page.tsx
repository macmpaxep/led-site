import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/data/categories";
import { productsByCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "Категории LED-экранов — AGE LED",
  description: "Полный каталог светодиодных экранов по всем категориям.",
};

export default function CategoriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Полный каталог"
        title="Категории LED-экранов"
        intro="Все линейки светодиодных экранов в одном месте. Выберите категорию, чтобы увидеть подробные характеристики и описания."
      />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`#${c.slug}`}
            className="text-sm px-4 py-2 rounded-full border border-line/20 hover:border-cyan hover:text-cyan-dim transition"
          >
            {c.label}
          </Link>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-16 space-y-16">
        {categories.map((c) => {
          const items = productsByCategory(c.slug);
          return (
            <section key={c.slug} id={c.slug} className="scroll-mt-40">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <h2 className="display text-2xl font-bold">{c.title}</h2>
                  <p className="text-slate text-sm mt-1 max-w-xl">{c.intro}</p>
                </div>
                <Link
                  href={`/category/${c.slug}`}
                  className="hidden sm:inline-flex text-sm font-semibold text-cyan-dim hover:text-navy transition items-center gap-1 shrink-0"
                >
                  Открыть раздел →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {items.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
