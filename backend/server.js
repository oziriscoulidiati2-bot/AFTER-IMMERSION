
process.on("uncaughtException", err => {
  console.error("❌ UNCAUGHT:", err);
});

const app = require("./app");

const pool = require("./config/database");

const PORT = process.env.PORT || 5000;

    console.log("✅ Connexion MySQL réussie");

    // 🚀 Lancer le serveur
    app.listen(PORT, () => {
      console.log("🚀 Backend lancé sur le port", PORT);
    });

console.log("🔥 BON BACKEND ACTIF");









