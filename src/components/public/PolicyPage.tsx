import type { LegalPage } from "@/content/legal";

type PolicyPageProps = {
  page: LegalPage;
};

export function PolicyPage({ page }: PolicyPageProps) {
  return (
    <main className="bg-[var(--pb-cream)] px-5 py-16 text-[var(--pb-black)] md:px-8">
      <article className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold text-[var(--pb-graphite)]">Official policy</p>
        <h1 className="mt-3 font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-none md:text-7xl">
          {page.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--pb-graphite)]">{page.summary}</p>

        <div className="mt-12 grid gap-8">
          {page.sections.map((section) => (
            <section className="border-t border-[rgba(7,7,7,0.16)] pt-6" key={section.heading}>
              <h2 className="font-[var(--font-barlow-condensed)] text-3xl font-semibold">{section.heading}</h2>
              <div className="mt-4 grid gap-4 text-base leading-7 text-[var(--pb-graphite)]">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
