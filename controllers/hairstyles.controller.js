const Hairstyle = require('../models/Hairstyle.model')
// const Category = require('../models/Category.model')

// возможно понадобится импорт модели "Category"

module.exports.hairstylesController = {
  addHairstyle: async (req, res) => {
    const { name, image, gender, price, categoryId } = req.body
    try {
      await Hairstyle.create({name, image, gender, price, categoryId});
      return res.status(200).json(`hairstyle was successfully added`)
    } catch (e) {
      console.log(e)
      return res.status(400).json(`error while adding hairstyle: ${e.toString()}`)
    }
  },
  getHairStyles: async (req, res) => {
    try {
      const data = await Hairstyle.find()
      return res.status(200).json({data});
    } catch (e) {
      console.log(e)
      return res.status(400).json({error: e});
    }
  },
  getHairStyleById: async (req, res) => {
    try {
      const data = await Hairstyle.findById(req.params.id)
      return res.status(200).json(data)
    }catch (e) {
      return res.status(400).json(`error while getting hairstyles: ${e.toString()}`)
    }
  },
  updateHairStyle: async (req, res) => {
    const { name, image, gender, price, categoryId} = req.body
    try {
      await Hairstyle.findByIdAndUpdate(req.params.id, { name, image, gender, price, categoryId })
      return res.status(200).json(`hairstyle was successfully updated`)
    } catch (e) {
      console.log(e)
      return res.status(400).json(`error while updating hairstyle: ${e.toString()}`)
    }
  },
  removeHairStyle: async (req, res) => {
    try {
      await Hairstyle.findByIdAndRemove(req.params.id)
      return res.status(200).json(`hairstyle was successfully removed`)
    } catch (e) {
      console.log(e)
      return res.status(400).json(`error while removing hairstyle: ${e.toString()}`)
    }
  },
  // getHairstylesByCategory: async (req, res) => {
  //   const category = await Category.find(req.params)
  //   const hairstyle = await Hairstyle.find(category)
  // }
}