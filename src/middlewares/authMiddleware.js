import { verifyToken } from "../utils/jwt.js";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  // Pega o token do header Authorization (Bearer <token>)
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  // Verifica token usando jwt.js
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    // Pega usuário do MongoDB, sem a senha
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    // Adiciona o usuário na requisição
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
