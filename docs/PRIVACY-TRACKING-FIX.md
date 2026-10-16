# Visitor privacy: explicit analytics opt-in

The existing site loaded Google Analytics (GA4) and Ahrefs scripts from
`index.html` before the visitor could select "Essential only".
`syncAnalyticsConsent` was a no-op and did not enforce the banner choice.

This proposal removes both scripts from initial HTML and loads them on
the client only after explicit `all` consent is stored. Tracking calls
are suppressed otherwise, including page view events on route changes.
The choice can be revised via "Cookie settings"; revoking optional
analytics forces a reload to prevent further third-party analytics
running in that tab. No mortgage calculator input data is sent by this
change. The GA4 reporting numbers may fall because declined users are
intentionally not tracked.

**Verification before merge**:
- Incognito with empty local storage: no requests to googletagmanager.com
  or analytics.ahrefs.com, including after navigation.
- Choose Essential only: still no analytics requests.
- Choose Accept analytics: only then do the scripts load; one page view
  for the route when clicked, and subsequent route views.
- Reopen Cookie settings and select Essential only: reload, then no
  analytics script requests.
- Test SSR/SSG build, page hydration, and cookie notice on mobile.

This is an engineering privacy correction, **not** a legal compliance
certification or a substitute for a comprehensive CMP review before
AdSense launch.
