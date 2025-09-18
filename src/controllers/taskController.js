import Task from "../models/Task.js";

// Criar nova task
export const createTask = async (req, res) => {
  try {
    const { title, description, category, rate_per_hour, hours } = req.body;

    if (!title || !rate_per_hour || !hours) {
      return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }

    const total_amount = rate_per_hour * hours;

    const task = await Task.create({
      client_id: req.user._id,
      title,
      description,
      category,
      rate_per_hour,
      hours,
      total_amount
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Listar todas as tasks
// Listar todas as tasks
export const listTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("client_id", "email")
      .populate("offers.userId", "email") // <--- populando usuário de cada oferta
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Deletar task (somente criador)
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task não encontrada" });

    if (task.client_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Não autorizado a deletar esta task" });
    }

    await task.deleteOne();
    res.json({ message: "Task deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Adicionar ou atualizar oferta em uma task
export const addOffer = async (req, res) => {
  try {
    const { amount, comment } = req.body;
    const taskId = req.params.id;
    const userId = req.user._id;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Informe um valor válido para a oferta" });
    }

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task não encontrada" });

    // Usuário não pode ofertar na própria task
    if (task.client_id.toString() === userId.toString()) {
      return res.status(403).json({ message: "Não é possível fazer oferta na própria task" });
    }

    // Verifica se o usuário já fez uma oferta
    const existingOfferIndex = task.offers.findIndex(
      (offer) => offer.userId.toString() === userId.toString()
    );

    if (existingOfferIndex > -1) {
      // Atualiza oferta existente
      task.offers[existingOfferIndex].amount = amount;
      task.offers[existingOfferIndex].comment = comment;
      task.offers[existingOfferIndex].status = "pending";
      task.offers[existingOfferIndex].createdAt = Date.now();
    } else {
      // Adiciona nova oferta
      task.offers.push({ userId, amount, comment });
    }

    // Atualiza status da task para negotiation se ainda estiver open
    if (task.status === "open") task.status = "negotiation";

    await task.save();

    res.json(task);
  } catch (err) {
    console.error("Erro ao adicionar oferta:", err);
    res.status(500).json({ message: "Erro ao adicionar oferta" });
  }
};

// Aceitar uma oferta (somente criador da task)
export const acceptOffer = async (req, res) => {
  try {
    const { offerId } = req.body; // ID da oferta a ser aceita
    const taskId = req.params.id;
    const userId = req.user._id;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task não encontrada" });

    // Apenas o criador da task pode aceitar
    if (task.client_id.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Não autorizado a aceitar ofertas nesta task" });
    }

    const offer = task.offers.id(offerId);
    if (!offer) return res.status(404).json({ message: "Oferta não encontrada" });

    // Marca a oferta como aceita e as demais como rejeitadas
    task.offers.forEach((o) => {
      o.status = o._id.toString() === offerId ? "accepted" : "rejected";
    });

    // Atualiza status da task
    task.status = "accepted";

    await task.save();

    res.json(task);
  } catch (err) {
    console.error("Erro ao aceitar oferta:", err);
    res.status(500).json({ message: "Erro ao aceitar oferta" });
  }
};
