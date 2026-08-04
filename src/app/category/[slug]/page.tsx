import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import { categories, categoryBySlug } from "@/data/categories";
import { productsByCategory } from "@/data/products";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.title} — AGE LED`,
    description: category.intro,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) notFound();
  const items = productsByCategory(slug);

  return (
    <>
      <PageHeader eyebrow="Категория" title={category.title} intro={category.intro} />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <p className="text-sm text-slate mb-6">
          Найдено моделей: <span className="font-semibold text-navy">{items.length}</span>
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </>
  );
}
