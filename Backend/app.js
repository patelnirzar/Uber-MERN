const express = require('express');
const app = express();
const cors = require('cors')

const dotenv = require('dotenv');
dotenv.config()

app.use(cors)


app.get('/', (req, res) => {
    res.send(`Hello World`);
});

module.exports = app;

