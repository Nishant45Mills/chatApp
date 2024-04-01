const userModel = require("../models/user.model");
const ApiError = require("../util/ApiError");
const catchAsync = require("../util/catchAsync");

const getUser = catchAsync(async (req, res) => {
  const user = await userModel.find({
    $or: [
      { name: { $regex: req.query.search, $options: "i" } },
      { email: { $regex: req.query.search, $options: "i" } },
    ],
    $ne: { _id: req.user._id },
  });

  user.password = undefined;
  console.log(user);

//   const users = user.filter((data) => {
//     return data["_id"] !== req.user._id;
//   });
  //   res.json(user);
//   console.log(users);
});

module.exports = { getUser };
