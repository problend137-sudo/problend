# Next Session Prompt: Redo ProBlend Task 4 Public Website UI

Paste this prompt into the next Codex session.

---

You are continuing work in `/Users/hemishbiswas/Documents/problend` on the ProBlend Digital Operating System.

The previous Task 4 implementation technically created public pages, but the UI quality is unacceptable and must be redone before moving to Task 5.

Do not continue to Task 5 yet.

Your job in this session is to redo **Task 4: Content System, Public Routes, And Legal Pages** with a real ProBlend public website UI that is visually close to the original website, significantly higher quality, and not generic AI/SaaS/wireframe design.

## Why This Redo Exists

The current rebuilt public UI is not acceptable:

- It has no real image assets on the checked public routes. Local inspection showed `imageCount: 0` on `/`, `/about`, `/product-offerings`, `/business-solutions`, and `/contact`.
- The current home page uses a fake CSS box as the vending machine/product visual.
- The current public site looks like dark wireframe cards, not like ProBlend.
- It does not preserve the original website's image-led direction.
- It does not use the UI/UX Pro Max skill output as an actual design constraint.
- It should not move forward to forms, forecasting, or admin until the public website feels right.

The original ProBlend home page at `https://www.problend.co.in/` has a dark, image-led mood:

- Black header with compact ProBlend logo.
- Hero with real gym background and large green vending machine/product visual.
- Original hero copy: `Fuel your fitness, one shake at a time.`
- `How it Works` CTA styled simply.
- `Not Just Another Vending Machine` centered section.
- Three circular visual feature moments: protein powder, machine interaction, machine purchase/hygiene.
- Large full-bleed machine close-up section.
- Lower visual sections for machine closer look and behind-the-scenes wellness.
- Footer/logo/contact/policy content.

The redo must keep the business content but rebuild the visual execution.

## Mandatory Context

Read these files before editing:

1. `docs/superpowers/specs/2026-06-05-problend-digital-operating-system-design.md`
2. `docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`
3. `docs/supabase.md`
4. `docs/superpowers/prompts/NEXT_SESSION.md`
5. `.codex/skills/ui-ux-pro-max/SKILL.md`

Also inspect the current public implementation:

- `src/app/(public)/page.tsx`
- `src/app/(public)/about/page.tsx`
- `src/app/(public)/how-it-works/page.tsx`
- `src/app/(public)/product-offerings/page.tsx`
- `src/app/(public)/business-solutions/page.tsx`
- `src/app/(public)/contact/page.tsx`
- `src/components/public/PublicHeader.tsx`
- `src/components/public/PublicFooter.tsx`
- `src/app/globals.css`
- `src/content/site.ts`
- `src/content/products.ts`
- `src/content/legal.ts`

## Mandatory Skills And Agents

You must explicitly use:

- `superpowers:subagent-driven-development` for the implementation workflow.
- Sub-agents for independent work. Use at least three sub-agents:
  - One sub-agent to audit the original website and current implementation side by side.
  - One sub-agent to review the UIPro-derived design direction before implementation.
  - One sub-agent to review the final rendered UI, screenshots, and diff before finalizing.
- `build-web-apps:frontend-app-builder` before frontend implementation.
- `build-web-apps:frontend-testing-debugging` or Browser/in-app browser verification after rendering local pages.
- `superpowers:verification-before-completion` before claiming anything is complete.
- UI/UX Pro Max from `.codex/skills/ui-ux-pro-max/SKILL.md`.

If a named skill is unavailable, state that briefly and continue with the closest available workflow.

## Required UIPro Usage

Before editing UI, run the UIPro design-system search from the repo root:

```bash
python3 .codex/skills/ui-ux-pro-max/scripts/search.py "premium fitness nutrition vending machine image-led dark website" --design-system --project-name "ProBlend Task 4 Redo" --format markdown
```

Also run these targeted searches:

```bash
python3 .codex/skills/ui-ux-pro-max/scripts/search.py "athletic condensed premium typography" --domain typography --max-results 5
python3 .codex/skills/ui-ux-pro-max/scripts/search.py "image led hero visual hierarchy product landing" --domain landing --max-results 5
python3 .codex/skills/ui-ux-pro-max/scripts/search.py "premium dark product imagery fitness" --domain style --max-results 5
```

Use the output, especially:

- Barlow Condensed for heading/display.
- Barlow for body/UI.
- Image-led hero, not fake UI cards.
- Dark premium/OLED base with high contrast.
- Storytelling sections with real visual progression.
- Large image moments, not repeated bordered card grids.

