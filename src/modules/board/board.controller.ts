import { CreateBoardSchema } from "./board.schema.js";
import type { BoardService } from "./board.service.js";
import type { Request, Response } from "express";

export class BoardController {
    constructor(private boardService: BoardService) {}


    createBoard = async (req: Request, res: Response): Promise<void> => {
       const validatedData = CreateBoardSchema.parse(req.body);
       const userId = (req as any).userId;
       const result = await this.boardService.createBoard(validatedData,userId);
       res.status(201).json(result);
    };
}