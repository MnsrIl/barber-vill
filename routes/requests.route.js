const { Router } = require("express")
const { requestsController } = require('../controllers/requests.controller')
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router()

router.post('/requests', authMiddleware, requestsController.createRequest);
router.get('/requests/:barberId/requests', requestsController.getRequestsForBarber)
router.patch('/requests/:requestId/accept', requestsController.acceptRequest)

module.exports = router