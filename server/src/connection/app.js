const express = require('express');
// const fileupload = require('express-fileupload');
const cors = require('cors');
const routes = require('../routes/entriesRoutes');

const app = express();

app.use(cors());
app.use(express.json());
// app.use(fileupload({ useTempFiles: true }));

app.use('/', routes);

module.exports = app;
