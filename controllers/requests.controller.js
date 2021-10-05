const Request = require('../models/Request.model')
const {Client} = require("../models/Client.model");
const {Barber} = require("../models/Barber.model");

module.exports.requestsController = {
    createRequest: async (req, res) => {
    try {
      const {_id, role,personal} = req.user;
      const { barberId, hairstyle, beard, date } = req.body;
      const client = await Client.findById(personal._id);

      if (role === 'Barber') {
        return res.status(400).json({error: "К сожалению, только клиент может оставить заявку"})
      }
      if (!barberId) {
        return res.status(400).json({error: "Необходимо выбрать парикмахера!"});
      }
      if (!date) {
        return res.status(400).json({error: "Необходимо указать дату!"})
      }
      if (hairstyle.name === 'Кладка') { //Убрать в будущем
        return res.status(400).json({error: "Данная причёска пока не доступна к покупке!"})
      }

      const totalPrice = (beard?.price || 0) + (hairstyle?.price || 0);

      if (client.balance < totalPrice) {
        return res.status(400).json({error: "Недостаточно средств на балансе! Пожалуйста, пополните ваш счёт для оплаты"})
      }


      const newRequest = await Request.create({
        clientId: client._id, barberId,
        requestData: {hairstyle: hairstyle?._id, beard: beard?._id, total: totalPrice },
        date
      });

      await Barber.findByIdAndUpdate(barberId, {$push: {requests: newRequest._id}});
      const updatedClient = await Client.findByIdAndUpdate(client._id, {balance: client.balance - totalPrice });

      return res.status(200).json({success: "Ваша запись успешно оформлена! Приходите вовремя :)", balance: client.balance - totalPrice});
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