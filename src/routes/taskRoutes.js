import express from "express";
import {
  createTask,
  listTasks,
  deleteTask,
  addOffer,
  acceptOffer
} from "../controllers/taskController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, listTasks);
router.delete("/:id", authMiddleware, deleteTask);

// Novo: adicionar uma oferta
router.post("/:id/offer", authMiddleware, addOffer);

// Novo: aceitar uma oferta
router.post("/:id/offer/accept", authMiddleware, acceptOffer);

export default router;
