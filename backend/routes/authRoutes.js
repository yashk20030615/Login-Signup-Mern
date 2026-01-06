const express = require("express");
const { signup, login, dashboard } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// ✅ PROTECTED ROUTE
router.get("/dashboard", authMiddleware, dashboard);

module.exports = router;
