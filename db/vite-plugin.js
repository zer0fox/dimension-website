import { DB_PATH, readSiteData } from './database.js';

const VIRTUAL_ID = 'virtual:site-data';
const RESOLVED_ID = '\0' + VIRTUAL_ID;

// Reads the SQLite database at build/dev time and exposes it as a JS module,
// so the deployed site stays fully static.
export default function siteDataPlugin() {
    return {
        name: 'site-data',
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
                if (file !== DB_PATH) return;
                const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
                if (mod) server.moduleGraph.invalidateModule(mod);
                server.ws.send({ type: 'full-reload' });
            });
        },
    };
}