import AvailableUser from "../models/AvailableUser.js";

// Criar novo usuário disponível
export const createAvailableUser = async (req, res) => {
  try {
    const { name, role, rate, availableDays, client_id } = req.body;

    // Validação básica
    if (!name || !role || !rate || !availableDays || availableDays.length === 0 || !client_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Verifica se o usuário já possui registro
    const existingUser = await AvailableUser.findOne({ client_id });
    if (existingUser) {
      return res.status(400).json({ message: "User already has an available record." });
    }

    const newUser = new AvailableUser({
      name,
      role,
      rate,
      availableDays,
      client_id,
      score: 0,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creating available user:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Deletar usuário disponível
export const deleteAvailableUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await AvailableUser.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Available user deleted successfully" });
  } catch (err) {
    console.error("Error deleting available user:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// Listar todos os usuários disponíveis
export const listAvailableUsers = async (req, res) => {
  try {
    const drivers = await AvailableUser.find({ role: "driver" }).populate("client_id", "_id email name");
    const offsiders = await AvailableUser.find({ role: "offsider" }).populate("client_id", "_id email name");

    res.json({ drivers, offsiders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching available users" });
  }
};

