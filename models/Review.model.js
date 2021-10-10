const {model, Schema} = require("mongoose")

const reviewSchema = new Schema({
  text: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  barberId: {
    type: Schema.Types.ObjectId,
    ref: "Barber"
  }
},
  {timestamps: true}
)

const Review = model("Review", reviewSchema);

module.exports = Review;