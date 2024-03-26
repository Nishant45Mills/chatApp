const errorHandler = (err, req, res, next) => {
  switch (err.statusCode) {
    case 400:
      res.json({ code: err.statusCode, message: err.message });
      break;

    case 409:
      res.json({ code: err.statusCode, message: err.message });
      break;
  }
};

module.exports = errorHandler;
