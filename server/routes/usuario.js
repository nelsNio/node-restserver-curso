const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express();



app.get('/usuario', (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let hasta = req.query.limite || 5;
    hasta = Number(hasta);

    Usuario.find({ estado: true }, 'nombre email google')
        .skip(desde)
        .limit(hasta)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: err
                });
            }
            Usuario.countDocuments({ estado: true }, (err, cantidad) => {

                res.json({
                    ok: true,
                    usuarios,
                    cantidad
                });
            });


        });

})

/**
 * POST METHOD
 */
app.post('/usuario', (req, res) => {


    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        password: bcrypt.hashSync(body.password, 10),
        email: body.email,
        role: body.role

    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        } else {
            res.json({
                ok: true,
                usuario: usuarioDB
            });
        }
    });
})

/**
 * PUT METHOD
 * REQUIRE ID DATA
 */
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });

})

/**
 * DELETE METHOD
 */
app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    // Usuario.findByIdAndRemove(id, (err, deleted) => {
    Usuario.findByIdAndUpdate(id, { estado: false }, (err, deleted) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }
        if (deleted === null) {
            return res.status(404).json({
                ok: false,
                mensaje: 'Usuario no encontrado'
            });
        }
        res.json({
            ok: true,
            usuario: deleted
        })

    });

})

/**
 * PATCH METHOD
 */
app.patch('/usuario', (req, res) => {
    res.json('patch Usuario')
})

module.exports = app;