Do not merely run the skill and ignore it.

## Higgsfield And Asset Guidance

Higgsfield CLI and skills are installed, but the account may be on a free plan with 0 credits. Check before relying on generated assets:

```bash
higgsfield account status --no-color
```

If credits are available, use the Higgsfield skills/CLI to create or improve ProBlend-like product/hero imagery.

If credits are not available, use the original website as the source-of-truth asset base:

1. Inspect `https://www.problend.co.in/`.
2. Extract real image URLs from the original site with Playwright or browser tooling.
3. Download the useful public-site images into `public/images/problend/`.
4. Name assets clearly, for example:
   - `hero-gym-machine.jpg`
   - `protein-powder.jpg`
   - `machine-interaction.jpg`
   - `machine-purchase.jpg`
   - `machine-closeup.jpg`
   - `machine-front.jpg`
   - `behind-scenes.jpg`
   - `problend-logo.png` or `.svg`
5. Create a short asset manifest in `src/content/site.ts` or `src/content/assets.ts`.

Do not hotlink original Wix images in production code unless downloading fails and you document the blocker.

## Product Guardrails

Keep these constraints active:

- Public website must remain recognizably ProBlend.
- The new version should feel like the original ProBlend site was rebuilt by a strong agency, not replaced by a generic SaaS template.
- Preserve original business copy and page labels.
- Preserve the original public nav labels: Home, About Us, How It Works, Product Offerings, Business Solutions, Contact Us.
- Preserve official contact details and policy links.
- Do not migrate Wix demo-store products.
- Do not expose admin dashboards, scoring internals, export tooling, audit logs, forecast configuration, or internal route mechanics publicly.
- No public visitor accounts. V1 uses built-in admin auth later.
- Do not implement Task 5 forms, server actions, placement forecasting, forecast persistence, admin auth, dashboards, exports, or Task 6+ behavior in this session.

## Supabase Context

This Task 4 redo should not touch Supabase migrations or database code, but carry this context forward in the next handoff:

- Project URL: `https://tueqoqusbxeldxnnarlv.supabase.co`
- Project ref: `tueqoqusbxeldxnnarlv`
- Organization id: `xgejdxtkxjnrwdnocjzn`
- Region: `South Asia (Mumbai)`
- Region code: `ap-south-1`

Use `npx supabase`, not a global `supabase` binary, for future Supabase work.

## Visual Requirements

The redo must satisfy these concrete visual requirements:

1. Home hero uses a real visual asset or generated bitmap image with a gym/machine/product signal. No CSS-only fake vending machine.
2. Header uses the real ProBlend logo if extractable. Do not use a generic `PB` square unless the original logo cannot be obtained.
3. Home first viewport keeps the original hero copy and gives a hint of the next section on desktop and mobile.
4. The `Not Just Another Vending Machine` section is centered and visually close to the original rhythm.
5. The three feature moments use circular or strongly image-led visuals, not icon-only cards.
6. Include a large full-bleed or near full-bleed machine close-up / product-machine visual section.
7. Product Offerings shows the four real flavours with stronger product visual treatment.
8. Business Solutions feels like venue partnership/protein infrastructure, not an internal operations dashboard.
9. Contact page uses original contact information and a polished static contact shell, but no functional form action yet.
10. Legal pages remain clean and official, visually quiet, and footer-accessible.
11. Mobile views must not overflow horizontally.
12. Buttons/links must not look like generic AI-template pill buttons. Prefer restrained original-style CTAs unless a clear button is needed.

## Files In Scope

You may modify:

- `src/app/(public)/page.tsx`
- `src/app/(public)/about/page.tsx`
- `src/app/(public)/how-it-works/page.tsx`
- `src/app/(public)/product-offerings/page.tsx`
- `src/app/(public)/business-solutions/page.tsx`
- `src/app/(public)/contact/page.tsx`
- `src/app/(public)/placement-estimate/page.tsx`
- `src/app/(public)/submit-opportunity/page.tsx`
- `src/app/(public)/privacy-policy/page.tsx`
- `src/app/(public)/terms-and-conditions/page.tsx`
- `src/app/(public)/cancellation-and-refunds/page.tsx`
- `src/app/(public)/shipping-policy/page.tsx`
- `src/components/public/PublicHeader.tsx`
- `src/components/public/PublicFooter.tsx`
- `src/components/public/PolicyPage.tsx`
- New public presentation components under `src/components/public/`
- `src/content/site.ts`
- `src/content/products.ts`
- `src/content/legal.ts` only if copy display requires minor structure, not legal meaning changes.
- `src/app/globals.css`
- `src/tests/content/site-content.test.ts`
- New asset files under `public/images/problend/`

