import { listPublishedOpportunityPosts } from "@/db/queries/opportunities";
import type { OpportunityPost } from "@/db/schema";
import { platformAcquisitionContent } from "@/content/site";
import { OpportunityApplicationForm } from "./OpportunityApplicationForm";

const categoryLabels: Record<string, string> = {
  operator: "Operator",
  venue_access: "Venue Access",
  distributor: "Distributor",
  strategic_introduction: "Introduction"
};

const modelLabels: Record<string, string> = {
  purchase: "Purchase",
  revenue_share: "Revenue Share",
  lease_commission: "Lease or Commission",
  distribution: "Distribution",
  co_investment: "Co-investment",
  open_discussion: "Open Discussion"
};

async function getPublishedPosts(): Promise<OpportunityPost[]> {
  try {
    return await listPublishedOpportunityPosts();
  } catch {
    return [];
  }
}

export async function OpportunityPostList({
  body = platformAcquisitionContent.board.body,
  sourcePath = "/business-solutions",
  title = platformAcquisitionContent.board.title
}: {
  title?: string;
  body?: string;
  sourcePath?: string;
}) {
  const posts = await getPublishedPosts();

  return (
    <section className="scroll-mt-28 bg-slate-50 px-5 py-14 text-slate-950 md:px-8 md:py-20" id="open-opportunities">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 border-y border-slate-300 py-8 lg:grid-cols-[0.36fr_0.64fr]">
          <div>
            <h2 className="font-[var(--font-display)] text-5xl font-semibold leading-none md:text-7xl">{title}</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">{body}</p>
          </div>

          {posts.length > 0 ? (
            <div className="grid gap-3">
              {posts.map((post) => (
                <article className="border border-slate-300 bg-white" key={post.id}>
                  <details>
                    <summary className="grid cursor-pointer list-none gap-5 p-5 lg:grid-cols-[1fr_auto] lg:items-start">
                      <span>
                        <span className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-extrabold uppercase tracking-[0.1em] text-slate-500">
                          <span>{categoryLabels[post.category] ?? post.category}</span>
                          <span>{post.locationScope}</span>
                          <span>{modelLabels[post.commercialModel] ?? post.commercialModel}</span>
                        </span>
                        <span className="mt-3 block font-[var(--font-display)] text-3xl font-semibold leading-none text-slate-950">
                          {post.title}
                        </span>
                        <span className="mt-3 block max-w-3xl text-base leading-7 text-slate-600">{post.summary}</span>
                      </span>

                      <span className="flex min-h-11 items-center justify-center border border-slate-950 bg-slate-950 px-5 text-sm font-extrabold text-white transition-colors duration-200 hover:bg-[var(--pb-green)] hover:text-slate-950">
                        Respond
                      </span>
                    </summary>

                    {post.requirements.length > 0 ? (
                      <div className="grid gap-2 border-t border-slate-200 px-5 py-4">
                        {post.requirements.map((requirement) => (
                          <p className="text-sm leading-6 text-slate-600" key={requirement}>
                            {requirement}
                          </p>
                        ))}
                      </div>
                    ) : null}

                    <div className="border-t border-slate-200 px-5 pb-5">
                      <OpportunityApplicationForm opportunityPostId={post.id} sourcePath={sourcePath} />
                    </div>
                  </details>
                </article>
              ))}
            </div>
          ) : (
            <div className="border border-slate-300 bg-white p-6">
              <p className="font-[var(--font-display)] text-3xl font-semibold leading-none text-slate-950">
                {platformAcquisitionContent.board.empty}
              </p>
              <a
                className="mt-6 inline-flex min-h-11 items-center border border-slate-950 bg-slate-950 px-5 text-sm font-extrabold text-white transition-colors duration-200 hover:bg-[var(--pb-green)] hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
                href="#opportunity-intake"
              >
                Share an opportunity
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
