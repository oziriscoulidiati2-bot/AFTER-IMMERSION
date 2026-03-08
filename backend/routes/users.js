const express = require("express");
const router = express.Router();
const db = require("../db");

// Lister tous les utilisateurs
router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });
    res.json(results);
  });
});

// Ajouter un nouvel utilisateur (création de compte)
router.post("/register", (req, res) => {
  const { role, email, password } = req.body;

  if (!role || !email || !password) {
    return res.status(400).json({ message: "Veuillez remplir tous les champs" });
  }

  const sql = "INSERT INTO users (role, email, password, status) VALUES (?, ?, ?, 'pending')";
  db.query(sql, [role, email, password], (err) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });
    res.json({ message: "Compte créé avec succès. En attente d'approbation." });
  });
});

module.exports = router;
 
router.post("/login", (req, res) => {
  const { telephone, password } = req.body;

  if (!telephone || !password) {
    return res.status(400).json({ message: "Champs manquants" });
  }

  const sql = `
    SELECT * FROM users
    WHERE telephone = ?
      AND status = 'active'
  `;

  db.query(sql, [telephone], (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });

    if (results.length === 0) {
      return res.status(401).json({ message: "Utilisateur non trouvé ou non validé" });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    
    if (user.role === "admin") {
      return res.status(403).json({ message: "Accès refusé" });
    }

    res.json({
      id: user.id,
      role: user.role,
      token: "fake-jwt-token"
    });
  });
});
 