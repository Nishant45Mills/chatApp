const chatModel = require("../models/chat.model");
const userModel = require("../models/user.model");
const catchAsync = require("../util/catchAsync");

//For one on one chat
const createChat = catchAsync(async (req, res) => {
  const { userId } = req.body;

  const isChat = await chatModel
    .findOne({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
    .populate("users", "-password")
    .populate("latestMessage");
  if (isChat) {
    res.json(isChat);
  } else {
    const chat = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    const createdChat = await chatModel.create(chat);
    const fetchChat = await chatModel
      .findOne({ _id: createdChat["_id"] })
      .populate("users", "_id name email pic");
    res.json(fetchChat);
  }
});

const fetchChat = catchAsync(async (req, res) => {
  const fetchingChats = await chatModel
    .findOne({ users: { $elemMatch: { $eq: req.user._id } } })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage");
  res.json(fetchingChats);
});

const createGroupChat = catchAsync(async (req, res) => {
  const { chatName, user } = req.body;

  user.push(req.user._id);
  const chat = {
    chatName: chatName,
    isGroupChat: true,
    users: user,
    groupAdmin: req.user._id,
  };

  const group = await chatModel.create(chat);
  const groupChat = await chatModel
    .findOne({ _id: group._id })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  res.json(groupChat);
});

const renameGroup = catchAsync((req, res) => {
  res.send("rename group name");
});

const removeFromGroup = catchAsync((req, res) => {
  res.send("remove user from group");
});

const addToGroup = catchAsync((req, res) => {
  res.send("add user to the group");
});

module.exports = {
  createChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
};
