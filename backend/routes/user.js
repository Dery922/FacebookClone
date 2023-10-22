const express = require("express");

const {
  register,
  activateAccount,
  login,
  auth,
  sendVerification,
  sendResetPasswordCode,
  validateResetCode,
  findUser,
  changePassword,
} = require("../controllers/user");

const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/activate", authUser, activateAccount);
router.post("/login", login);
router.post("/sendVerification", authUser, sendVerification);
router.post("/findUser", findUser);

router.post("/auth", authUser, auth);

router.post("/sendResetPasswordCode", sendResetPasswordCode);
router.post("/changePassword", changePassword);
router.post("/validateResetCode", validateResetCode);
module.exports = router;
