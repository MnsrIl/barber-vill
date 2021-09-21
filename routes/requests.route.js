const { Router } = require("express")
const { requestsController } = require('../controllers/requests.controller')

const router = Router()

router.post('/:hairstyleId/requests', requestsController.sendRequest)
router.get('/:barberId/requests', requestsController.getRequestsForBarber)
router.patch('/:barberId/requests', requestsController.acceptRequest)

module.exports = router