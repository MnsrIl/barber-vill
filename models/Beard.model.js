const mongoose = require('mongoose')

const beardSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number
  },
  { timestamps: true }
)

const Beard = mongoose.model('Beard', beardSchema)

module.exports = Beard