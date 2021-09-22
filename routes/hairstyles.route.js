const { Router } = require("express")
const { hairstylesController } = require('../controllers/hairstyles.controller')

const router = Router()

router.post('/hairstyles', hairstylesController.addHairstyle)
router.get('/hairstyles', hairstylesController.getHairStyles)
router.patch('/hairstyles/:id', hairstylesController.updateHairStyle)
router.delete('/hairstyles/:id', hairstylesController.removeHairStyle)

module.exports = router