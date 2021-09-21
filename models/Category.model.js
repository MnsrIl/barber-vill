const mongoose = require('mongoose')

// обсудить насчет этой модели по поводу фильтрации причесок по типу борода/прическа и муж/жен

const categorySchema = mongoose.Schema({
  name: String,
  type: String,
  gender: String
},
  { timestamps: true }
)

const Category = mongoose.model('Category', categorySchema)

module.exports = Category