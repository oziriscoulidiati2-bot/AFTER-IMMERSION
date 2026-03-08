const pool = require("../config/database"); // ta connexion MySQL
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

// Créer un compte (demande)
exports.createUser = ({ nom, telephone, ville, role, password }) => {
  return new Promise((resolve, reject) => {
    const hashedPassword = bcrypt.hashSync(password || "1234", 10); // hash du mot de passe
    const sql = "INSERT INTO users (nom, telephone, password, role, ville, status) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [nom, telephone, hashedPassword, role, ville, "pending"];

    pool.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve({ id: result.insertId, nom, telephone, role, ville, status: "pending" });
    });
  });
};

// Connexion utilisateur
exports.loginUser = ({ nom, password }) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users WHERE nom = ?", [nom], (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return reject(new Error("Utilisateur non trouvé"));

      const user = results[0];

      if (user.status !== "approved") return reject(new Error("Compte non approuvé"));

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) return reject(new Error("Mot de passe incorrect"));

      const token = generateToken({ id: user.id, role: user.role });
      resolve({ token, role: user.role, id: user.id, nom: user.nom });
    });
  });
};

