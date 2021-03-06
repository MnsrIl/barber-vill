const {Schema, model} = require('mongoose')

// обсудить насчет этой модели по поводу фильтрации причесок по типу борода/прическа и муж/жен

const categorySchema = new Schema({
  name: String,
  type: String,
  gender: String
},
  { timestamps: true }
)

const Category = model('Category', categorySchema);

module.exports = Category;