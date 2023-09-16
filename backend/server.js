const express = require("express");
const { readdirSync } = require("fs");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

const cors = require("cors");
const useRoutes = require("./routes/user");
const { default: mongoose } = require("mongoose");
const PORT = process.env.PORT || 8000;

//beginnig of all routes here

readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));
//end of all routes

//database connection
mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => console.log("database connected successfully"))
  .catch((error) => {
    console.log(`error connecting ${error}`);
  });

//definding our port here
app.listen(PORT, () => {
  console.log("Port server stated on port 8000");
});
