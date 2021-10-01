const { Router } = require("express");
const { hairstylesController } = require('../controllers/hairstyles.controller');

const router = Router();

router.get('/hairstyles/:gender', hairstylesController.getHairStyles);
router.get('/hairstyles/:id', hairstylesController.getHairStyleById);
router.get('/category/:categoryId/hairstyles', hairstylesController.getHairstyleByCategory);
router.post('/hairstyles', hairstylesController.addHairstyle);
router.patch('/hairstyles/:id', hairstylesController.updateHairStyle);
router.delete('/hairstyles/:id', hairstylesController.removeHairStyle);

module.exports = router;