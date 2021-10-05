const { Router } = require("express");
const { hairstylesController } = require('../controllers/hairstyles.controller');

const router = Router();

router.get('/hairstyles', hairstylesController.getHairstylesByGender);
router.get('/hairstyles/:hairstyleID', hairstylesController.getHairstyleById);
router.get('/category/:categoryId/hairstyles', hairstylesController.getHairstylesByCategory);

router.post('/hairstyles', hairstylesController.addHairstyle);
router.patch('/hairstyles/:id', hairstylesController.updateHairStyle);
router.delete('/hairstyles/:id', hairstylesController.removeHairStyle);

module.exports = router;