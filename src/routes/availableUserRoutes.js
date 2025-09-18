import express from "express";
import { createAvailableUser, listAvailableUsers, deleteAvailableUser } from "../controllers/availableUserController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Criar novo usuário disponível
router.post("/", authMiddleware, createAvailableUser);

// Listar todos os usuários disponíveis
router.get("/", authMiddleware, listAvailableUsers);

// Deletar um usuário disponível (Busy)
router.delete("/:id", authMiddleware, deleteAvailableUser);

export default router;
