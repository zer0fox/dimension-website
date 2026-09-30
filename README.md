# Dimension Studio Website v2.1

node version node-v24
## Languages

Greek is served at the existing URLs (`/`, `/about`, `/projects/...`); English uses the same paths under `/en`. The language selector keeps visitors on the corresponding page.

Content is stored in SQLite at `db/site.db`. Existing text columns hold English. Greek values are in `translations`, keyed by `entity`, `entity_id`, `field`, and `language = 'el'`. If a translation is absent, the English value is used. Schema and starting translations live in `db/migrations/`; run `pnpm db:init` to update an existing database. Navigation and contact form labels are translated in the React templates.

## Contact form on GitHub Pages

The contact form is configured for the public Formspree form ID `xaenvvkp` and posts to `https://formspree.io/f/xaenvvkp`. Verify the form's notification email in Formspree before publishing. To use another form ID later, set the optional GitHub Actions repository variable `FORMSPREE_ID` (Settings > Secrets and variables > Actions > Variables), which the workflow passes as `VITE_FORMSPREE_ID` at build time. You can also set `VITE_FORMSPREE_ID` locally before running `pnpm dev` or `pnpm build`. Invalid override IDs disable the form instead of submitting to a broken endpoint.

Leave Formspree's CAPTCHA enabled under the form's Spam protection settings. Submissions use a standard HTML POST so Formspree can show its managed reCAPTCHA challenge/confirmation page if needed; this is hosted by Formspree, not the website. Both language forms also include Formspree's `_gotcha` honeypot. The free plan currently allows 50 submissions per month. The form ID is public; never put API keys or email credentials in the site build.

After a valid submission, using the browser Back button to return from Formspree clears the fields and restores a localized confirmation on the contact page. Browser Back cannot verify that Formspree accepted the message (for example, if a CAPTCHA was abandoned); Formspree's own confirmation page is the authoritative result. A verified redirect back to this site requires Formspree's paid custom thank-you redirect.
