import { createDatabase, DB_PATH } from '../db/database.js';

const command = process.argv[2] ?? 'init';

if (command === 'init') {
    const created = createDatabase();
    console.log(created ? `Created ${DB_PATH}` : `${DB_PATH} already exists (use "reset" to rebuild it)`);
} else if (command === 'reset') {
    createDatabase({ reset: true });
    console.log(`Rebuilt ${DB_PATH} from schema.sql and seed.sql`);
} else {
    console.error(`Unknown command "${command}". Use "init" or "reset".`);
    process.exit(1);
}