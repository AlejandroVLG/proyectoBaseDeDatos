
const router = require("express").Router();

const ClientsRouter = require("./views/ClientsRouter.js");
const FilmsRouter = require("./views/FilmsRouter.js");
const RentsRouter = require("./views/RentsRouter.js");

router.use("/clients", ClientsRouter);
router.use("/films", FilmsRouter);
router.use("/rents", RentsRouter);

module.exports = router;