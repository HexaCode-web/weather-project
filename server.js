// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;
const listen = () => {
  console.log("server is running on port:" + port);
};
app.listen(port, listen());

//recviving  Data from client side
app.post("/SaveData", (req, res) => {
  projectData = req.body;
  console.log(projectData);
  res.json({ status: "Data received!" });
});
//sending data to client
app.get("/all", (req, res) => {
  console.log("Sent Data for client");
  res.json(projectData);
});
