const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());   
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const notificationsRoutes = require("./routes/notifications.routes");


// ===== MIDDLEWARES =====
app.use(cors());
app.use(express.json());

// ===== ROUTES =====
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationsRoutes);


// ===== TEST =====
app.get("/", (req, res) => {
  res.send("API OK");
});


module.exports = app;
