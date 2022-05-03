const Contact = require("../models/Contact");
const User = require("../models/User");
const createError = require("http-errors");
const res = require("express/lib/response");

const addContact = async (req, res) => {
  req.body.user = req.user.id;
  const contact = await Contact.create(req.body);
  res.status(201).json({
    message: "Contact Added",
    contact,
  });
};

const addBulkContacts = async (req, res) => {
  req.body.forEach((Obj) => (Obj.user = req.user.id));
  const contacts = await Contact.insertMany(req.body); // req.body = Array of Objects
  res.status(201).json({
    message: "Contacts Added",
    contacts,
  });
};

const getContact = async (req, res) => {
  const contact = await Contact.findOne({
    _id: req.params.contactId,
  });
  if (!contact) throw createError(404, "Contact Not Found");
  res.status(200).json({
    message: "Contact Fetched",
    contact,
  });
};

const getAllContacts = async (req, res) => {
  const { page = 1, limit = 4 } = req.query;
  const contacts = await Contact.find({
    user: req.user.id,
  })
    .limit(limit)
    .skip((page - 1) * limit);
  res.status(200).json({
    message: "Contact Fetched",
    contacts,
  });
};

const updateContact = async (req, res) => {
  const contactExist = await Contact.findOne({
    _id: req.params.contactId,
  });
  if (!contactExist) throw createError(404, "Contact Not Found");
  const contact = await Contact.updateOne(
    {
      _id: req.params.contactId,
    },
    req.body
  );
  if (!contact) throw createError(404, "Contact Not Found");
  res.status(200).json({
    message: "Contact Updated",
    contact,
  });
};

const deleteContact = async (req, res) => {
  const contactExist = await Contact.findOne({
    _id: req.params.contactId,
  });
  if (!contactExist) throw createError(404, "Contact Not Found");
  const contact = await Contact.deleteOne({
    _id: req.params.contactId,
  });
  if (!contact) throw createError(404, "Contact Not Found");
  res.status(200).json({
    message: "Contact Deleted",
    contact,
  });
};

module.exports = {
  addContact,
  addBulkContacts,
  getContact,
  getAllContacts,
  updateContact,
  deleteContact,
};
