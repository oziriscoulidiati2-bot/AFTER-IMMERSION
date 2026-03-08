const router = require("express").Router();
const controller = require("../controllers/pdf.controller");

router.post("/generate",controller.generateCertificate);

module.exports = router;