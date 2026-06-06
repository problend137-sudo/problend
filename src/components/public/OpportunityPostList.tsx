import { listPublishedOpportunityPosts } from "@/db/queries/opportunities";
import type { OpportunityPost } from "@/db/schema";
import { OpportunityApplicationForm } from "./OpportunityApplicationForm";

const categoryLabels: Record<string, string> = {
  operator: "Operator",
  venue_access: "Venue Access",
  distributor: "Distributor",
  strategic_introduction: "Strategic Introduction"
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
  title = "Published Opportunities",
  body = "Browse open ProBlend partnership and placement opportunities."
}: {
  title?: string;
  body?: string;
}) {
  const posts = await getPublishedPosts();

  return (
    <section className="bg-[var(--pb-black)] px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 border-t border-[var(--pb-line)] pt-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <h2 className="font-[var(--font-display)] text-5xl font-semibold leading-[0.95] text-[var(--pb-cream)] md:text-7xl">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--pb-muted)]">{body}</p>
          </div>

          <div className="grid gap-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <article className="border-b border-[var(--pb-line)] pb-8" key={post.id}>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold uppercase text-[var(--pb-dim)]">
                    <p>{categoryLabels[post.category] ?? post.category}</p>
                    <p>{modelLabels[post.commercialModel] ?? post.commercialModel}</p>
                    <p>{post.locationScope}</p>
                  </div>
                  <h3 className="mt-4 font-[var(--font-display)] text-4xl font-semibold leading-none text-[var(--pb-cream)]">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-base leading-8 text-[var(--pb-muted)]">{post.summary}</p>

                  {post.requirements.length > 0 ? (
                    <div className="mt-5 grid gap-2">
                      {post.requirements.map((requirement) => (
                        <p className="border-t border-[var(--pb-line)] pt-2 text-sm leading-6 text-[var(--pb-muted)]" key={requirement}>
                          {requirement}
                        </p>
                      ))}
                    </div>
                  ) : null}

                  <OpportunityApplicationForm opportunityPostId={post.id} />
                </article>
              ))
            ) : (
              <div className="border-y border-[var(--pb-line)] py-8">
                <p className="font-[var(--font-display)] text-3xl font-semibold text-[var(--pb-cream)]">
                  No published opportunities are open right now.
                </p>
                <p className="mt-3 text-base leading-7 text-[var(--pb-muted)]">
                  Venue, operator, distributor, and strategic introduction opportunities can still be submitted directly.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
