const connection = require("../config/conexion");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class register {

    registrar(req) {

        const { nombre, apellido, correo, user, password } = req;
        let saltRounds = parseInt(process.env.saltRounds);

        return new Promise((resolve, reject) => {

            //encryptando

            bcrypt.hash(password, saltRounds, function (err, hash) {

                let query = connection.query('INSERT INTO `users`(`nombre`, `apellido`, `correo`, `user`, `password`) VALUES ("' + nombre + '","' + apellido + '","' + correo + '","' + user + '","' + hash + '")', function (error, results, fields) {
                    if (error) throw error
                    jwt.sign({ roles: ["User"], usuario: user }, process.env.secreto, {}, function (err, token) {
                        resolve(token);
                    })
                });
            });


        });


    }
}

module.exports = new register();