// const { json } = require("express");

const User = require("../models/User");
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validaton");

const jwt = require("jsonwebtoken");

const { sendVerificationEmail } = require("../helpers/mailer");

const bcript = require("bcrypt");
const { generateToken } = require("../helpers/token");

//function for registering a user
exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
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
      username: newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    //generating token for registered user at that instances
    //by providing the user id for eie3r dieoner efi
    const emailVerifiacationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );

    //sending activation code to user email geting the url from env file
    const url = `${process.env.BASE_URL}/activate/${emailVerifiacationToken}`;
    //passing from database to user
    sendVerificationEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Register Success ! please activate your email to start",
    });

    // res.json(user);
  } catch (error) {
    console.error("Error while saving user", error);
    res
      .status(500)
      .json({ message: "An error occurred while saving the user." });
  }
};

//function to activate users when they register for the first time
exports.activateAccount = (req, res) => {
  const { token } = req.body;
  const user = jwt.verify(token, process.env.TOKEN_SECRET);
  console.log(user);
};
