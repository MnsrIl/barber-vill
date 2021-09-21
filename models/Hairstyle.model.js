const mongoose = require('mongoose')

const hairstyleSchema = mongoose.Schema({
  name: String,
  image: String,
  gender: String,
  price: Number
},
  { timestamps: true }
)

const Hairstyle = mongoose.model('Hairstyle', hairstyleSchema)

module.exports = Hairstyle

// Возможно нужен еще один ключ "categoryId"