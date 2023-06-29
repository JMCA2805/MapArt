var jwt = require('jsonwebtoken');


function validarToken(req, res, next ) {

    console.log('Validando Token...');

    if(!req.headers.authorization){
        //No hay token
        res.sendStatus(400);
        return
    }

    //Extrayendo el token
    var token = req.headers.authorization.replace('Bearer ', '');

    try {

        //verificando token
        jwt.verify(token, process.env.secreto);
        next();

    } catch (error) {
        //No tienes acceso
        res.sendStatus(400);
    }
}
module.exports = validarToken;