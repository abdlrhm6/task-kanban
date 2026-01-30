import { CreateBoardSchema, UpdateBoardSchema } from "./board.schema.js";
import type { BoardService } from "./board.service.js";
import type { Request, Response } from "express";

export class BoardController {
    constructor(private boardService: BoardService) {}


    getUserBoards = async (req: Request, res: Response): Promise<void> => {
        const userId = (req as any).userId;
        const result = await this.boardService.getUserBoards(userId);
        res.status(200).json(result);
    };

    getBoardById = async (req: Request, res: Response): Promise<void> => {
        const boardId = req.params.id as string;
        const result = await this.boardService.getBoardById(boardId);
        res.status(200).json(result);
    };

    createBoard = async (req: Request, res: Response): Promise<void> => {
       const validatedData = CreateBoardSchema.parse(req.body);
       const userId = (req as any).userId;
       const result = await this.boardService.createBoard(validatedData,userId);
       res.status(201).json(result);
    };
    updateBoard = async (req: Request, res: Response): Promise<void> => {
        const boardId = req.params.id as string;
        const validatedData = UpdateBoardSchema.parse(req.body);
        const userId = (req as any).userId;
        const result = await this.boardService.updateBoard(boardId,validatedData,userId);
        res.status(200).json(result);
    };
    deleteBoard = async (req: Request, res: Response): Promise<void> => {
        const boardId = req.params.id as string;
        const userId = (req as any).userId;
        const result = await this.boardService.deleteBoard(boardId,userId);
        res.status(200).json(result);
    };

    
}