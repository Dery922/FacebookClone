// const { json } = require("express");

const User = require("../models/User");
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validaton");
const bcript = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    //checking email validation
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email address",
      });
    }

    //check if a user email already exist on the database
    //email validation
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          "This email address already exists. try with a different email",
      });
    }

    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: "first name must between 3 and 30 characters",
      });
    }
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: "last name must between 3 and 30 characters",
      });
    }
    if (!validateLength(password, 3, 30)) {
      return res.status(400).json({
        message: "Password must be more than 3 characters",
      });
    }

    //encryting password
    const bcriptPassword = await bcript.hash(password, 12);

    //generating username#
    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);

    const user = await new User({
      first_name,
      last_name,
      email,
      password,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();
    res.json(user);
  } catch (error) {
    console.error("Error while saving user", error);
    res
      .status(500)
      .json({ message: "An error occurred while saving the user." });
  }
};
