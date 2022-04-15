const User = require("../models/User")
const createError = require("http-errors");

const getAllUsers = async (req, res) => {
    const users = await User.find({ role: "user" }, { password: 0 });
    res.status(200).json(users);
    if (!users)
        throw createError(404, "Users Not Found");
}

const getUser = async (req, res) => {
    const user = await User.find({ _id: req.params.id }, { password: 0 });
    res.status(200).json(user);
    if (!user)
        throw createError(404, "User Not Found");
}

const updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw createError(400, "Enter Credentials");
    }
    const user = await User.findOne({ _id: req.user.id });
    const isPassMatch = await user.comparePassword(oldPassword);
    if (!isPassMatch) {
        throw createError(401, "Invalid Password");
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ "msg": "Password Updated" });
}

module.exports = {
    getAllUsers,
    getUser,
    updatePassword
}
