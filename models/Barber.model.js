const { model, Schema } = require("mongoose");

const barberSchema = new Schema({
    lastname: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    desc: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    telegram: {
        type: String
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    location: new Schema({
        lng: {
            type: String,
            required: true
        },
        lat: {
            type: String,
            required: true
        }
    })
});

module.exports.Barber = model("Barber", barberSchema);