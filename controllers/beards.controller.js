const Beard = require('../models/Beard.model')

// возможно понадобится импорт модели "Category"

module.exports.beardsController = {
  addBeard: async (req, res) => {
    const { name, image, price} = req.body
    try {
      await Beard.create({name, image, price})
      return res.status(200).json(`beard was successfully added`)
    } catch (e) {
      console.log(e)
      return res.status(400).json(`error while adding beard: ${e.toString()}`)
    }
  },
  getBeards: async (req, res) => {
    try {
      const data = await Beard.find()
      return res.status(200).json(data)
    } catch (e) {
      console.log(e)
      return res.status(400).json(`error while getting beards: ${e.toString()}`)
    }
  },
  updateBeard: async (req, res) => {
    const { name, image, price } = req.body
    try {
      await Beard.findByIdAndUpdate(req.params.id, { name, image, price })
      return res.status(200).json(`beard was successfully updated`)
    } catch (e) {
      console.log(e)
      return res.status(400).json(`error while updating beard: ${e.toString()}`)
    }
  },
  removeBeard: async (req, res) => {
    try {
      await Beard.findByIdAndRemove(req.params.id)
      return res.status(200).json(`beard was successfully removed`)
    } catch (e) {
      console.log(e)
      return res.status(400).json(`error while removing beard: ${e.toString()}`)
    }
  }
}