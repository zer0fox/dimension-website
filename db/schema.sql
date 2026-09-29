PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS categories (
    id          INTEGER PRIMARY KEY,
    slug        TEXT    NOT NULL UNIQUE,
    name        TEXT    NOT NULL,
    sort_order  INTEGER NOT NULL DEFAULT 0,
    visible     INTEGER NOT NULL DEFAULT 1 CHECK (visible IN (0, 1))
);

-- has_page = 0 means the project is only shown as an image in its category listing.
-- listed = 0 keeps the project page reachable by URL but hides it from the listing.
CREATE TABLE IF NOT EXISTS projects (
    id           INTEGER PRIMARY KEY,
    category_id  INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    slug         TEXT    NOT NULL,
    title        TEXT,
    year         INTEGER,
    location     TEXT,
    credit       TEXT,
    description  TEXT,
    has_page     INTEGER NOT NULL DEFAULT 1 CHECK (has_page IN (0, 1)),
    listed       INTEGER NOT NULL DEFAULT 1 CHECK (listed IN (0, 1)),
    sort_order   INTEGER NOT NULL DEFAULT 0,
    UNIQUE (category_id, slug)
);

-- The first visible image of a project is used as its cover.
CREATE TABLE IF NOT EXISTS project_images (
    id          INTEGER PRIMARY KEY,
    project_id  INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    src         TEXT    NOT NULL,
    alt         TEXT    NOT NULL DEFAULT '',
    sort_order  INTEGER NOT NULL DEFAULT 0,
    visible     INTEGER NOT NULL DEFAULT 1 CHECK (visible IN (0, 1))
);

CREATE TABLE IF NOT EXISTS pages (
    id     INTEGER PRIMARY KEY,
    slug   TEXT NOT NULL UNIQUE,
    title  TEXT
);

CREATE TABLE IF NOT EXISTS page_items (
    id           INTEGER PRIMARY KEY,
    page_id      INTEGER NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    image        TEXT    NOT NULL,
    alt          TEXT    NOT NULL DEFAULT '',
    image_title  TEXT,
    link         TEXT,
    sort_order   INTEGER NOT NULL DEFAULT 0,
    visible      INTEGER NOT NULL DEFAULT 1 CHECK (visible IN (0, 1))
);

CREATE INDEX IF NOT EXISTS idx_projects_category    ON projects(category_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_project_images_proj  ON project_images(project_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_page_items_page      ON page_items(page_id, sort_order);