const express = require("express");
const { readdirSync } = require("fs");
const app = express();

const cors = require("cors");
const useRoutes = require("./routes/user");

//beginnig of all routes here

readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));
//end of all routes

//definding our port here
app.listen(8000, () => {
  console.log("Port server stated on port 8000");
});
