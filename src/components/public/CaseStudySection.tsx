import { publishedCaseStudies } from "@/content/case-studies";

export function CaseStudySection() {
  if (publishedCaseStudies.length === 0) {
    return null;
  }

  return (
    <section className="bg-[var(--pb-cream)] px-5 py-16 text-[var(--pb-black)] md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 border-y border-[rgba(4,5,4,0.18)] py-8 lg:grid-cols-[0.48fr_0.52fr]">
          <h2 className="pb-text-balance font-[var(--font-display)] text-5xl font-semibold leading-none md:text-7xl" data-reveal>
            Deployment stories.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-[var(--pb-graphite)] md:text-lg" data-reveal>
            Public case studies show approved placement stories and the operational model behind them. Drafts stay out of public view until they are ready.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {publishedCaseStudies.map((caseStudy) => (
            <article className="border-t border-[rgba(4,5,4,0.18)] pt-7" data-reveal key={caseStudy.slug}>
              <p className="text-sm font-extrabold text-[var(--pb-green-dark)]">
                {caseStudy.venueType} / {caseStudy.city}
              </p>
              <h3 className="mt-3 font-[var(--font-display)] text-4xl font-semibold leading-none md:text-5xl">
                {caseStudy.title}
              </h3>
              <p className="mt-5 text-base leading-7 text-[var(--pb-graphite)]">{caseStudy.summary}</p>

              <dl className="mt-6 grid gap-3 sm:grid-cols-3">
                {caseStudy.metrics.map((metric) => (
                  <div className="border border-[rgba(4,5,4,0.14)] p-4" key={`${caseStudy.slug}-${metric.label}`}>
                    <dt className="text-xs font-extrabold uppercase text-[var(--pb-stone)]">{metric.label}</dt>
                    <dd className="mt-2 font-[var(--font-display)] text-2xl font-semibold leading-none text-[var(--pb-green-dark)]">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 grid gap-3 text-sm leading-6 text-[var(--pb-graphite)]">
                {caseStudy.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
