
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const RentsController = require("../controllers/RentsController");

router.post("/addrent", auth, RentsController.postRent);
router.get("/listadoFiltrado", RentsController.getListadoFiltrado);

module.exports = router;