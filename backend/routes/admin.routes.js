const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const db = require('../config/database');


router.get("/demandes", adminController.getDemandes);
router.put("/demandes/:id/approve", adminController.approveDemande);
router.put("/demandes/:id/reject", adminController.rejectDemande);

router.get("/users", adminController.getUsers);
router.put("/users/:id/toggle", adminController.toggleUser);
router.delete("/users/:id", adminController.deleteUser);


// Importer pool si ce n'est pas déjà fait
const pool = require("../config/database");

// PUT /api/admin/users/:id/grade-simple
router.put("/users/:id/grade-simple", async (req, res) => {
  const userId = req.params.id;
  const { grade } = req.body;

  if (!grade) return res.status(400).json({ message: "Grade requis" });

  try {
    // Vérifie si l'utilisateur existe
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [userId]);
    if (rows.length === 0) return res.status(404).json({ message: "Utilisateur non trouvé" });

    // Met à jour uniquement le grade
    await pool.query("UPDATE users SET grade = ? WHERE id = ?", [grade, userId]);

    return res.json({ message: `Grade modifié avec succès pour l'utilisateur ${userId}`, grade });
  } catch (err) {
    console.error("Erreur grade-simple:", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;


