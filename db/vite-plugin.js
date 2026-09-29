import { existsSync } from 'node:fs';
import path from 'node:path';
import { DB_PATH, getSetting, readSiteData } from './database.js';

const VIRTUAL_ID = 'virtual:site-data';
const RESOLVED_ID = '\0' + VIRTUAL_ID;

function resolveTemplate(root) {
    const name = process.env.TEMPLATE || getSetting('active_template') || 'default';
    const dir = path.resolve(root, 'src/templates', name);
    if (!/^[A-Za-z0-9_-]+$/.test(name) || !existsSync(path.join(dir, 'index.js'))) {
        throw new Error(`Template "${name}" not found (expected src/templates/${name}/index.js)`);
    }
    return { name, dir };
}

// Reads the SQLite database at build/dev time: exposes content as `virtual:site-data`
// and points the `@template` alias at the active template, so the deployed site stays static.
export default function siteDataPlugin() {
    let root;
    let template;

    return {
        name: 'site-data',
        config(config) {
            root = path.resolve(config.root ?? process.cwd());
            template = resolveTemplate(root);
            return {
                resolve: {
                    alias: {
                        '@template': template.dir,
                        '@': path.resolve(root, 'src'),
                    },
                },
            };
        },
        configResolved(config) {
            config.logger.info(`Using template "${template.name}"`);
        },
        resolveId(id) {
            if (id === VIRTUAL_ID) return RESOLVED_ID;
        },
        load(id) {
            if (id === RESOLVED_ID) {
                return `export default ${JSON.stringify(readSiteData())};`;
            }
        },
        configureServer(server) {
            server.watcher.add(DB_PATH);
            server.watcher.on('change', (file) => {
                if (path.resolve(file) !== DB_PATH) return;
                if (resolveTemplate(root).name !== template.name) {
                    server.restart();
                    return;
                }
                const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
                if (mod) server.moduleGraph.invalidateModule(mod);
                server.ws.send({ type: 'full-reload' });
            });
        },
    };
}