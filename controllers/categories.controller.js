const Category = require('../models/Category.model')

module.exports.categoriesController = {
  addCategory: async (req, res) => {
    const { name, type, gender } = req.body
    try {
      await Category.create({ name, type, gender })
      return res.status(200).json(`category was added`)
    } catch (e) {
      return res.status(400).json({error: e})
    }
  },
  getCategories: async (req, res) => {
    try {
      const data = await Category.find({gender: req.params.gender});
      return res.status(200).json({success: "Категории успешно загружены!", data});
    } catch (e) {
      return res.status(400).json({error: e})
    }
  },
  updateCategory: async (req, res) => {
    const { name } = req.body
    try {
      await Category.findByIdAndUpdate(req.params.id,{ name })
      return res.status(200).json(`category was updated`)
    } catch (e) {
      return res.status(400).json({error: e})
    }
  },
  removeCategory: async (req, res) => {
    try {
      await Category.findByIdAndRemove(req.params.id)
      return res.status(200).json(`category was removed`)
    } catch (e) {
      return res.status(400).json({error: e})
    }
  }
}