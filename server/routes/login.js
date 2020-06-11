const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const app = express();

app.post('/login', (req, res) => {

    let body = req.body;
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: err
            });
        }
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                mensaje: 'Usuario no encontrado'
            });

        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(404).json({
                ok: false,
                mensaje: '(Usuario) o contraseña incorectos'
            });
        }
        let token = jwt.sign({
            usuario: usuarioDB,
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });

    });

});

module.exports = app;