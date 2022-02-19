const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const Transaction = require("../models").Transaction;
const User = require("../models").User;

router.get("/", (req, res) => {});

//UPDATE BALANCE
router.get("/balance", validateToken, async (req, res) => {
  const id = req.user.id;

  const balance = await User.findOne({
    where: {
      id: id,
    },
    attributes: ["total_balance"],
  });

  res.json(balance);
});

//CREATE TRANSACTION
router.post("/", validateToken, async (req, res) => {
  const { concept, amount, date, type, comment } = req.body;
  const id = req.user.id;

  await Transaction.create({
    concept: concept,
    amount: amount,
    date: date,
    type: type,
    comment: comment,
    UserId: id,
  });

  const user = await User.findOne({
    where: {
      id: id,
    },
  });

  //CHANGES THE TOTAL BALANCE BASED ON INCOME OR EGRESS AND UPDATES
  if (type === "Income") {
    const newValue = parseFloat(user.total_balance) + parseFloat(amount);

    var values = { total_balance: newValue };
    var condition = { where: { id: id } };
    await User.update(values, condition);
  }

  if (type === "Egress") {
    const newValue = parseFloat(user.total_balance) - parseFloat(amount);

    var values = { total_balance: newValue };
    var condition = { where: { id: id } };
    await User.update(values, condition);
  }
});

router.post("/");

// LIST OF ALL
router.get("/list", validateToken, async (req, res) => {
  const id = req.user.id;
  const transaction = await Transaction.findAll({
    include: {
      all: true,
    },
    where: {
      UserId: id,
    },
  });
  res.json(transaction);
});

// LIST OF INCOME

router.get("/list/income", validateToken, async (req, res) => {
  const id = req.user.id;

  const income = await Transaction.findAll({
    where: {
      UserId: id,
      type: "Income",
    },
  });

  res.json(income);
});

// LIST OF EGRESS

router.get("/list/egress", validateToken, async (req, res) => {
  const id = req.user.id;

  const egress = await Transaction.findAll({
    where: {
      UserId: id,
      type: "Egress",
    },
  });

  res.json(egress);
});

// INDIVIDUAL

router.get("/:id", async (req, res) => {
  const transactionId = req.params.id;

  const transaction = await Transaction.findOne({
    where: {
      id: transactionId,
    },
  });

  res.json(transaction);
});

// ELIMINAR POST

router.delete("/:id", validateToken, async (req, res) => {
  const id = req.params.id;

  await Transaction.destroy({
    where: {
      id: id,
    },
  });
});

// PUT REQUEST

router.get("/edit/:id", validateToken, (req, res) => {});

router.put("/edit/:id", validateToken, async (req, res) => {
  const { concept, date, comment } = req.body;
  const id = req.params.id;

  var values = { concept: concept, date: date, comment: comment };
  var condition = { where: { id: id } };

  const changes = await Transaction.update(values, condition);

  res.json(changes);
});

module.exports = router;
