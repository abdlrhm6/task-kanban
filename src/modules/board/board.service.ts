import type { CreateBoardInput,BoardResponse } from "./board.schema.js";
import { prisma } from "../../config/db.js";

export class BoardService {
    createBoard = async (board: CreateBoardInput,userId:string): Promise<BoardResponse> => {
        const boardCreated = await prisma.board.create({
            data:{
                ...board,
                ownerId:userId
            }
        });
        return boardCreated;
    };
}