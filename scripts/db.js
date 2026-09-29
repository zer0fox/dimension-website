import { existsSync, readdirSync } from 'node:fs';
import { createDatabase, DB_PATH, getSetting, setSetting } from '../db/database.js';

const TEMPLATES_DIR = new URL('../src/templates/', import.meta.url);
const [command = 'init', arg] = process.argv.slice(2);

const listTemplates = () =>
    readdirSync(TEMPLATES_DIR, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && existsSync(new URL(`${entry.name}/index.js`, TEMPLATES_DIR)))
        .map((entry) => entry.name);

if (command === 'init') {
    const created = createDatabase();
    console.log(created ? `Created ${DB_PATH}` : `${DB_PATH} already exists (use "reset" to rebuild it)`);
} else if (command === 'reset') {
    createDatabase({ reset: true });
    console.log(`Rebuilt ${DB_PATH} from schema.sql and seed.sql`);
} else if (command === 'template') {
    const templates = listTemplates();
    if (!arg) {
        const active = getSetting('active_template');
        templates.forEach((name) => console.log(`${name === active ? '*' : ' '} ${name}`));
    } else if (!templates.includes(arg)) {
        console.error(`Unknown template "${arg}". Available: ${templates.join(', ')}`);
        process.exit(1);
    } else {
        setSetting('active_template', arg);
        console.log(`Active template set to "${arg}"`);
    }
} else {
    console.error(`Unknown command "${command}". Use "init", "reset" or "template [name]".`);
    process.exit(1);
}