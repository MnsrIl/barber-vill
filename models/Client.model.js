const { model, Schema } = require("mongoose");

const clientSchema = new Schema({
    number: {
        required: true,
        type: String
    },
    balance: {
        type: Number,
        default: 0,
    }
})

module.exports.Client = model("Client", clientSchema);