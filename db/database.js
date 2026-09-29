import { DatabaseSync } from 'node:sqlite';
import { existsSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dbDir = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.join(dbDir, 'migrations');

export const DB_PATH = path.join(dbDir, 'site.db');

// Files named NNNN_description.sql; the number becomes PRAGMA user_version once applied.
function listMigrations() {
    return readdirSync(migrationsDir)
        .filter((file) => /^\d+_.+\.sql$/.test(file))
        .map((file) => ({ version: Number.parseInt(file, 10), file }))
        .sort((a, b) => a.version - b.version);
}

function inTransaction(db, callback) {
    db.exec('BEGIN');
    try {
        callback();
        db.exec('COMMIT');
    } catch (error) {
        db.exec('ROLLBACK');
        throw error;
    }
}

function migrate(db) {
    let version = db.prepare('PRAGMA user_version').get().user_version;
    const hasTables = db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'categories'").get();
    // Databases created before migrations existed already match 0001_initial.
    if (version === 0 && hasTables) version = 1;

    for (const migration of listMigrations()) {
        if (migration.version <= version) continue;
        try {
            inTransaction(db, () => {
                db.exec(readFileSync(path.join(migrationsDir, migration.file), 'utf8'));
                db.exec(`PRAGMA user_version = ${migration.version}`);
            });
        } catch (error) {
            throw new Error(`Migration ${migration.file} failed: ${error.message}`, { cause: error });
        }
        version = migration.version;
    }
    db.exec(`PRAGMA user_version = ${version}`);
}

// Creates the database (migrations + seed) or brings an existing one up to date.
export function createDatabase({ reset = false } = {}) {
    if (reset) rmSync(DB_PATH, { force: true });
    const isNew = !existsSync(DB_PATH);

    const db = new DatabaseSync(DB_PATH);
    try {
        db.exec('PRAGMA foreign_keys = ON');
        migrate(db);
        if (isNew) inTransaction(db, () => db.exec(readFileSync(path.join(dbDir, 'seed.sql'), 'utf8')));
    } catch (error) {
        db.close();
        if (isNew) rmSync(DB_PATH, { force: true });
        throw error;
    }
    db.close();
    return isNew;
}

function withDatabase(callback) {
    createDatabase();
    const db = new DatabaseSync(DB_PATH, { readOnly: true });
    try {
        return callback(db);
    } finally {
        db.close();
    }
}

export function getSetting(key) {
    return withDatabase((db) => db.prepare('SELECT value FROM settings WHERE key = ?').get(key)?.value);
}

export function setSetting(key, value) {
    createDatabase();
    const db = new DatabaseSync(DB_PATH);
    try {
        db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value').run(key, value);
    } finally {
        db.close();
    }
}

export function readSiteData() {
    return withDatabase((db) => {
        const site = db.prepare('SELECT * FROM site WHERE id = 1').get();
        if (!site) throw new Error('The site table is empty; it needs exactly one row with id = 1');

        const categories = db.prepare(`
            SELECT id, slug, name FROM categories
            WHERE visible = 1
            ORDER BY sort_order, id
        `).all();

        const projects = db.prepare(`
            SELECT id, category_id, slug, title, year, location, credit, description, has_page, listed
            FROM projects
            ORDER BY sort_order, id
        `).all();

        const images = db.prepare(`
            SELECT project_id, src, alt FROM project_images
            WHERE visible = 1
            ORDER BY sort_order, id
        `).all();

        const pages = db.prepare(`
            SELECT id, slug, title, heading, subheading, image, image_alt, meta_title, meta_description
            FROM pages
        `).all();

        const paragraphs = db.prepare(`
            SELECT page_id, lead, body FROM page_paragraphs
            WHERE visible = 1
            ORDER BY sort_order, id
        `).all();

        const pageItems = db.prepare(`
            SELECT page_id, image, alt, image_title, link FROM page_items
            WHERE visible = 1
            ORDER BY sort_order, id
        `).all();

        return {
            site: {
                name: site.name,
                url: site.url,
                description: site.description,
                defaultImage: site.default_image,
                ownerName: site.owner_name,
                ownerTitle: site.owner_title,
                copyright: site.copyright,
                city: site.city,
                country: site.country,
                founded: site.founded,
                email: site.email,
                phone: site.phone,
                instagramUrl: site.instagram_url,
                contactFormEndpoint: site.contact_form_endpoint,
                contactFormKey: site.contact_form_key,
            },
            categories: categories.map((category) => ({
                slug: category.slug,
                name: category.name,
                projects: projects
                    .filter((project) => project.category_id === category.id)
                    .map((project) => ({
                        slug: project.slug,
                        title: project.title,
                        year: project.year,
                        location: project.location,
                        credit: project.credit,
                        description: project.description,
                        hasPage: project.has_page === 1,
                        listed: project.listed === 1,
                        images: images
                            .filter((image) => image.project_id === project.id)
                            .map(({ src, alt }) => ({ src, alt })),
                    })),
            })),
            pages: Object.fromEntries(pages.map((page) => [page.slug, {
                slug: page.slug,
                title: page.title,
                heading: page.heading,
                subheading: page.subheading,
                image: page.image,
                imageAlt: page.image_alt,
                metaTitle: page.meta_title,
                metaDescription: page.meta_description,
                paragraphs: paragraphs
                    .filter((paragraph) => paragraph.page_id === page.id)
                    .map(({ lead, body }) => ({ lead, body })),
                items: pageItems
                    .filter((item) => item.page_id === page.id)
                    .map((item) => ({
                        image: item.image,
                        alt: item.alt,
                        imageTitle: item.image_title,
                        link: item.link,
                    })),
            }])),
        };
    });
}