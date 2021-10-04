const Request = require('../models/Request.model')

module.exports.requestsController = {
  createRequest: async (req, res) => {
    try {
      const {personal} = req.user;
      const { barberId, hairstyle, beard, date } = req.body;

      if (!barberId) {
        return res.status(400).json({error: "Необходимо выбрать парикмахера!"});
      }

      await Request.create({
        clientId: personal._id, barberId,
        requestData: {hairstyle: hairstyle._id, beard: beard._id, total: hairstyle?.price + beard?.price },
        date
      });

      return res.status(200).json({success: "Ваша заявка успешно отправлена! Приходите вовремя :)"});
    } catch (e) {
      return res.status(400).json({error: e});
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