
const express = require("express");
const router = express.Router();

const FilmsController = require("../controllers/FilmsController");

router.get("/", FilmsController.getFilms);
router.post("/addfilm", FilmsController.postFilm);


module.exports = router;