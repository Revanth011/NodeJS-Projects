const express = require("express")
const router = express.Router();
const { getAllUsers, getUser, updatePassword } = require("../controllers/userController");

router.get("/getAllUsers", getAllUsers);
router.get("/getUser/:id", getUser);
router.patch("/updatePassword", updatePassword);

module.exports = router;
