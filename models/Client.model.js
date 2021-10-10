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

const Client = model("Client", clientSchema);

module.exports = Client;