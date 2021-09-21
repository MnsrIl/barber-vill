const { Router } = require("express")
const { hairstylesController } = require('../controllers/hairstyles.controller')

const router = Router()

router.post('/hairstyles', hairstylesController.addHairstyle)
router.get('/hairstyles', hairstylesController.getHairStyles)
router.patch('/reviews/:id', hairstylesController.updateHairStyle)
router.delete('/reviews/:id', hairstylesController.removeHairStyle)

module.exports = router