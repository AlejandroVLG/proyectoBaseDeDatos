
const express = require("express");
const router = express.Router();

const FilmsController = require("../controllers/FilmsController");
const isAdmin = require("../middlewares/isAdmin");

router.get("/", FilmsController.showListFilms);
router.post("/addFilm", isAdmin, FilmsController.addFilm);
/* router.get("/searchFilm", FilmsController.searchFilmTitle);
 */

module.exports = router;