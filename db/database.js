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
            SELECT id, project_id, src, alt FROM project_images
            WHERE visible = 1
            ORDER BY sort_order, id
        `).all();

        const pages = db.prepare(`
            SELECT id, slug, title, heading, subheading, image, image_alt, meta_title, meta_description
            FROM pages
        `).all();

        const paragraphs = db.prepare(`
            SELECT id, page_id, lead, body FROM page_paragraphs
            WHERE visible = 1
            ORDER BY sort_order, id
        `).all();

        const pageItems = db.prepare(`
            SELECT id, page_id, image, alt, image_title, link FROM page_items
            WHERE visible = 1
            ORDER BY sort_order, id
        `).all();

        const translations = new Map(db.prepare('SELECT entity, entity_id, field, language, value FROM translations')
            .all().map(({ entity, entity_id, field, language, value }) => [`${entity}:${entity_id}:${field}:${language}`, value]));
        const localize = (entity, row, language) => Object.fromEntries(Object.entries(row).map(([field, value]) =>
            [field, translations.get(`${entity}:${row.id}:${field}:${language}`) ?? value]));
        const build = (language) => {
            const localizedSite = localize('site', site, language);
            const localizedCategories = categories.map((row) => localize('categories', row, language));
            const localizedProjects = projects.map((row) => localize('projects', row, language));
            const localizedImages = images.map((row) => localize('project_images', row, language));
            const localizedPages = pages.map((row) => localize('pages', row, language));
            const localizedParagraphs = paragraphs.map((row) => localize('page_paragraphs', row, language));
            const localizedItems = pageItems.map((row) => localize('page_items', row, language));
            return {
                site: {
                    name: localizedSite.name,
                    url: localizedSite.url,
                    description: localizedSite.description,
                    defaultImage: localizedSite.default_image,
                    ownerName: localizedSite.owner_name,
                    ownerTitle: localizedSite.owner_title,
                    copyright: localizedSite.copyright,
                    city: localizedSite.city,
                    country: localizedSite.country,
                    founded: localizedSite.founded,
                    email: localizedSite.email,
                    phone: localizedSite.phone,
                    instagramUrl: localizedSite.instagram_url,
                },
                categories: localizedCategories.map((category) => ({
                    slug: category.slug,
                    name: category.name,
                    projects: localizedProjects
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
                            images: localizedImages
                                .filter((image) => image.project_id === project.id)
                                .map(({ src, alt }) => ({ src, alt })),
                        })),
                })),
                pages: Object.fromEntries(localizedPages.map((page) => [page.slug, {
                    slug: page.slug,
                    title: page.title,
                    heading: page.heading,
                    subheading: page.subheading,
                    image: page.image,
                    imageAlt: page.image_alt,
                    metaTitle: page.meta_title,
                    metaDescription: page.meta_description,
                    paragraphs: localizedParagraphs
                        .filter((paragraph) => paragraph.page_id === page.id)
                        .map(({ lead, body }) => ({ lead, body })),
                    items: localizedItems
                        .filter((item) => item.page_id === page.id)
                        .map((item) => ({
                            image: item.image,
                            alt: item.alt,
                            imageTitle: item.image_title,
                            link: item.link,
                        })),
                }])),
            };
        };
        return { en: build('en'), el: build('el') };
    });
}