const jwt = require("jsonwebtoken");

//function form generating token payload and expirtion
exports.generateToken = (payload, expired) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: expired,
  });
};
