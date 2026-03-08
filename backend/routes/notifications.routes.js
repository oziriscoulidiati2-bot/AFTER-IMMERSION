const express = require("express");
const router = express.Router();

// Exemple de route de test
router.get("/test", (req, res) => {
  res.json({ message: "Notifications route ok" });
});

// Ici tu ajouteras les routes pour créer/lire les notifications

module.exports = router;
