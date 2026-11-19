/**
 * Copies client/src/data/projects.json into MongoDB (upsert by slug) and adds
 * star count + last push date from the GitHub API.
 *
 *   npm run seed            # upsert, keep projects that aren't in the file
 *   npm run seed -- --prune # also delete projects that were removed from the file
 *
 * The server also does this on startup (see SYNC_ON_START in .env.example),
 * so normally you only need this to test against a database by hand.
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const { syncProjects } = require('../lib/syncProjects');

async function main() {
    if (!process.env.MONGO_URI) {
        console.error('MONGO_URI is not set. Put it in server/.env first.');
        process.exit(1);
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to database "${mongoose.connection.name}"`);
    const n = await syncProjects({ prune: process.argv.includes('--prune'), log: console.log });
    console.log(`Done: ${n} projects in the database.`);
    await mongoose.disconnect();
}

main().catch(err => {
    console.error(err.message);
    process.exit(1);
});
