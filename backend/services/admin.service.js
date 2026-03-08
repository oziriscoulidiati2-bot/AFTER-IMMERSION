const db = require("../config/database");

exports.getDemandes = () => {
  return db.query(
    "SELECT id, nom, telephone, ville, role FROM users WHERE status='pending'"
  );
};

exports.approve = (id) => {
  return db.query(
    "UPDATE users SET status='active', actif=1 WHERE id=?",
    [id]
  );
};

exports.reject = (id) => {
  return db.query(
    "UPDATE users SET status='suspended', actif=0 WHERE id=?",
    [id]
  );
};

exports.getUsers = () => {
  return db.query(
    "SELECT id, nom, telephone, actif FROM users WHERE status='active'"
  );
};

exports.toggle = (id) => {
  return db.query(
    "UPDATE users SET actif = NOT actif WHERE id=?",
    [id]
  );
};

exports.remove = (id) => {
  return db.query("DELETE FROM users WHERE id=?", [id]);
};


exports.getStats = async () => {

  // ===== PRODUITS =====
  const [[produits]] = await db.query(`
    SELECT
      COUNT(*) AS total,
      SUM(created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)) AS last7days,
      SUM(created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)) AS last30days
    FROM produits
  `);

  // ===== PROMOTIONS =====
  const [[promotions]] = await db.query(`
    SELECT
      COUNT(*) AS total,
      SUM(expiry_date >= NOW()) AS actives,
      SUM(expiry_date < NOW()) AS expirees
    FROM promotions
  `);

  // ===== COMMANDES =====
  const [[commandes]] = await db.query(`
    SELECT
      COUNT(*) AS total,
      SUM(status='livrée') AS livrees,
      SUM(created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)) AS last7days,
      SUM(created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)) AS last30days
    FROM commandes
  `);

  return { produits, promotions, commandes };
};
