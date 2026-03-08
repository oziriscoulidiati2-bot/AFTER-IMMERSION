const db = require("../config/database");
const pool = require("../config/database");

/* DEMANDES (status = pending) */

exports.approveDemande = async (req, res) => {
  await db.query(
    "UPDATE users SET status='active', actif=1 WHERE id=?",
    [req.params.id]
  );
  res.json({ message: "Compte approuvé" });
};

exports.rejectDemande = async (req, res) => {
  await db.query(
    "UPDATE users SET status='suspended', actif=0 WHERE id=?",
    [req.params.id]
  );
  res.json({ message: "Compte rejeté" });
};

/* USERS */
exports.getUsers = async (req, res) => {
  const [rows] = await db.query(
    "SELECT id, nom, password, actif FROM users WHERE status='active'"
  );
  res.json(rows);
};

exports.toggleUser = async (req, res) => {
  await db.query(
    "UPDATE users SET actif = NOT actif WHERE id=?",
    [req.params.id]
  );
  res.json({ message: "Statut modifié" });
};

exports.deleteUser = async (req, res) => {
  await db.query("DELETE FROM users WHERE id=?", [req.params.id]);
  res.json({ message: "Utilisateur supprimé" });
};


const adminService = require("../services/admin.service");

exports.getDemandes = async (req, res) => {
  const [rows] = await adminService.getDemandes();
  res.json(rows);
};




// statistiques 

exports.getStats = async (req, res) => {
  try {
    const stats = await adminService.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
