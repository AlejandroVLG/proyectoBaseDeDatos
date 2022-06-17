const express = require("express");
const auth = require("../config/auth");
const router = express.Router();

const ClientsController = require("../controllers/ClientsController");
const isAdmin = require("../middlewares/isAdmin");

router.post("/myAccount", ClientsController.showMember);
router.get("/membersList", isAdmin, ClientsController.showMembers);
router.post("/addMember", ClientsController.newMember);
router.post("/login", ClientsController.memberLogin);
/* router.put("/modifyProfile", ClientsController.modifyClientProfile);
 */
module.exports = router;