const Request = require('../models/Request.model');
const Client = require("../models/Client.model");
const Barber = require("../models/Barber.model");
const User = require("../models/User.model");

module.exports.requestsController = {
    createRequest: async (req, res) => {
    try {
      const { role,personal } = req.user;
      const { barberId, hairstyle, beard, date } = req.body;
      const client = await Client.findById(personal._id);
      const barber = await User.findById(barberId).populate("personal", "-password");

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
        date,
        clientId: client._id,
        barberId: barber.personal._id,
        requestData: {hairstyleId: hairstyle?._id, beardId: beard?._id, total: totalPrice }
      });

      const updateOptions = {$push: {requests: newRequest._id}, $inc: {balance: totalPrice}};

      await Barber.findByIdAndUpdate(barber.personal._id, updateOptions);
      await Client.findByIdAndUpdate(client._id, {$inc: {balance: -totalPrice}});

      // const requestsCount = await Request.find().count();
      //console.log(requestsCount, barber.name, barber.personal?.telegram, client._id, totalPrice);

      return res.status(200).json({
        success: "Ваша запись успешно оформлена! Приходите вовремя :)",
        balance: client.balance - totalPrice
      });
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