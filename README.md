# Dimension Studio Website v2.1

node version node-v22.20.0
## Languages

Greek is served at the existing URLs (`/`, `/about`, `/projects/...`); English uses the same paths under `/en`. The language selector keeps visitors on the corresponding page.

Content is stored in SQLite at `db/site.db`. Existing text columns hold English. Greek values are in `translations`, keyed by `entity`, `entity_id`, `field`, and `language = 'el'`. If a translation is absent, the English value is used. Schema and starting translations live in `db/migrations/`; run `pnpm db:init` to update an existing database. Navigation and contact form labels are translated in the React templates.