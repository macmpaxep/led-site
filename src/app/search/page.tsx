import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { categoryBySlug } from "@/data/categories";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim().toLowerCase();

  const results = query
    ? products.filter((p) => {
        const category = categoryBySlug(p.category);
        const haystack = [p.name, p.application, category?.label ?? "", category?.title ?? ""]
          .join(" ")
          .toLowerCase();
        return haystack.includes(query);
      })
    : [];

  return (
    <>
      <PageHeader
        eyebrow="Поиск"
        title={q ? `Результаты по запросу «${q}»` : "Поиск по каталогу"}
        intro={`Найдено моделей: ${results.length}`}
      />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        {results.length === 0 ? (
          <p className="text-slate">
            Ничего не найдено. Попробуйте название серии (например, «FA») или тип экрана
            (например, «наружные»).
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {results.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
