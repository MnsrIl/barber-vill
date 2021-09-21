const { Router } = require("express")
const { categoriesController } = require('../controllers/categories.controller')

const router = Router()

router.post('/categories', categoriesController.addCategory)
router.get('categories', categoriesController.getCategories)
router.patch('/categories/:id', categoriesController.updateCategory)
router.delete('/categories/:id', categoriesController.updateCategory())

module.exports = router