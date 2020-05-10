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

    Categoria.find({})
        .populate('usuario', 'nombre')
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


    Categoria.find({ _id: id })
        .populate('usuario', 'nombre email')
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


/**
 * PUT METHOD
 * REQUIRE ID DATA
 */
app.put('/categoria/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion']);
    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    });

})

/**
 * DELETE METHOD
 */
app.delete('/categoria/:id', function(req, res) {
    let id = req.params.id;
    Categoria.findByIdAndRemove(id, (err, deleted) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }
        if (deleted === null) {
            return res.status(404).json({
                ok: false,
                mensaje: 'Categoria no encontrada'
            });
        }
        res.json({
            ok: true,
            categoria: deleted
        })

    });

})

app.patch('/categoria', (req, res) => {
    res.json('patch Categoria')
})


module.exports = app;