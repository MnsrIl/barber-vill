const Review = require("../models/Review.model")
const {Barber} = require("../models/Barber.model")

module.exports.reviewsController = {
  addReview: async (req, res) => {
    try {
      const { _id: id } = req.user;
      const { text, barberId } = req.body;

      const review = await Review.create({userId: id, text, barberId});
      await Barber.findByIdAndUpdate(barberId, {$push: {reviews: review._id}});

      return res.status(200).json({success: "Отзыв успешно добавлен", review});
    } catch (e) {
      return res.status(404).json({error: e});
    }
  },
  getReviewsForBarber: async (req, res) => {
    try {
      const data = await Review.find(req.params.barberId).populate("userId barberId")
      return res.status(200).json(data)
    } catch (e) {
      console.log(e)
      return res.status(400).json(`error while getting reviews: ${e.toString()}`)
    }
  },
  editReview: async (req, res) => {
    // есть сомнения по поводу этого метода
    const {text} = req.body
    try {
      await Review.findByIdAndUpdate(req.params.id, {text})
      return res.status(200).json(`review was updated`)
    } catch (e) {
      console.log(e)
      return res.status(400).json(`error while updating a review: ${e.toString()}`)
    }
  },
  removeReview: async (req, res) => {
    try {
      await Review.findByIdAndRemove(req.params.id)
      return res.status(200).json(`review was removed`)
    } catch (e) {
      console.log(e)
      return res.status(400).json(`error while removing a review: ${e.toString()}`)
    }
  }
}