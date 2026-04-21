const express = require("express");
const authController = require("../controllers/authController");
const trackController = require("../controllers/trackController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// Использование в приложении
const cors = require('cors');
const app = express();

/*

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));
*/

/*
// Базовая настройка (разрешить все источники)
// app.use(cors());
*/

/*
// Детальная настройка
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'application/json'],
    credentials: true
}));
*/

app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'application/json'],
    credentials: true
}));




router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/tracks", trackController.getTracks);
router.post("/favorites", authenticate, trackController.addToFavorites);
router.delete("/favorites", authenticate, trackController.removeFromFavorites);
router.get("/favorites", authenticate, trackController.getFavorites);

module.exports = router;
