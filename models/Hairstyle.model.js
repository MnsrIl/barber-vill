const {model, Schema} = require('mongoose')

const hairstyleSchema = new Schema({
  name: String,
  image: String,
  price: Number,
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  }
},
  { timestamps: true }
)

const Hairstyle = model('Hairstyle', hairstyleSchema);

module.exports = Hairstyle;