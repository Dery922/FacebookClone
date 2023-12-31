const express = require("express");

const { uploadImages } = require("../controllers/upload");

const { authUser } = require("../middlewares/auth");
const imageUpload = require("../middlewares/imageUpload");

const router = express.Router();

router.post("/uploadImages", authUser, uploadImages);

module.exports = router;
