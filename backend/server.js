const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
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

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});