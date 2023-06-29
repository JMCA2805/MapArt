var jwt = require('jsonwebtoken');

const validarRol = (roles) => (req, res, next) => {

    console.log('Validando Rol...');

    try {
        //Extrayendo el token
        let payload = jwt.decode(req.headers.authorization.replace('Bearer ', ''));

        //Comparando roles
        if (roles == payload.roles) {
            res.sendStatus(200)
            next();
        } else {
            res.sendStatus(400);
        }

    } catch (error) {
        //No tienes acceso
        res.sendStatus(400);
    }
}

module.exports = validarRol;