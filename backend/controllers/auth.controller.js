const db = require("../config/database");
const bcrypt = require("bcrypt");
const authService = require("../services/auth.service");
const jwt = require("../utils/jwt");

// ================= LOGIN (USER + ADMIN) =================
exports.login = async (req, res) => {
  try {
    const { telephone, nom, password } = req.body;

    let query = "";
    let params = [];

    // 🔐 LOGIN ADMIN
    if (nom) {
      query = "SELECT * FROM users WHERE nom = ? AND role = 'admin' LIMIT 1";
      params = [nom];
    }
    // 👤 LOGIN UTILISATEUR
    else if (telephone) {
      query = "SELECT * FROM users WHERE telephone = ? LIMIT 1";
      params = [telephone];
    } 
    else {
      return res.status(400).json({ message: "Identifiants manquants" });
    }

    const [users] = await db.query(query, params);

    if (users.length === 0) {
      return res.status(401).json({ message: "Utilisateur introuvable" });
    }

    const user = users[0];

    if (user.status !== "active" || user.actif !== 1) {
      return res.status(403).json({ message: "Compte non actif" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.generateToken({
       id: user.id,
       role: user.role
    });

	
    res.json({
	  token,
      id: user.id,
      nom: user.nom,
      role: user.role,
      telephone: user.telephone
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ================= REGISTER =================
exports.register = async (req, res) => {
  const { nom, telephone, ville, role, password } = req.body;

  try {
    const user = await authService.createUser({
      nom,
      telephone,
      ville,
      role,
      password
    });

    res.json({ success: true, user });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};





