const Card = require("../models/cards");
const { NotFoundError, BadRequestError, ForbiddenError } = require("../utils/errors");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError("Данные о карточках не найдены!");
      }
      res.send(cards);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((newCard) => {
      if (!newCard) {
        throw new NotFoundError("Неправильно переданы данные");
      } else {
        res.send(newCard);
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BadRequestError("Ошибка валидации. Введены некорректные данные"),
        );
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    .select("+owner")
    .orFail(() => {
      throw new NotFoundError(
        "Карточки с таким id не существует, невозможно удалить!",
      );
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError("Нельзя удалить чужую карточку!");
      }
    })
    .then(() => {
      Card.findByIdAndRemove(req.params._id)
        .then((card) => {
          if (!card) {
            throw new NotFoundError("Запрашиваемый ресурс не найден");
          }
          res.send(card);
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(
          "Карточки с таким id не существует, невозможно проставить лайк",
        );
      }
      res.send(card);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(
          "Карточки с таким id не существует, невозможно забрать лайк",
        );
      }
      res.send(card);
    })
    .catch(next);
};
