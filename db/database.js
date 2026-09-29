import { DatabaseSync } from 'node:sqlite';
import { existsSync, readFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dbDir = path.dirname(fileURLToPath(import.meta.url));

export const DB_PATH = path.join(dbDir, 'site.db');

const readSql = (file) => readFileSync(path.join(dbDir, file), 'utf8');

// Creates the database from schema + seed, or applies the (idempotent) schema to an existing one.
export function createDatabase({ reset = false } = {}) {
    if (reset) rmSync(DB_PATH, { force: true });
    const isNew = !existsSync(DB_PATH);

    const db = new DatabaseSync(DB_PATH);
    try {
        db.exec(readSql('schema.sql'));
        if (isNew) {
            db.exec('BEGIN');
            db.exec(readSql('seed.sql'));
            db.exec('COMMIT');
        }
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

        const pages = db.prepare('SELECT id, slug, title FROM pages').all();

        const pageItems = db.prepare(`
            SELECT page_id, image, alt, image_title, link FROM page_items
            WHERE visible = 1
            ORDER BY sort_order, id
        `).all();

        return {
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
                title: page.title,
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