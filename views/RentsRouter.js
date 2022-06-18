
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const RentsController = require("../controllers/RentsController");
const isAdmin = require("../middlewares/isAdmin");

router.post("/addRent", auth, RentsController.newRent);
router.get("/showAllRents", isAdmin, RentsController.listOfRents);
router.get("/listadoFiltrado", RentsController.getListadoFiltrado);


module.exports = router;