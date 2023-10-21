// const { json } = require("express");

const User = require("../models/User");
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validaton");

const jwt = require("jsonwebtoken");

const { sendVerificationEmail } = require("../helpers/mailer");

const bcrypt = require("bcrypt");
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
    const bcryptedPassword = await bcrypt.hash(password, 12);

    //generating username#
    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);

    const user = await new User({
      first_name,
      last_name,
      email,
      password: bcryptedPassword,
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
exports.activateAccount = async (req, res) => {
  try {
    //checking for security for authorization
    const validUser = req.user.id;
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    //check
    const check = await User.findById(user.id);

    if (validUser !== user.id) {
      return res.status(400).json({
        message: "You don't have the authorization to perform this action",
      });
    }

    if (check.verified === true) {
      return res
        .status(400)
        .json({ message: "This email is already activated" });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res
        .status(200)
        .json({ message: "Account has been activated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login in function find user if on the system
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      //if user does not exist return message
      return res.status(400).json({
        message:
          "the email address you entered is not connected to an account ",
      });
    }

    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "Invaled Credentials please try again",
      });
    }

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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.auth = (req, res) => {
  res.json("welcome from auth");
};

exports.sendVerification = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (user.verified === true) {
      return res.status(400).json({
        message: "This account is already activated",
      });
    }

    const emailVerifiacationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );

    //sending activation code to user email geting the url from env file
    const url = `${process.env.BASE_URL}/activate/${emailVerifiacationToken}`;
    //passing from database to user
    sendVerificationEmail(user.email, user.first_name, url);
    return res.status(200).json({
      message: "Email verification has being send to your mail",
    });
  } catch (error) {}
};

exports.findUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await findOne({ email }).select("-password");
    if (!user) {
      return res.status(400).json({
        message: "Account does not exists",
      });
    }
    return res.status(200).json({ email: user.email, picture: user.picture });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
