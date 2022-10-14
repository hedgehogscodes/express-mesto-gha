const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "63486360d9070d2e6c61c12c",
  };

  next();
});

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);
app.use("/*", (req, res) => {
  res.status(404).send({ message: "404 — запрашиваемый ресурс не найден" });
});

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error in server setup");
  } else {
    console.log(`Server listening on port ${PORT}`);
  }
});
