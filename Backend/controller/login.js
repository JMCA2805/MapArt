const connection = require("../config/conexion");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

class login {

    entrar(req) {

        //Extrayendo valores
        const { user, password } = req;

        return new Promise((resolve, reject) => {
            

            //Query
            let query = connection.query('SELECT password FROM  `users` WHERE `user` = ?', [user], function (error, results, fields) {
               
                if (error) throw error


                if (results != "") {
                    //Extrayendo el resultado de la Query
                    let hash = results[0].password;

                    //comparando passsword
                    bcrypt.compare(password, hash, function (err, result) {

                        if (result) {
                            //Creando token
                            jwt.sign({ roles: ["User"], usuario: user }, process.env.secreto, {}, function (err, token) {

                                console.log('Usuario y contraseña correctos');
                                resolve(token);
                            })

                        } else {
                            resolve('1')
                        }
                    });

                } else {
                    resolve('2')
                }

            });
        });
    }
}
module.exports = new login();