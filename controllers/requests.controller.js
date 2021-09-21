const Request = require('../models/Request.model')

module.exports.requestsController = {
  sendRequest: async (req, res) => {
    const { userId, barberId, hairstyleId, date, text } = req.body
    try {
      await Request.create({ userId, barberId, hairstyleId, date, text })
      return res.status(200).json(`request was successfully sent`)
    } catch (e) {
      console.log(e)
      return res.status(400).json(`error while sending the request: ${e.toString()}`)
    }
  },
  getRequestsForBarber: async (req, res) => {
    const { barberId } = req.body
    try {
      const data = await Request.findById({ barberId })
      return res.status(200).json(data)
    } catch (e) {
      console.log(e)
      return res.status(400).json(`error while getting requests: ${e.toString()}`)
    }
  },
  acceptRequest: async (req, res) => {
    try {
      await Request.findByIdAndUpdate(req.params.id, { isAccept: true })
      return res.status(200).json(`request was successfully accepted`)
    } catch (e) {
      return res.status(400).json(`error while accepting the request: ${e.toString()}`)
    }
  }
}