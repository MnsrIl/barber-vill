const {Schema, model} = require('mongoose')

// брееееееееееееееееееед возможно ключ barberId стоит убрать и прием заявки сделать со стороны админа
// также возможно стоит убрать ключ hairstyleId, т.к. прическу можно выбрать уже на месте приема и плюс еще придется передать id бороды, если клиент захочет оба сделать
// добавил от себя ключ text, на случай если сойдемся во мнении что стоит удалить ключ hairstyleId

const requestSchema = new Schema({
    clientId: {
        type: Schema.Types.ObjectId,
        ref: "Client"
    },
    barberId: {
        type: Schema.Types.ObjectId,
        ref: "Barber"
    },
    requestData: {
        hairstyleId: {
            type: Schema.Types.ObjectId,
            ref: "Hairstyle"
        },
        beardId: {
            type: Schema.Types.ObjectId,
            ref: "Beard"
        },
        total: {
            type: Number,
            default: 0
        }
    },

    date: {
        type: Date,
        required: true
    },

    isAccepted: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});

const Request = model("Request", requestSchema);

module.exports = Request;