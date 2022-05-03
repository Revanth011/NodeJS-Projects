const express = require("express");
const router = express.Router();
const {
  addContact,
  addBulkContacts,
  getContact,
  getAllContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

router.post("/addContact", addContact);
router.post("/addBulkContacts", addBulkContacts);
router.get("/getContact/:contactId", getContact);
router.get("/getAllContacts", getAllContacts);
router.put("/updateContact/:contactId", updateContact);
router.delete("/deleteContact/:contactId", deleteContact);

module.exports = router;
