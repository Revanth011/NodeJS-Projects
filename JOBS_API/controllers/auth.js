const User = require("../models/User");

const register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = user.createJWT();
        res.status(201).json({ name: user.name, JWT: token });
    } catch (err) {
        res.status(400).json(err);
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = user.createJWT();
        res.status(200).json({ name: user.name, JWT: token });
    } catch (err) {
        res.status(400).json(err);
    }
}
module.exports = {
    register,
    login
}
