const { model, Schema } = require("mongoose");

const barberSchema = new Schema({
    lastname: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    telegram: {
        type: String
    },
});

module.exports.Barber = model("Barber", barberSchema);