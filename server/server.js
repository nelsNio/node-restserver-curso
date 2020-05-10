/**
 * Importaciones
 */
require('./config/config');
const express = require('express');
// Using Node.js `require()`
const mongoose = require('mongoose');

var bodyParser = require('body-parser');
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/usuario'));
app.use(require('./routes/categoria'));
app.use(require('./routes/producto'));


mongoose.connect(process.env.URL_DB, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos online');
});
app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto', process.env.PORT);
});