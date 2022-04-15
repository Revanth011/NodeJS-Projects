const User = require("../models/User");
const createError = require('http-errors');

const register = async (req, res) => {
    const { name, email } = req.body;
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        throw createError(403, "Email Already Exist");
    }
    const user = await User.create(req.body);
    const token = user.createJWT();
    // res.cookie("token", token, {
    //     httpOnly: true,
    //     expires: new Date(Date.now() + (1000 * 60 * 60 * 24))
    // });
    res.status(201).json(token, user);
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw createError(401, "Enter Email, Password");
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw createError(401, "User Not Found");
    }
    const isPassMatch = await user.comparePassword(password);
    if (!isPassMatch) {
        throw createError(401, "Invalid Password");
    }
    //Create Token
    const token = user.createJWT();
    // res.cookie("token", token, {
    //     httpOnly: true,
    //     expires: new Date(Date.now() + (1000 * 60 * 60 * 24))
    // });
    res.status(200).json({ signInStatus: "Success", token });
}

const logout = async (req, res) => {
    res.cookie("token", "", { maxAge: 1 });
    res.status(200).json({ msg: "Logout Success" });
}

module.exports = {
    register,
    login,
    logout
}
