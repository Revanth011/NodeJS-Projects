const express = require("express");
const app = express();
require("./db/MDBConnect")(); //MongoDB Connection
require("express-async-errors");
app.use(express.json());

//Middleware
const auth = require("./routes/auth");
const contact = require("./routes/contact");
const authentication = require("./middleware/authentication");
const notFound = require("./middleware/notFound");
const ErrorHandler = require("./middleware/ErrorHandler");

//Routes
app.use("/auth/", auth);
app.use("/contact/", authentication, contact);
app.use(notFound);
app.use(ErrorHandler);

const Port = process.env.PORT || 3000;
app.listen(Port, () => console.log("SERVER RUNNING"));
