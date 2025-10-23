import pkg from "pg";
import {config} from "../config/env.js"
export const pool = new pkg.Pool({connectionString: config.dbUrl});