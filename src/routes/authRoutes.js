import express from "express";
import { register, login } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"; // importa o middleware

const router = express.Router();

// Rotas públicas
router.post("/signup", register);
router.post("/login", login);

// Rota protegida para pegar dados do usuário logado
router.get("/me", authMiddleware, (req, res) => {
  // req.user já vem do authMiddleware
  res.json({ _id: req.user._id, email: req.user.email });
});


export default router;
