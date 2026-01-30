import type { CreateBoardInput,BoardResponse, UpdateBoardInput } from "./board.schema.js";
import { prisma } from "../../config/db.js";

export class BoardService {


    getUserBoards = async (userId:string): Promise<BoardResponse[]> => {
        const boards = await prisma.board.findMany({
            where:{
                ownerId:userId
            }
        });
        return boards;
    };

    getBoardById = async (boardId:string): Promise<BoardResponse> => {

        const board = await prisma.board.findUnique({
            where:{
                id:boardId
            }
        });
        if(!board){
            throw new Error("Board not found");
        }
        return board;
    };

    createBoard = async (board: CreateBoardInput,userId:string): Promise<BoardResponse> => {
        const boardCreated = await prisma.board.create({
            data:{
                ...board,
                ownerId:userId
            }
        });
        return boardCreated;
    };
    updateBoard = async (boardId:string,board: UpdateBoardInput,userId:string): Promise<BoardResponse> => {
        
        const boardFound = await this.getBoardById(boardId);
        if(!boardFound){
            throw new Error("Board not found");
        }
        if(boardFound.ownerId !== userId){
            throw new Error("You are not authorized to update this board");
        }
        const boardUpdated = await prisma.board.update({
            where:{
                id:boardId
            },
            data:{
                title:board.title || boardFound.title,
                description:board.description || boardFound.description
            }
        });
        return boardUpdated;
    };
    deleteBoard = async (boardId:string,userId:string): Promise<BoardResponse> => {
        const boardFound = await this.getBoardById(boardId);
        if(!boardFound){
            throw new Error("Board not found");
        }
        if(boardFound.ownerId !== userId){
            throw new Error("You are not authorized to delete this board");
        }
        const boardDeleted = await prisma.board.delete({
            where:{
                id:boardId
            }
        });
        return boardDeleted;
    };
}