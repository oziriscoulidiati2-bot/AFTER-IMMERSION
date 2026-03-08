const mongoose = require("mongoose");

const DemandeCompteSchema = new mongoose.Schema({
  typeCompte: {
    type: String,
    enum: ["Boutique", "Livreur"],
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  statut: {
    type: String,
    enum: ["en_attente", "approuve", "refuse"],
    default: "en_attente"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("DemandeCompte", DemandeCompteSchema);
