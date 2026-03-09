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


// ===== TEST =====
app.get("/", (req, res) => {
  res.send("API OK");
});


module.exports = app;

