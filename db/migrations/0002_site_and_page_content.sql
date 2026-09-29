-- Moves site-wide and per-page static content from code into the database.

-- Single-row table (id is always 1) for site identity and contact details.
CREATE TABLE site (
    id                     INTEGER PRIMARY KEY CHECK (id = 1),
    name                   TEXT NOT NULL,
    url                    TEXT NOT NULL,
    description            TEXT NOT NULL,
    default_image          TEXT,
    owner_name             TEXT NOT NULL,
    owner_title            TEXT,
    copyright              TEXT,
    city                   TEXT,
    country                TEXT,   -- ISO 3166-1 alpha-2, e.g. GR
    founded                TEXT,
    email                  TEXT,
    phone                  TEXT,
    instagram_url          TEXT,
    contact_form_endpoint  TEXT,
    contact_form_key       TEXT
);

INSERT INTO site (
    id, name, url, description, default_image, owner_name, owner_title, copyright,
    city, country, founded, email, phone, instagram_url, contact_form_endpoint, contact_form_key
) VALUES (
    1,
    'Dimension Studio',
    'https://www.dimensionstudio.gr',
    'Dimension Studio is an architecture and interior design studio in Athens, Greece, founded in 2008 by architect Dimitra Gogi (NTUA). Residential, office and commercial projects.',
    '/img/fb-preview.jpg',
    'Dimitra Gogi',
    'Architect',
    'Dimitra Gogi @ 2025',
    'Athens',
    'GR',
    '2008',
    'dimitra.gogi@gmail.com',
    '(+30) 697 7070 170',
    'https://www.instagram.com/dim_ension/',
    '/post.php',
    'JHNHReLVWpq6LeVYRp3m'
);

-- meta_title / meta_description fall back to generated values when NULL.
ALTER TABLE pages ADD COLUMN heading TEXT;
ALTER TABLE pages ADD COLUMN subheading TEXT;
ALTER TABLE pages ADD COLUMN image TEXT;
ALTER TABLE pages ADD COLUMN image_alt TEXT;
ALTER TABLE pages ADD COLUMN meta_title TEXT;
ALTER TABLE pages ADD COLUMN meta_description TEXT;

-- lead is an optional phrase shown in bold before the body text.
CREATE TABLE page_paragraphs (
    id          INTEGER PRIMARY KEY,
    page_id     INTEGER NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    lead        TEXT,
    body        TEXT    NOT NULL,
    sort_order  INTEGER NOT NULL DEFAULT 0,
    visible     INTEGER NOT NULL DEFAULT 1 CHECK (visible IN (0, 1))
);

CREATE INDEX idx_page_paragraphs_page ON page_paragraphs(page_id, sort_order);

INSERT OR IGNORE INTO pages (slug, title) VALUES
    ('home',      'Home'),
    ('about',     'About'),
    ('contact',   'Contact'),
    ('not-found', 'Page not found');

UPDATE pages SET
    heading = 'CREATIVE STUDIO',
    subheading = 'in Athens',
    meta_title = 'Dimension Studio | Architecture & Interior Design in Athens'
WHERE slug = 'home';

UPDATE pages SET
    heading = 'Dimitra Gogi',
    image = '/img/profile.jpg',
    image_alt = 'Profile Pic',
    meta_title = 'About Dimitra Gogi, Architect | Dimension Studio'
WHERE slug = 'about';

UPDATE pages SET
    meta_title = 'Contact | Dimension Studio'
WHERE slug = 'contact';

UPDATE pages SET
    heading = '404',
    meta_title = 'Page not found | Dimension Studio'
WHERE slug = 'not-found';

INSERT INTO page_paragraphs (page_id, lead, body)
SELECT id, lead, body FROM pages, (
    SELECT 1 AS n, 'Dimension Studio' AS lead, 'was founded at 2008 and is located in Athens.' AS body
    UNION ALL SELECT 2, NULL, 'I have studied Architecture in NTUA, National Technical University of Athens (1999 - 2006) and "Interior Design for Commercial Spaces" in IED, Barcelona (2006 - 2007).'
    UNION ALL SELECT 3, NULL, 'For the past years, I have been involved in various architectural projects (design concepts, site supervision and construction).'
    UNION ALL SELECT 4, NULL, 'Creativity and innovation are my main concerns.'
    ORDER BY n
)
WHERE slug = 'about';

INSERT INTO page_paragraphs (page_id, body)
SELECT id, 'Page not found.' FROM pages WHERE slug = 'not-found';