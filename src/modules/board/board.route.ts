import { Router } from "express";
import { BoardController } from "./board.controller.js";
import { BoardService } from "./board.service.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router: Router = Router();
const boardController = new BoardController(new BoardService());

router.post("/",authMiddleware, boardController.createBoard);
router.get("/",authMiddleware, boardController.getUserBoards);
router.get("/:id",authMiddleware, boardController.getBoardById);
router.put("/:id",authMiddleware, boardController.updateBoard);
router.delete("/:id",authMiddleware, boardController.deleteBoard);

export default router;