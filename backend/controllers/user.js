// const { json } = require("express");

const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      gender,
      bYear,
      bMonth,
      bDay,
    } = req.body;
    const user = await new User({
      first_name,
      last_name,
      username,
      email,
      password,
      gender,
      bYear,
      bMonth,
      bDay,
    }).save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
