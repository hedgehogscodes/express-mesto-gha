const ERRORS = {
  ERROR_400: {
    CODE: 400,
    MESSAGE: "400 — переданы некорректные данные",
  },
  ERROR_404: {
    CODE: 404,
    MESSAGE: "404 — запрашиваемый ресурс не найден",
  },
  ERROR_500: {
    CODE: 500,
    MESSAGE: "500 — на сервере произошла ошибка",
  },
};

const hendleError = (res, err) => {
  if (err.name === "CastError" || err.name === "ValidationError") {
    res.status(ERRORS.ERROR_400.CODE).send({ message: ERRORS.ERROR_400.MESSAGE });
  } else if (err.message === "notValidId") {
    res.status(ERRORS.ERROR_404.CODE).send({ message: ERRORS.ERROR_404.MESSAGE });
  } else {
    res.status(ERRORS.ERROR_500.CODE).send({ message: ERRORS.ERROR_500.MESSAGE });
  }
};

module.exports = { hendleError };
