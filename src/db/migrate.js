import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../db/pool.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
    const dir = path.resolve(__dirname, "../../sql/migrations");
    const files = fs.readdirSync(dir).sort();
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        for (const f of files) {
            const sql = fs.readFileSync(path.join(dir, f), "utf-8");
            await client.query(sql);
        }
        await client.query("COMMIT");
    } catch (e) {
        await client.query("ROLLBACK");
        console.error(e)
        process.exit(1)
    } finally {
        client.release();
        await pool.end();
    }
}

run();