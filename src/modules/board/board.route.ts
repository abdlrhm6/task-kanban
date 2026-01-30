import { Router } from "express";
import { BoardController } from "./board.controller.js";
import { BoardService } from "./board.service.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router: Router = Router();
const boardController = new BoardController(new BoardService());

router.post("/",authMiddleware, boardController.createBoard);

export default router;