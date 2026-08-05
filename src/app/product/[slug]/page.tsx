import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, productBySlug, productsByCategory } from "@/data/products";
import { categoryBySlug } from "@/data/categories";
import ProductCard from "@/components/ProductCard";
import ProductRequestButton from "@/components/ProductRequestButton";
import ProductImage from "@/components/ProductImage";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — DOSLED`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();
  const category = categoryBySlug(product.category);
  const related = productsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="bg-mist">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 text-sm text-slate flex items-center gap-2">
        <Link href="/" className="hover:text-cyan-dim">
          Главная
        </Link>
        <span>/</span>
        <Link href={`/category/${product.category}`} className="hover:text-cyan-dim">
          {category?.label}
        </Link>
        <span>/</span>
        <span className="text-navy font-medium">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-16 grid lg:grid-cols-2 gap-10">
        <ProductImage slug={product.slug} name={product.name} pixelPitch={product.pixelPitch} />

        <div>
          <p className="mono text-[11px] tracking-[0.2em] uppercase text-cyan-dim mb-2">
            {category?.label}
          </p>
          <h1 className="display text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-slate leading-relaxed mb-6">{product.description}</p>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <Spec label="Шаг пикселя" value={product.pixelPitch} />
            <Spec label="Яркость" value={product.brightness} />
            <Spec label="Частота обновления" value={product.refreshRate} />
            <Spec label="Класс защиты" value={product.ipRating} />
            <Spec label="Размер кабинета" value={product.cabinetSize} />
            <Spec label="Вес конструкции" value={product.weight} />
          </div>

          <div className="rounded-xl border border-line/15 bg-white p-5 mb-8">
            <p className="text-xs font-semibold text-slate uppercase tracking-wide mb-2">
              Применение
            </p>
            <p className="text-sm">{product.application}</p>
          </div>

          <ProductRequestButton productName={product.name} />
        </div>
      </div>

      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-16">
          <h2 className="display text-xl font-bold mb-5">Похожие модели</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line/15 bg-white px-4 py-3">
      <p className="text-[11px] text-slate uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-sm font-semibold mono">{value}</p>
    </div>
  );
}
