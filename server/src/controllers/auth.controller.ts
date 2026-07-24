import { Request, Response } from "express";
import * as authService from "../services/auth.service.js";


export async function register(req: Request, res: Response) {
  try {
    const user = await authService.register(req.body);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error 
        ? error.message 
        : "Unknown error",
    });
  }
}


export async function login(req: Request, res: Response) {
  try {
    const result = await authService.login(req.body);

    return res.status(200).json({
      success: true,
      ...result,
    });

  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Login failed",
    });
  }
}