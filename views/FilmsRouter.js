
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth")

const FilmsController = require("../controllers/FilmsController");
const isAdmin = require("../middlewares/isAdmin");

router.post("/addFilm", isAdmin, FilmsController.addNewFilm);
router.get("/filmsList", FilmsController.showFilmsList);
router.post("/searchFilm", FilmsController.searchFilmTitle);
router.post("/searchByDirector", FilmsController.directorFilter)
router.delete("/removeFilm", isAdmin, FilmsController.removeFilm);


module.exports = router;