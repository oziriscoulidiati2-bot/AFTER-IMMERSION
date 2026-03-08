const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const db = require("../config/db");


router.post("/login", authController.login);
router.post("/register", authController.register);

//soldats

router.get("/me", authMiddleware(), async (req,res)=>{

  const userId = req.user.id;

  try{

    const [rows] = await db.query(
      "SELECT nom,telephone,ville,points,grade FROM users WHERE id=?",
      [userId]
    );

    res.json(rows[0]);

  }catch(err){

    console.error(err);
    res.status(500).json({message:"Erreur serveur"});

  }

});

module.exports = router;