const mongoose = require('mongoose')

// брееееееееееееееееееед возможно ключ barberId стоит убрать и прием заявки сделать со стороны админа
// также возможно стоит убрать ключ hairstyleId, т.к. прическу можно выбрать уже на месте приема и плюс еще придется передать id бороды, если клиент захочет оба сделать
// добавил от себя ключ text, на случай если сойдемся во мнении что стоит удалить ключ hairstyleId

const requestSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  hairstyleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hairstyle"
  },
  date: String,
  barbedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Barber"
  },
  isAccept: {
    type: Boolean,
    default: false
  },
  text: String
}, {timestamps: true}
)

const Request = mongoose.model("Request", requestSchema)

module.exports = Request