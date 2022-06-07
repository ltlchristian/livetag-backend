const nodemailer = require("nodemailer");
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;

async function sendMailWithOutlook(participant, urlQrCode) {
    if(participant) {
        // Create the transporter with the required configuration for Outlook
        // change the user and pass !
        var transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com", // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            tls: {
            ciphers:'SSLv3'
            },
            auth: {
                user: MAIL_USER,
                pass: MAIL_PASS
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"LiveTag app" <livetag_app@hotmail.com>', // sender address (who sends)
            to: participant.email, // list of receivers
            subject: `${participant.event.event_name} à ${participant.event.place}`, // Subject line
            text: `${participant.lastname} ${participant.firstname}, email: ${participant.email}, tel: ${participant.telephone}: ${urlQrCode}`, // plain text body
            html: `<p>${participant.lastname} ${participant.firstname}, email: ${participant.email}, tel: ${participant.telephone}</p><img src="${urlQrCode}" alt="" />`, // html body
        });

        console.log('Message sent: ' + info.response);
    }
}

sendMailWithOutlook().catch(console.error);

module.exports = sendMailWithOutlook;
