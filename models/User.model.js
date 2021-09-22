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
        type: String,
        required: true
    },
    personal: {
        type: Schema.Types.ObjectId,
        refPath: 'role',
        required: true
    }
});

module.exports.User = model("User", userSchema);