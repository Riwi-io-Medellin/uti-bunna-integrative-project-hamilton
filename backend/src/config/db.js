import {Pool} from "pg"
import {config} from "dotenv"

config()
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    family: 4
})

export default pool