Do not modify database schema, Supabase migrations, admin routes, or Task 5+ feature/action files.

## Required Execution Flow

1. Check git status. Do not overwrite unrelated user changes.
2. Read the mandatory docs and current Task 4 code.
3. Use sub-agents as required above.
4. Inspect the original website:

```bash
node - <<'NODE'
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('https://www.problend.co.in/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(9000);
  await page.screenshot({ path: '/tmp/problend-original-home.png', fullPage: true });
  console.log(JSON.stringify({
    title: await page.title(),
    imageCount: await page.locator('img').count(),
    textStart: (await page.locator('body').innerText()).slice(0, 500).replace(/\s+/g, ' ')
  }, null, 2));
  await browser.close();
})();
NODE
```

5. Inspect the current local implementation before editing:

```bash
npm run dev
```

Then capture:

```bash
node - <<'NODE'
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: '/tmp/problend-current-home.png', fullPage: true });
  console.log(JSON.stringify({
    imageCount: await page.locator('img').count(),
    sectionCount: await page.locator('section').count()
  }, null, 2));
  await browser.close();
})();
NODE
```

6. Run the UIPro commands from this prompt and summarize the design constraints before coding.
7. Rebuild Task 4 visual UI only.
8. Preserve content tests and add or update assertions that fail if real ProBlend products are replaced by Wix demo products.
9. Run:

```bash
npm run test -- src/tests/content/site-content.test.ts
npm run typecheck
npm run lint
npm run build
```

10. Run browser/Playwright visual verification after the rebuild. Required checks:

```bash
node - <<'NODE'
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const routes = ['/', '/about', '/how-it-works', '/product-offerings', '/business-solutions', '/contact'];
  const results = [];
  for (const route of routes) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto('http://localhost:3000' + route, { waitUntil: 'networkidle' });
    results.push({
      route,
      h1: await page.locator('h1').first().textContent().catch(() => null),
      imageCount: await page.locator('img').count(),
      horizontalOverflow: await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth),
      privateLeak: /admin dashboard|scoring internals|export tooling|audit logs|forecast configuration|internal route mechanics/i.test(document.body.innerText)
    });
    await page.close();
  }
  const home = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await home.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await home.screenshot({ path: '/tmp/problend-redone-home-1280.png', fullPage: true });
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await mobile.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await mobile.screenshot({ path: '/tmp/problend-redone-home-390.png', fullPage: true });
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
NODE
```

Required result:

- `/` must have real images. It should not report `imageCount: 0`.
- Public routes must not leak private system terms.
- No checked route may have horizontal overflow.
- Home desktop and mobile screenshots must look like a ProBlend site, not a generic dark card grid.

11. Manually inspect screenshots with `view_image` if available:

- `/tmp/problend-original-home.png`
- `/tmp/problend-redone-home-1280.png`
- `/tmp/problend-redone-home-390.png`

12. Commit the redo with:

```bash
git add src/app/\(public\) src/components/public src/content src/app/globals.css src/tests/content/site-content.test.ts public/images/problend
git commit -m "fix: redo ProBlend public website visual direction"
```

13. Create or overwrite `docs/superpowers/prompts/NEXT_SESSION.md` with the next paste-ready prompt. Only after Task 4 redo passes should the next prompt move to:

`Task 5: Public Forms And Server-Side Acquisition Actions`

The new prompt must include:

- Latest commit hash.
- What was redone.
- Screenshots captured and where.
- Verification commands and exact pass/fail status.
- Files created/modified.
- Any blockers or deviations.
- Explicit instruction to use sub-agents and required Superpowers skills.
- Supabase project details from `docs/supabase.md`.
- Reminder not to one-shot the whole product.

14. Commit the handoff file:

```bash
git add docs/superpowers/prompts/NEXT_SESSION.md
git commit -m "docs: add next session handoff"
```

## Final Response Requirements

In the final response, report:

- That Task 4 was redone, not Task 5.
- Verification results.
- Screenshot paths used for visual comparison.
- Commit hash or hashes.
- Path to `docs/superpowers/prompts/NEXT_SESSION.md`.
- Whether any work remains or was blocked.

Do not claim completion without running verification commands and visually inspecting the rebuilt UI.
