const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
require("express-async-errors");
require("./db/MDBConnect")(process.env.MDB);

app.use(cors());
app.use(express.json());

//Middleware
const auth = require("./routes/auth");
const user = require("./routes/user");
const product = require("./routes/product");
const authentication = require("./middleware/authentication")
const notFound = require("./middleware/notFound");
const ErrorHandler = require("./middleware/ErrorHandler");

//Routes
app.get("/", (req, res) => res.send("E-COMMERCE"));
app.use("/auth/", auth);
app.use("/user/", authentication, user);
app.use("/product/", authentication, product);

app.use(notFound);
app.use(ErrorHandler);

//Server
const Port = process.env.PORT || 3000;
app.listen(Port, () => console.log(`Server Running on Port ${Port}`));
