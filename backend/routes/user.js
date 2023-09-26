const express = require("express");

const { register, activateAccount } = require("../controllers/user");

const router = express.Router();

router.post("/register", register);

router.post("/activate", activateAccount);

router.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = router;
