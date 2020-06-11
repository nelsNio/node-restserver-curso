const jwt = require('jsonwebtoken');


/**
 * Verificar Token
 */
let verificaToken = (req, resp, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return resp.status(401).json({
                ok: false,
                err
            });
        }
        req.usuario = decoded.usuario;
        next();

    })

};
/**
 * Verificar AdminRole
 */
let verificaAdminRole = (req, resp, next) => {
    usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return resp.status(401).json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }


};

// hv-- validacion
// prueba -- 
// av-villas
//java== 5'600.000  term: indefinido,

module.exports = {
    verificaToken,
    verificaAdminRole
}