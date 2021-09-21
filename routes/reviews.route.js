const { Router } = require("express")
const { reviewsController } = require('../controllers/reviews.controller')

const router = Router()

router.post('/reviews', reviewsController.addReview)
router.get('/reviews', reviewsController.getReviewsForBarber)
router.patch('/reviews/:id', reviewsController.editReview)
router.delete('/reviews/:id', reviewsController.removeReview)

module.exports = router