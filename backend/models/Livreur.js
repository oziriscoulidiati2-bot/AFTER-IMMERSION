const mongoose = require("mongoose");

const livreurSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  localisation: { type: String, required: true },
  whatsapp: { type: String, required: true },
  photo: { type: String, required: false }
});

module.exports = mongoose.model("Livreur", livreurSchema);
