const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const http = require("http");
const authRouter = require("./Routes/auth");
const db = require("./models");
// creating a connection in MySQLWorkBench
const server = http.createServer(app);
db.sequelize
  .sync()
  .then(() => {
    server.listen(3001, () => {
      console.log("Server is running");
    });
  })
  .catch((error) => {
    console.log(error);
  });
app.use("/auth",authRouter);