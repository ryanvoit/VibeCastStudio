const express = require("express");
const authController = require("../controllers/authController");
const trackController = require("../controllers/trackController");
const authenticate = require("../middleware/authMiddleware");
// const app = express()
// const cors = require("cors");

const router = express.Router();

/*
app.use(cors({
    origin: "http://127.0.0.1:5500/dist/index.html",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

app.use(cors());
*/

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/tracks", trackController.getTracks);
router.post("/favorites", authenticate, trackController.addToFavorites);
router.delete("/favorites", authenticate, trackController.removeFromFavorites);
router.get("/favorites", authenticate, trackController.getFavorites);

module.exports = router;
