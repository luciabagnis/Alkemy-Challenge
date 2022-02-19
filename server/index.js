const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");

app.use(express.json());
app.use(cors());

//ROUTERS
const homeRouter = require("./routes/Home");
app.use("/", homeRouter);

const userRouter = require("./routes/User");
app.use("/auth", userRouter);

const transactionRouter = require("./routes/Transaction");
app.use("/transaction", transactionRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
