const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { parse } = require('url');
const { IncomingMessage, ServerResponse } = require('http');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors(
  {
      origin: [""],
      methods: ["POST", "GET"],
      credentials: true
  }
));
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

app.get("/", (req, res) => {
  res.json("Hello")
})

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const exercisesRouter = require('./routes/exercises');

app.use('/users', usersRouter);
app.use('/exercises', exercisesRouter);

module.exports = (req, res) => {
  const url = parse(req.url).pathname;
  app(req, res);
}