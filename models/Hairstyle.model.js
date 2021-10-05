const mongoose = require('mongoose')

const hairstyleSchema = mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }
},
  { timestamps: true }
)

const Hairstyle = mongoose.model('Hairstyle', hairstyleSchema)

module.exports = Hairstyle

// Возможно нужен еще один ключ "categoryId"