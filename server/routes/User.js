const express = require("express");
const router = express.Router();
const User = require("../models").User;
const bcrypt = require("bcrypt");

const { sign } = require('jsonwebtoken')
const { validateToken } = require('../middlewares/AuthMiddleware')

// CREATE USER
router.post("/", async (req, res) => {
  
  const {
    first_name,
    last_name,
    username,
    email,
    password,
    password_confirmation,
    total_balance,
  } = req.body;

  if (password === password_confirmation) {
    bcrypt.hash(password, 10).then((hash) => {
      User.create({
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        password: hash,
        password_confirmation: hash,
        total_balance: total_balance,
      });
    });
  }

  res.json("succesful");
});

// LOGIN

router.post('/login', async(req,res) => {
    const { email, password} = req.body;

    const user = await User.findOne({ where: { email: email }})

    if(!user) res.json({error: 'user does not exist'});

    bcrypt.compare(password, user.password).then(async(correct) => {
        if (!correct) res.json({error: "wrong user or password"})
    })

    const token = sign({
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      total_balance: user.total_balance,
      id: user.id
    }, "secret")

    res.json({token: token,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      total_balance: user.total_balance,
      id: user.id
    })
})
// USER AUTHENTICATION
router.get("/auth",validateToken, (req,res) => {
  res.json(req.user);
})


module.exports = router;
