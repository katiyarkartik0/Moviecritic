const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { movieRoutes } = require("./routes/movie");
const { reviewRoutes } = require("./routes/review");

const routes = express.Router();

dotenv.config();
const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome");
});

app.use("/api/movie", movieRoutes);
app.use("/api/review", reviewRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("App has started")
    app.listen(process.env.PORT)}
    );