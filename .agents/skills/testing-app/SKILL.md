# Testing RepayWise Locally

## Dev Server

- **Start:** `npm run dev` — runs on `http://localhost:8080`
- **Build:** `npm run build` (uses vite-react-ssg — generates static HTML + sitemap)
- **Lint:** `npm run lint`

## Vercel Preview Deployments

Vercel preview URLs (e.g. `https://uk-mortgage-git-<branch>-amitahlawatoxs-projects.vercel.app`) are **protected by Vercel authentication** and return 401 to unauthenticated requests (both curl and browser). To test PR changes, use the local dev server instead.

## Testing Checklist

When testing new pages or features:

1. **Start dev server:** `npm run dev`
2. **Verify HTTP 200:** `curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/<path>`
3. **Visual verification:** Open in Chrome and verify content renders
4. **JSON-LD / structured data:** Use browser console since schemas are rendered client-side by React:
   ```js
   document.querySelectorAll('script[type="application/ld+json"]').forEach((s, i) => console.log(`Schema ${i}:`, JSON.parse(s.textContent)))
   ```
5. **Footer links:** Scroll to bottom of any page to verify footer navigation

## Key URLs to Test

| Page | URL |
|------|-----|
| Homepage | `/` |
| About | `/about` |
| Contact | `/contact` |
| Repayment Calculator | `/calculators/repayment` |
| Lender page (example) | `/calculators/repayment/lloyds-bank` |
| Stamp Duty | `/calculators/stamp-duty` |
| Privacy Policy | `/privacy-policy` |

## Notes

- The site uses **vite-react-ssg** for static site generation — JSON-LD schemas are injected client-side by React components, not in the initial HTML from curl
- Cookie consent banner appears on first visit — dismiss it before testing
- FCA regulatory warning bar at bottom can be dismissed with the X button
- 50 lenders are defined in `src/lib/uk/lenders.ts` — each has a unique description
