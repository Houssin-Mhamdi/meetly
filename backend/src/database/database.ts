import { AppDataSource } from "../config/databse.config.js";

export const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize()
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Database connection failed", error)
        process.exit(1)
    }
}