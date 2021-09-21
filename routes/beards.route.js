const { Router } = require("express")
const { beardsController } = require('../controllers/beards.controller')

const router = Router()

// возможно стоит обсудить роуты beards

router.post('/beards', beardsController.addBeard)
router.get('/beards', beardsController.getBeards)
router.patch('/beards/:id', beardsController.updateBeard)
router.delete('/beards/:id', beardsController.removeBeard)

module.exports = router