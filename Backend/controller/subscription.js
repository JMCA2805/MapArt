const connection = require("../config/conexion");

class suscripcion {

    susc(req) {
        return new Promise((resolve, reject) => {
            var query = connection.query('INSERT INTO suscripcion SET ?', req, function (error, results, fields) {
                if (error) throw error
                resolve("Suscripción Agregada");
            });
        });
    }
}
module.exports = new suscripcion();