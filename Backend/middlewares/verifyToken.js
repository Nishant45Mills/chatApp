const userModel = require("../models/user.model");
const ApiError = require("../util/ApiError");
const catchAsync = require("../util/catchAsync");
const jwt = require("jsonwebtoken");

const verifyToken = catchAsync(async (req, res, next) => {
  let authToken = req.headers.authorization;
  let tokenInfo = authToken.split(" ");
  let tokenType = tokenInfo[0];
  let token = tokenInfo[1];

  jwt.verify(token, process.env.JWT_SECRATE_KEY, async (err, decode) => {
    if (err) {
      //handle the error
      throw new ApiError(401, "Unauthorized error");
    }

    const user = await userModel.findOne({ _id: decode["_id"] });
    req.user = user;
    next();
  });
});

module.exports = { verifyToken };
