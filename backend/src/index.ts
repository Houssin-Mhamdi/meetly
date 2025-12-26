import "dotenv/config"
import express, { type NextFunction, type Request, type Response } from "express"
import cors from "cors"
import { config } from "./config/app.config"
import { HTTPSTATUS } from "./config/http.config"
import { errorHandler } from "./middlewares/errorHandler.middleware"
import { asyncHandler } from "./middlewares/asyncHandler.midleware"
import { initializeDatabase } from "./database/database"
import authRoute from "./routes/auth.route"


const app = express()
const BASE_PATH = config.BASE_PATH

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTPSTATUS.OK)
    res.json({ message: "Hello World!" })
}))

app.use(`${BASE_PATH}/auth`, authRoute)
app.use(errorHandler)

app.listen(config.PORT, async () => {
    await initializeDatabase()
    console.log(`Server is running on port ${config.PORT} in ${config.NODE_ENV} mode`)
}) 