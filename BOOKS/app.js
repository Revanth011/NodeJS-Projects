const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Book = require("./bookModel");
require("dotenv").config();
app.use(express.json());

app.get("/", (req, res) => res.send("BOOKS APP"));

//Post Single Book
app.post("/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all Books
app.get("/getBooks/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Single Book by id
app.get("/getBook/:id", async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Update Single Book
app.put("/updateBook/:id", async (req, res) => {
  try {
    const book = await Book.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete Single Book
app.delete("/deleteBook/:id", async (req, res) => {
  try {
    const book = await Book.deleteOne({ _id: req.params.id });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});

//MongoDB
mongoose
  .connect(process.env.MDB)
  .then(() => console.log("MDB CONNECTED"))
  .catch((err) => console.log(err));
app.listen(3000, () => console.log("SERVER RUNNING"));
