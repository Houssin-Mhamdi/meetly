import type { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import { HTTPSTATUS } from "../config/http.config"

export const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`Error Occurred on path ${req.path}`, err)

    if (err instanceof SyntaxError) {
        return res.status(HTTPSTATUS.BAD_REQUEST).json({ message: "Invalid JSON format", stack: err.stack, errors: err.message })
    }

    res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", stack: err.stack, errors: err.message })
}