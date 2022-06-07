const ParticipantModel = require("../models/Participants");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 10 });
const API_URL = process.env.API_URL;
const sendMailWithEtereal = require("../services/sendMailWithEtereal");
const sendMailWithOutlook = require("../services/sendMailWithOutlook")
var qrCode = require("qrcode");

const roleController = {

  /* Generate QRcode and send mail */
  generateQrCode(req, res) {
    const idParticipant = req.params.idParticipant;
    console.log("generateQrCode", idParticipant);

    qrCode.toDataURL(JSON.stringify(idParticipant), function (err, url) {

        ParticipantModel.findById(idParticipant)
        .populate(["role", "optional_activities", "event"])
        .then((participant) => {
            sendMailWithEtereal(participant, url)
            res.send(`Le Qrcode a été envoyée à ${participant.email}`);
        })
        .catch((error) => {
          console.log("Error generateQrCode", error);
          res.sendStatus(500);
        });
    });

  },

};

module.exports = roleController;
