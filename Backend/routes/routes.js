var express = require('express');
var path = require('path');
var router = express.Router();
var login = require("../controller/login");
var register = require("../controller/register");
var suscripcion = require("../controller/subscription");

//Ruta absoluta
const absolutePath = path.join(__dirname, '..', '..', 'Frontend', 'views');

//Rutas
router.get('/MapArt', function (req, res, next) {
  res.sendFile(path.join(absolutePath, 'index.html'));
});

router.get('/MapArt/Login', function (req, res, next) {
  res.sendFile(path.join(absolutePath, 'login.html'));
});

router.get('/MapArt/Register', function (req, res, next) {
  res.sendFile(path.join(absolutePath, 'register.html'));
});

router.get('/MapArt/Soon', function (req, res, next) {
  res.sendFile(path.join(absolutePath, 'soon.html'));
});

router.get('/MapArt/Subscription', function (req, res, next) {
  res.sendFile(path.join(absolutePath, 'subscription.html'));
});

//API
router.post('/MapArt/Login', function (req, res, next) {

  login.entrar(req.body)

    .then((respuesta) => {

      if (respuesta == '1') {
        res.json({"message": "Usuario o Contraseña incorrecto" });
      } else if (respuesta == '2') {

        res.json({"message": "No posee una cuenta"});
      } else {

        console.log(respuesta);
        res.json({"message": "Inicio de Sección exitoso", "token": respuesta});
      }

    })

});


router.post('/MapArt/Registro', function (req, res, next) {
  register.registrar(req.body)
    .then((respuesta) => {
      res.json({ "Message": "Usuario Registrado", "Token": respuesta });
    })
});

router.post('/MapArt/Subscription', function (req, res, next) {
  suscripcion.susc(req.body)
    .then((respuesta) => {
      if (respuesta == 'Suscripción Agregada') {
        res.json({ "Message": "Suscripción Agregada" });
      }

    })

});


module.exports = router;
