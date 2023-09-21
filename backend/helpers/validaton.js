//using RegEx for validation

const { text } = require("express");
const User = require("../models/User");

//checking the email
exports.validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};

//checking the length of the email
exports.validateLength = (text, min, max) => {
  if (text.length > max || text.length < min) {
    return false;
  }
  return true;
};

//checking to see if username already exist in the database
exports.validateUsername = async (username) => {
  let a = false;

  do {
    //find this username
    let check = await User.findOne({ username });
    if (check) {
      //if username already exist use this code to create new one
      username += (+new Date() * Math.random()).toString().substring(0, 1);
    }
  } while (a);
  return username;
};
