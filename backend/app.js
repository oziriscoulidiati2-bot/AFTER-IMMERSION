const express = require("express");
const cors = require("cors");
const app = express();
// CORS configuration
app.use(cors({
  origin: [
    "https://after-immersion-game-bf.pages.dev",
    "http://localhost:5000",
    "http://127.0.0.1:5500"
  ],
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

app.use(express.json());
   
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const notificationsRoutes = require("./routes/notifications.routes");

// ===== ROUTES =====
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationsRoutes);

//forum
// saisir une categorie
app.get("/api/forum/categories", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM categories");
  res.json(rows);
});
//Faire une recherche
app.get("/api/forum/posts", async (req, res) => {
  const search = req.query.search || "";

  const [rows] = await db.query(`
    SELECT posts.*, users.nom, categories.name as category
    FROM posts
    JOIN users ON posts.user_id = users.id
    JOIN categories ON posts.category_id = categories.id
    WHERE posts.title LIKE ?
    ORDER BY posts.created_at DESC
  `, [`%${search}%`]);

  res.json(rows);
});
//creer un post
app.post("/api/forum/posts", authMiddleware, async (req, res) => {
  const { title, content, category_id } = req.body;
  const user_id = req.user.id;

  await db.query(
    "INSERT INTO posts (user_id, category_id, title, content) VALUES (?, ?, ?, ?)",
    [user_id, category_id, title, content]
  );

  res.json({ message: "Post créé" });
});
//Get Commentaires
app.get("/api/forum/comments/:postId", async (req, res) => {
  const [rows] = await db.query(`
    SELECT comments.*, users.nom
    FROM comments
    JOIN users ON comments.user_id = users.id
    WHERE post_id = ?
  `, [req.params.postId]);

  res.json(rows);
});
//post commentaires
app.post("/api/forum/comments", authMiddleware, async (req, res) => {
  const { post_id, content } = req.body;
  const user_id = req.user.id;

  await db.query(
    "INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)",
    [post_id, user_id, content]
  );

  res.json({ message: "Commentaire ajouté" });
});


// ===== TEST =====
app.get("/", (req, res) => {
  res.send("API OK");
});


module.exports = app;

