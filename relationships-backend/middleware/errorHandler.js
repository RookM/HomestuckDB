const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.INVALID_INPUT:
      res.json({ title: "Invalid Input", error_message: err.message });
      break;
    case constants.UNAUTHORIZED:
      res.json({ title: "Unauthorized", error_message: err.message });
      break;
    case constants.FORBIDDEN:
      res.json({ title: "Forbidden", error_message: err.message });
      break;
    case constants.NOT_FOUND:
      res.json({ title: "Not Found", error_message: err.message });
      break;
    case constants.SERVER_ERROR:
      res.json({ title: "Server Error", error_message: err.message });
      break;
    default:
      console.log("No Error");
      break;
  }
};

module.exports = errorHandler;
