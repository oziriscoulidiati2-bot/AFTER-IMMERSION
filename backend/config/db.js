const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "zabr_daaga"
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Base de données connectée");
    connection.release();
  } catch (err) {
    console.error("❌ Erreur connexion base :", err.message);
  }
})();

module.exports = pool;
