const User = require("../models/User");
const createError = require("http-errors");

const register = async (req, res) => {
  const { name, email } = req.body;
  const emailExist = await User.findOne({
    email,
  });
  if (emailExist) {
    throw createError(403, "Email Already Exist");
  }
  const user = await User.create(req.body);
  const token = user.createJWT(); //Create Token
  res.status(201).json({
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw createError(401, "Enter Email, Password");
  }
  const user = await User.findOne({
    email,
  });
  if (!user) {
    throw createError(401, "User Not Found");
  }
  const isPassMatch = await user.comparePassword(password);
  if (!isPassMatch) {
    throw createError(401, "Invalid Password");
  }
  const token = user.createJWT(); //Create Token
  res.status(200).json({
    signInStatus: "Success",
    token,
  });
};

module.exports = {
  register,
  login,
};
