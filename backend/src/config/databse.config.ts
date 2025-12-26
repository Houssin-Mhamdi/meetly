import "dotenv/config"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

import { DataSource } from "typeorm"
import { config } from "./app.config.js"

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


export const getDatabaseConfig = () => {
    const isProduction = config.NODE_ENV === "production"
    const databaseUrl = config.DATABASE_URL;

    if (!databaseUrl) {
        throw new Error("DATABASE_URL environment variable is not defined");
    }

    return new DataSource({
        type: "postgres",
        url: databaseUrl,
        entities: [path.join(__dirname, "../database/entities/*.{ts,js}")],
        migrations: [path.join(__dirname, "../database/migrations/*.{ts,js}")],
        synchronize: !isProduction,
        logging: isProduction ? false : ["error"],
        ssl: isProduction
            ? {
                rejectUnauthorized: true,
            }
            : {
                rejectUnauthorized: false,
            },
    })
}
export const AppDataSource = getDatabaseConfig();