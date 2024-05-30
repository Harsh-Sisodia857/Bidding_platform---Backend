const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
require("dotenv").config({})

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();

// Routes
app.use('/api', require("./routes/index"));

app.listen(port,() =>{
    console.log(`Server is listening on port ${port}`)
})
module.exports = app;