const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema({
  text: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  barberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Barber"
  }
},
  {timestamps: true}
)

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review