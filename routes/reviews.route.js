const { Router } = require("express")
const { reviewsController } = require('../controllers/reviews.controller')
const authMiddleware = require("../middlewares/auth.middleware")

const router = Router()

router.post('/reviews', authMiddleware, reviewsController.addReview)
router.get('/reviews', reviewsController.getReviewsForBarber)
router.patch('/reviews/:id', reviewsController.editReview)
router.delete('/reviews/:id', reviewsController.removeReview)

module.exports = router