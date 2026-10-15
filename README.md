# World Himachali — Design 2.0

Separate corporate NGO design concept. Version 1 remains available at https://world-himachali-modern.loyal-earth-4429.chatgpt.site.

## Technology

TypeScript, React 19, Next.js App Router conventions, Tailwind CSS 4, Lucide icons. Hosted using the Vinext compatibility adapter and Cloudflare Workers. This checkout uses the adapter's build scripts; it is not a stock `next build` deployment.

## Develop

Use Node 22.13+ and pnpm. Run `pnpm install`, then `pnpm dev`. Use `pnpm build` for the hosted application. A standard Next.js hosting migration needs changes to the framework scripts and deployment configuration.

## Source map

- `components/Website.tsx`: responsive navigation, homepage sections and inner page presentations.
- `components/ui.tsx`: reusable actions, tags, scroll reveals, counters, SVG contours and tree motif.
- `app/globals.css`: responsive visual system and reduced-motion support.
- `lib/data.ts`: curated community content.
- `lib/stories.json`: article content sourced from WHO.
- `lib/api.ts`: API data, search and contact draft validation.
- `app/api/v2/[resource]/route.ts`: JSON endpoint handlers.
- `public/images`: downloaded reference-site photographs and logo.
- `lib/full-crawl.json`: source crawl snapshot.

## Content API

`GET /api/v2/site`, `/programs`, `/events`, `/people`, `/stories`, `/districts`.

`GET /api/v2/search?q=culture` searches pages, stories, programmes, people and events. Minimum query length is two characters and maximum is 120; result count is capped at 20.

`POST /api/v2/contact` accepts JSON `{ name, email, subject, message }`. It validates the input and returns a `mailto` draft. It never sends or stores a message. Use `/api-guide` for examples.

The API serves the curated content snapshot; it is not a live WordPress integration. There is no CMS, user authentication, membership database or payment processing in this design concept. Membership links to WHO's official registration flow. Policy links open WHO's original website.

## Checks

`node node_modules/typescript/bin/tsc --noEmit`

`node tests/api.mjs`

API checks transpile the real handlers into a temporary directory and exercise content responses, search, draft validation and invalid requests. Browser visual QA is not available in this environment.

## Content notes

The source homepage and refund policy use one-time fee wording, while its registration page lists ₹1,100 for three years. This concept follows the registration page and directs users to confirm terms there. No new beneficiary, fundraising or programme-outcome figures have been invented. Community figures are attributed to WHO. Listed historical events are not presented as upcoming.

The animated globe is illustrative; its decorative points are not geographic membership data.
