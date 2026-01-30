import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { LoginSchema, RegisterSchema } from "./auth.schema.js";

export class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response): Promise<void> => {
    const validatedData = RegisterSchema.parse(req.body);
    const result = await this.authService.register(validatedData);
    res
      .status(201)
      .cookie("token", result.token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
      })
      .json(result);
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const data = LoginSchema.parse(req.body);
    const result = await this.authService.login(data);
    res
      .status(200)
      .cookie("token", result.token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
      })
      .json(result);
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    res.status(200).clearCookie("token").json({ data: "Logout successful" });
  };

  profile = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).userId;
    const user = await this.authService.profile(userId);
    res.status(200).json(user);
  };
}
