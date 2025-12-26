import "dotenv/config"
import express, { type NextFunction, type Request, type Response } from "express"
import cors from "cors"
import { config } from "./config/app.config.js"
import { HTTPSTATUS } from "./config/http.config.js"
import { errorHandler } from "./middlewares/errorHandler.middleware.js"
import { asyncHandler } from "./middlewares/asyncHandler.midleware.js"
import { initializeDatabase } from "./database/database.js"


const app = express()
const BASE_PATH = config.BASE_PATH
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTPSTATUS.OK)
    res.json({ message: "Hello World!" })
}))
app.use(errorHandler)

app.listen(config.PORT, async () => {
    await initializeDatabase()
    console.log(`Server is running on port ${config.PORT} in ${config.NODE_ENV} mode`)
}) 