import type { NextFunction, Request, Response } from "express";

type AsyncControllerType = (req: Request, res: Response, next: NextFunction) => Promise<any>

// export const asyncHandler = (controller: AsyncControllerType) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         controller(req, res, next).catch(next)
//     }
// }
export const asyncHandler = (controller: AsyncControllerType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controller(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}