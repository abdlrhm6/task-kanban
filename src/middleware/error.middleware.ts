import type { Request, Response, NextFunction } from "express";
import { treeifyError, ZodError } from "zod";

export const errorHandler = (error: Error,req: Request,res: Response,next: NextFunction): void => {
  console.error("Error:", error);

  if(error instanceof ZodError){
    res.status(400).json({
      error: treeifyError(error),
    });
    return;
  }

  if(error instanceof Error){
    res.status(400).json({
      error: error.message,
    });
    return;
  }
  res.status(500).json({
    error: "Internal server error",
  });
};
