import type { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { asyncHandler } from "../middlewares/asyncHandler.midleware";
import { LoginDto, RegisterDto } from "../database/dto/auth.dto";
import { validate } from "class-validator";
import { HTTPSTATUS } from "../config/http.config";
import { ErrorCodeEnum } from "../enums/error-code.enum";
import { asyncHandlerAndValidation } from "../middlewares/withValidation.middelware";
import { registerService } from "../services/auth.service";

export const registerController = asyncHandlerAndValidation(
    RegisterDto,
    "body",
    async (req: Request, res: Response, registerDTO) => {
        const { user } = await registerService(registerDTO);
        return res.status(HTTPSTATUS.CREATED).json({
            message: "User created successfully",
            user,
        });
    }
);
export const loginController = asyncHandlerAndValidation(
  LoginDto,
  "body",
  async (req: Request, res: Response, loginDto) => {
    // const { user, accessToken, expiresAt } = await loginService(loginDto);
    return res.status(HTTPSTATUS.CREATED).json({
      message: "User logged in successfully",
    //   user,
    //   accessToken,
    //   expiresAt,
    });
  }
);