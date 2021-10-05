const {Schema, model} = require('mongoose')

const beardSchema = new Schema({
    name: String,
    image: String,
    price: Number,
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
  },
  { timestamps: true }
);

module.exports = model('Beard', beardSchema);