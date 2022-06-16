const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const ClientsController = require("../controllers/ClientsController");

router.post("/myaccount", auth, ClientsController.showClient);
router.get("/clientslist", auth, ClientsController.showClients);
router.post("/addclient", ClientsController.newClient);
router.post("/login", ClientsController.clientLogin);

module.exports = router;