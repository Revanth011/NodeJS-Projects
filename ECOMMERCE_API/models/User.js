const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Required"],
        minlength: 3,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate(Email) {
            if (!validator.isEmail(Email)) throw new Error("Invalid Email");
        },
    },
    password: {
        type: String,
        required: [true, "Password Required"],
        minlength: 6
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
});

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
    return jwt.sign({ id: this._id, name: this.name, email: this.email },
        process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
}

module.exports = mongoose.model("User", UserSchema);
