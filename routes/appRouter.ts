import { PlayerHandler } from "../app/player/handler";
import { Router } from "express";

const router = Router();

// Player
router.get("/player", PlayerHandler.getAllPlayers);
router.get("/player/:id", PlayerHandler.getPlayerById);
router.post("/player", PlayerHandler.reigsterPlayer);
router.put("/player/deposit/:id", PlayerHandler.deposit);
router.put("/player/withdraw/:id", PlayerHandler.withdraw);

export { router };
