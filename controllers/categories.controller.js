const Category = require('../models/Category.model')

module.exports.categoriesController = {
  addCategory: async (req, res) => {
    const { name, type, gender } = req.body
    try {
      await Category.create({ name, type, gender })
      return res.status(200).json(`category was added`)
    } catch (e) {
      console.log(e)
      return res.status(400).json(`error while adding a category: ${e.toString()}`)
    }
  },
  getCategories: async (req, res) => {
    const { name, type, gender } = req.body
    try {
      const data = await Category.create({ name, type, gender })
      return res.status(200).json(data)
    } catch (e) {
      console.log(e)
      return res.status(400).json(`error while getting categories: ${e.toString()}`)
    }
  },
  updateCategory: async (req, res) => {
    const { name } = req.body
    try {
      await Category.findByIdAndUpdate(req.params.id,{ name })
      return res.status(200).json(`category was updated`)
    } catch (e) {
      console.log(e)
      return res.status(400).json(`error while updating a category: ${e.toString()}`)
    }
  },
  removeCategory: async (req, res) => {
    try {
      await Category.findByIdAndRemove(req.params.id)
      return res.status(200).json(`category was removed`)
    } catch (e) {
      console.log(e)
      return res.status(400).json(`error while removing a category: ${e.toString()}`)
    }
  }
}