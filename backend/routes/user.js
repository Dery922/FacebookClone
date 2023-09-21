const express = require("express");

const { register } = require("../controllers/user");

const router = express.Router();

router.post("/register", register);

router.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = router;
