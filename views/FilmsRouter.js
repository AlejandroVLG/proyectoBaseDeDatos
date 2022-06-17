
const express = require("express");
const router = express.Router();

const FilmsController = require("../controllers/FilmsController");
const isAdmin = require("../middlewares/isAdmin");

router.get("/", FilmsController.showFilmsList);
router.post("/addFilm", isAdmin, FilmsController.addFilm);
router.post("/searchFilm", FilmsController.searchFilmTitle);


module.exports = router;