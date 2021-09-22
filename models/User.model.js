const { model, Schema } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        required: true,
    }
});

module.exports = model("User", userSchema);