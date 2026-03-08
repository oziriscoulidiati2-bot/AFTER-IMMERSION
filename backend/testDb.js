const mysql = require('mysql2');
require('dotenv').config();

// ⚡ Utilise les mêmes infos que dans ton .env
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});


db.connect((err) => {
  if (err) {
    console.error('❌ Erreur de connexion :', err.message);
    process.exit(1);
  }
  console.log('✅ Connecté à la base de données MySQL !');
  db.end();
});
