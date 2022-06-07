const { UserModel } = require("../models/Users");
const bcrypt = require("bcrypt");

const salts = 10;

const users = {
  // Utilisateur Courtant
  getUsers(req, res) {
    UserModel.findById(req.user._id).then((user) => {
      res.send(user);
    });
  },

  putUserData(req, res) {
    const organisation = req.body.organisation;
    const email = req.body.email;

    if (!organisation) return res.sendStatus(400);
    if (!email) return res.sendStatus(400);

    UserModel.findByIdAndUpdate(req.user._id, {
      $set: { organisation, email },
    }).then((result) => {
      res.send("Utilisateur modifié");
    });
  },

  async putUserPassword(req, res) {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (!password) return res.sendStatus(400);
    if (!confirmPassword) return res.sendStatus(400);
    // password = confirmPassword ?
    if (password !== confirmPassword) return res.sendStatus(400);

    const hashedPassword = await bcrypt.hash(password, salts);

    UserModel.findByIdAndUpdate(req.user._id, {
      $set: { password: hashedPassword },
    }).then((result) => {
      res.send("Utilisateur modifié");
    });
  },
};

module.exports = users;
