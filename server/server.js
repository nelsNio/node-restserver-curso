/**
 * Importaciones
 */
require('./config/config');
const express = require('express');
var bodyParser = require('body-parser');
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())


app.get('/usuario', (req, res) => {
    res.json('get Usuario')
})

/**
 * POST METHOD
 */
app.post('/usuario', (req, res) => {
    let body = req.body;
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    } else {
        res.json({
            persona: body
        });

    }
})

/**
 * PUT METHOD
 * REQUIRE ID DATA
 */
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json({
        id
    })
})

/**
 * DELETE METHOD
 */
app.delete('/usuario', (req, res) => {
    res.json('delete Usuario')
})

/**
 * PATCH METHOD
 */
app.patch('/usuario', (req, res) => {
    res.json('patch Usuario')
})


app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto', process.env.PORT);
});