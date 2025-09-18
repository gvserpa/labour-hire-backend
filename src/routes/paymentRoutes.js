import express from "express";
import { createPayment } from "../controllers/paymentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/create", authMiddleware, createPayment);
export default router;