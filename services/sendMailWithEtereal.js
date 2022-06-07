const nodemailer = require("nodemailer");
const dayjs = require("dayjs");

async function sendMailWithEtereal(participant, urlQrCode) {
    if(participant) {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();
        //console.log(testAccount);

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"LiveTag app" <livetag_app@hotmail.com>', // sender address (who sends)
            to: participant.email, // list of receivers
            subject: `${participant.event.event_name} à ${participant.event.place} du ${dayjs(participant.event.start_date).format('DD/MM/YYYY')} au ${dayjs(participant.event.end_date).format('DD/MM/YYYY')}`, // Subject line
            text: `${participant.role.role_name}, ${participant.lastname} ${participant.firstname}, email: ${participant.email}, tel: ${participant.telephone}: ${urlQrCode}`, // plain text body
            html: `<p>${participant.role.role_name}</p><p>${participant.lastname} ${participant.firstname}, email: ${participant.email}, tel: ${participant.telephone}</p><img src="${urlQrCode}" alt="" />`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
}

sendMailWithEtereal().catch(console.error);

module.exports = sendMailWithEtereal;
