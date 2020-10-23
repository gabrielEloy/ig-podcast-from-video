const nodeMailer = require('nodemailer');

async function handleSendMail(toMail, subject, text) {
    const fromMail = process.env.MAIL

    const transporter = nodeMailer.createTransport({
        service: process.env.MAIL_PROVIDER,
        auth: {
            user: fromMail,
            pass: process.env.PASSWORD
        }
    });

    let mailOptions = {
        from: fromMail,
        to: toMail,
        subject: subject,
        text: text
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
                console.log(error);
                reject(error)
            }
            console.log(response)
            resolve(response)
        });
    })
}

module.exports = handleSendMail;