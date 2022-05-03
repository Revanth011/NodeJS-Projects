const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Book = require("./bookModel");
require("dotenv").config();
app.use(express.json());
require("express-async-errors");

app.get("/", (req, res) => res.send("BOOKS APP"));

//Post Single Book
app.post("/books", async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
});

//Get all Books
app.get("/getBooks/", async (req, res) => {
  const books = await Book.find({});
  res.status(200).json(books);
});

//Get Single Book by id
app.get("/getBook/:id", async (req, res) => {
  const book = await Book.findOne({ _id: req.params.id });
  res.status(200).json(book);
});

//Update Single Book
app.put("/updateBook/:id", async (req, res) => {
  const book = await Book.updateOne({ _id: req.params.id }, req.body);
  res.status(200).json(book);
});

//Delete Single Book
app.delete("/deleteBook/:id", async (req, res) => {
  const book = await Book.deleteOne({ _id: req.params.id });
  res.status(200).json(book);
});

//ErrorHandler
const errorHandling = (err, req, res, next) => {
  console.log(err.message);
  res.status(500).send(err.message);
};
app.use(errorHandling);

//MongoDB
mongoose
  .connect(process.env.MDB)
  .then(() => console.log("MDB CONNECTED"))
  .catch((err) => console.log(err));
app.listen(3000, () => console.log("SERVER RUNNING"));
