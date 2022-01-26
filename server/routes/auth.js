const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware");
const authObj = require("../auth.json");

const rounds = 10;
const tokenSecret = authObj.tokenSecret;
console.log(authObj);

router.get("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user)
        res.status(404).json({ error: "no user with that email found" });
      else {
        bcrypt.compare(req.body.password, user.password, (error, match) => {
          if (error) res.status(500).json(error);
          else if (match) res.status(200).json({ token: generateToken(user) });
          else res.status(403).json({ error: "passwords do not match" });
        });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, rounds, (error, hash) => {
    if (error) res.status(500).json(error);
    else {
      const newUser = User({
        email: req.body.email,
        password: hash,
        phoneNumber: req.body.phoneNumber,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });
      newUser
        .save()
        .then((user) => {
          res.status(200).json({ token: generateToken(user) });
        })
        .catch((error) => {
          console.log("error");
          res.status(500).json(error);
        });
    }
  });
});

router.get("/jwt-test", middleware.verify, (req, res) => {
  res.status(200).json(req.user);
});

function generateToken(user) {
  return jwt.sign({ data: user }, tokenSecret, { expiresIn: "24h" });
}

module.exports = router;
