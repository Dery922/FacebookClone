const fs = require("fs");

module.exports = async function (req, res, next) {
  try {
    if (!req.files ?? Object.values(req.files).flat().length === 0) {
      return res.status(400).json({ message: "No files selected" });
    }

    let files = Object.values(req.files).flat();
    console.log(files);

    //looping on files to check if they are of supported format
    files.forEach((file) => {
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/git" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/png"
      ) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ message: "Unsupported format" });
      }
    });

    next();

    //the below code cover an object to an array
    // console.log(Object.values(req.files).flat());
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  if (file.size > 1024 * 1024 * 1) {
    removeTmp(file.tempFilePath);
    return res.status(400).json({ message: "file size is too large" });
  }
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
