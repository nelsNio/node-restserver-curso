const express = require('express');
const Categoria = require('../models/categoria');
const _ = require('underscore');

const app = express();

/**
 * GET ALL
 */
app.get('/categoria', (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let hasta = req.query.limite || 5;
    hasta = Number(hasta);

    Categoria.find({}, 'descripcion usuario')
        .skip(desde)
        .limit(hasta)
        .exec((err, Categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: err
                });
            }
            Categoria.countDocuments({}, (err, cantidad) => {

                res.json({
                    ok: true,
                    Categorias,
                    cantidad
                });
            });


        });

})

/**
 * GET BY ID
 */
app.get('/categoria/:id', (req, res) => {
    let id = req.params.id;


    Categoria.find({ _id: id }, 'descripcion usuario')
        .exec((err, Categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: err
                });
            }
            Categoria.countDocuments({ _id: id }, (err, cantidad) => {

                res.json({
                    ok: true,
                    Categorias,
                    cantidad
                });
            });


        });

})

/**
 * POST METHOD
 */
app.post('/categoria', (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: body.usuario

    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        } else {
            res.json({
                ok: true,
                Categoria: categoriaDB
            });
        }
    });
})

app.patch('/categoria', (req, res) => {
    res.json('patch Categoria')
})


module.exports = app;