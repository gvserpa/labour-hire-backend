import Stripe from "stripe";
import dotenv from "dotenv";
import Task from "../models/Task.js";
import User from "../models/User.js";
import Payment from "../models/Payment.js";

dotenv.config(); // TEM QUE VIR PRIMEIRO para ler a chave do .env

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPayment = async (req, res) => {
  try {
    const { taskId } = req.body;

    // Busca a task e popula o client
    const task = await Task.findById(taskId).populate("client_id");

    if (!task) return res.status(404).json({ message: "Task not found" });

    const platform_fee = 4 * task.hours;
    const worker_amount = task.total_amount - platform_fee;

    // Aqui assumimos que task.client_id.stripe_account_id existe
    if (!task.client_id.stripe_account_id) {
      return res.status(400).json({ message: "Client Stripe account not found" });
    }

    // Cria PaymentIntent no Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(task.total_amount * 100), // em cents
      currency: "aud",
      payment_method_types: ["card"],
      application_fee_amount: Math.round(platform_fee * 100),
      transfer_data: {
        destination: task.client_id.stripe_account_id,
      },
    });

    // Salva pagamento no banco
    await Payment.create({
      task_id: task._id,
      client_id: task.client_id._id,
      worker_id: task.worker_id || null, // use worker correto se existir
      platform_fee,
      worker_amount,
      total_amount: task.total_amount,
      stripe_payment_id: paymentIntent.id,
      status: "pending",
    });

    res.status(200).json({ client_secret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
