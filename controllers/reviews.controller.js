const Review = require("../models/Review.model")

module.exports.reviewsController = {
  addReview: async (req, res) => {
    // нужен импорт модели "Barber"
    const { text, userId, barberId } = req.body
    try {
      await Review.create({text, userId, barberId})
      return res.status(200).json(`review was successfully added`)
    } catch (e) {
      console.log(e)
      return res.status(400).json(`error while adding a review: ${e.toString()}`)
    }
  },
  getReviewsForBarber: async (req, res) => {
    try {
      const data = await Review.find(req.params.barberId)
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