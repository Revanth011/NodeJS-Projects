const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const mongoose = require("mongoose")
const { Schema } = mongoose;
const UserSchema = Schema({
    name: {
        type: String,
        require: [true, "Name Required"],
        minLength: 4,
        maxLength: 22
    },
    email: {
        type: String,
        require: [true, "Email Required"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Invalid Email"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "Password Required"],
        minLength: 6
    },
})

UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
UserSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
}
UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, name: this.name },
        process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
}
module.exports = mongoose.model("User", UserSchema);
