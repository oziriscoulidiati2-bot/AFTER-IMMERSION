const jwt = require("../utils/jwt");

function authMiddleware(roles = []) {
  return (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token manquant" });
    }

    try {
      const payload = jwt.verifyToken(token); // ✅ ICI

      if (roles.length && !roles.includes(payload.role)) {
        return res.status(403).json({ message: "Accès refusé" });
      }

      req.user = payload; // { id, role, iat, exp }
      next();

    } catch (err) {
      return res.status(401).json({ message: "Token invalide" });
    }
  };
}


module.exports = authMiddleware;


