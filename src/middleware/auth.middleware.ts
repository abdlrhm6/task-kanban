import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../modules/auth/auth.service.js";

type TokenPayload = {
  userId: string;
  iat: number;
  exp: number;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        error: "No token provided",
      });
      return;
    }

    const token = authHeader.substring(7);
    const authService = new AuthService();
    const payload = authService.verifyToken(token) as TokenPayload;

    // Attach user ID to request
    (req as any).userId = payload.userId;

    next();
  } catch (error) {
    res.status(401).json({
      error: { message: "Invalid  token" },
    });
  }
};
