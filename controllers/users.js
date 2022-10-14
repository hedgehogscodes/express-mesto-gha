const User = require("../models/users");
const { hendleError } = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => hendleError(res, err));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error("notValidId"))
    .then((user) => res.send({ data: user }))
    .catch((err) => hendleError(res, err));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => hendleError(res, err));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error("notValidId"))
    .then((user) => res.send({ data: user }))
    .catch((err) => hendleError(res, err));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error("notValidId"))
    .then((user) => res.send({ data: user }))
    .catch((err) => hendleError(res, err));
};
