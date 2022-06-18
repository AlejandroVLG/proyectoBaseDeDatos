
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth")

const FilmsController = require("../controllers/FilmsController");
const isAdmin = require("../middlewares/isAdmin");

router.get("/filmsList", FilmsController.showFilmsList);
router.post("/addFilm", auth, FilmsController.addNewFilm);
router.post("/searchFilm", FilmsController.searchFilmTitle);
router.delete("/removeFilm", FilmsController.removeFilm);


module.exports = router;