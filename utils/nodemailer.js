const nodemailer = require("nodemailer");

const {NODEMAILER_LOGIN, NODEMAILER_PASSWORD} = process.env;

const transporter = nodemailer.createTransport({ //MAIL MESSAGE
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: NODEMAILER_LOGIN,
        pass: NODEMAILER_PASSWORD
    },
}, {
    from: `Barber-Vill <${NODEMAILER_LOGIN}>`,
    subject: 'Новая заявка',
});

const mailer = (mail) => {
    transporter.sendMail(mail, (err, info) => {
        if (err) {
            return console.log(err);
        } else {
            return console.log('Email sent: ', info);
        }
    });
};

module.exports = mailer;
