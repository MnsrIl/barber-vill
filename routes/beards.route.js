const { Router } = require("express")
const { beardsController } = require('../controllers/beards.controller')

const router = Router()

router.get('/beards', beardsController.getBeards);
router.get('/beards/:beardId', beardsController.getOneBeard)
router.get('/category/:categoryId/beards', beardsController.getBeardsByCategory);

router.post('/beards', beardsController.addBeard)
router.patch('/beards/:id', beardsController.updateBeard)
router.delete('/beards/:id', beardsController.removeBeard)

module.exports = router