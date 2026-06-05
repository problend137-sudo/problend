import Image from "next/image";
import type { products } from "@/content/products";

type Product = (typeof products)[number];

type ProductFlavorCardProps = {
  product: Product;
  index: number;
  compact?: boolean;
};

export function ProductFlavorCard({ product, index, compact = false }: ProductFlavorCardProps) {
  return (
    <article className="group overflow-hidden bg-[var(--pb-cream)] text-[var(--pb-black)]">
      <div className={compact ? "relative h-48 overflow-hidden" : "relative h-64 overflow-hidden"}>
        <Image
          alt={product.visual.alt}
          className="object-cover transition duration-500 group-hover:scale-[1.035]"
          fill
          loading="eager"
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          src={product.visual.src}
          style={{ objectPosition: index === 2 ? "center" : "center" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_28%,rgba(0,0,0,0.58))]" />
        <span
          aria-hidden="true"
          className="absolute bottom-5 left-5 block h-1.5 w-20"
          style={{ backgroundColor: product.accent }}
        />
      </div>
      <div className={compact ? "p-5" : "p-6"}>
        <p className="font-[var(--font-barlow-condensed)] text-2xl font-semibold leading-none text-[var(--pb-bronze)]">
          0{index + 1}
        </p>
        <h3 className="mt-3 font-[var(--font-barlow-condensed)] text-4xl font-semibold leading-none">{product.name}</h3>
        <p className="mt-4 text-sm leading-6 text-[var(--pb-graphite)]">{product.description}</p>
        <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-[rgba(7,7,7,0.16)] pt-4 text-xs">
          <div>
            <dt className="text-[var(--pb-stone)]">Protein</dt>
            <dd className="mt-1 font-semibold">{product.nutrition.protein}</dd>
          </div>
          <div>
            <dt className="text-[var(--pb-stone)]">Sugar</dt>
            <dd className="mt-1 font-semibold">{product.nutrition.sugar}</dd>
          </div>
          <div>
            <dt className="text-[var(--pb-stone)]">Format</dt>
            <dd className="mt-1 font-semibold">{product.nutrition.format}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
