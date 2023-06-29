var jwt = require('jsonwebtoken');

class user {

    obtener(token) {
        return new Promise((resolve, reject) => {
            let payload = jwt.decode(token.replace('Bearer ', ''));
            resolve(payload.usuario);
        })
    }
}
module.exports = new user();