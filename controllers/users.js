const User = require("../models/users");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => console.log(res, err));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error("notValidId"))
    .then((user) => res.send({ data: user }))
    .catch((err) => console.log(res, err));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => console.log(err));
};
