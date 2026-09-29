import { DatabaseSync } from 'node:sqlite';
import { existsSync, readFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dbDir = path.dirname(fileURLToPath(import.meta.url));

export const DB_PATH = path.join(dbDir, 'site.db');

export function createDatabase({ reset = false } = {}) {
    if (reset) rmSync(DB_PATH, { force: true });
    if (existsSync(DB_PATH)) return false;

    const db = new DatabaseSync(DB_PATH);
    try {
        db.exec(readFileSync(path.join(dbDir, 'schema.sql'), 'utf8'));
        db.exec('BEGIN');
        db.exec(readFileSync(path.join(dbDir, 'seed.sql'), 'utf8'));
        db.exec('COMMIT');
    } catch (error) {
        db.close();
        rmSync(DB_PATH, { force: true });
        throw error;
    }
    db.close();
    return true;
}

export function readSiteData() {
    createDatabase();
    const db = new DatabaseSync(DB_PATH, { readOnly: true });
    try {
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
    } finally {
        db.close();
    }
}