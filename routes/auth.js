const express = require("express");
const { UserModel } = require("../models/Users");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { checkAuth } = require("./checkAuth");

const salts = 10;

router.get("/infos", checkAuth, (req, res) => {
  const user = req.user;
  res.send(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  // vérifier si email et password correspondent
  const user = await UserModel.findOne({ email });

  if (user === null) {
    res.status(400);
    return res.send("Vous n'existez pas");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  const token = jwt.sign({ id: user._id }, process.env.SECRET);

  if (isMatch) res.send({ jwt: token });
  else {
    res.status(400);
    res.send("Mot de passe incorrect");
  }
});

router.post("/signup", async (req, res) => {
  const { organisation, email, password, confirmPassword } = req.body;

  // a-t-on toutes les variables nécessaires ?
  if (!organisation) return res.sendStatus(400);
  if (!email) return res.sendStatus(400);
  if (!password) return res.sendStatus(400);
  if (!confirmPassword) return res.sendStatus(400);

  // password = confirmPassword ?
  if (password !== confirmPassword) return res.sendStatus(400);

  const hashedPassword = await bcrypt.hash(password, salts);

  // vérifier que l'utilisateur n'existe pas
  const result = await UserModel.find({ email });
  const creationPossible = result.length === 0;
  if (creationPossible) {
    try {
      await UserModel.create({ organisation, email, password: hashedPassword });
    } catch (err) {
      return res.sendStatus(500);
    }
    res.sendStatus(201);
  } else {
    res.status(400);
    res.send("Existe déjà");
  }
});

module.exports = router;
