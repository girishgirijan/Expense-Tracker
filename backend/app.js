const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
//const {readdirSync} = require('fs');
const app = express();

const transactionRoute = require("./routes/transactions");

require("dotenv").config();
const PORT = process.env.PORT;

//Middleware
app.use(express.json());
app.use(cors());

/* app.get("/", (req, res) => {
    res.send("Call from back end!")
}) */
//readdirSync("./routes").map((route) => app.use("/api/v1/", require("./routes/" + route)))

app.use("/api/v1", transactionRoute);


const server = () => {
    db();
  app.listen(PORT, () => {
    console.log("You are listening to port: ", PORT);
  });
};

server();
