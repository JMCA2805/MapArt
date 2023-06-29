var express = require('express');
var path = require('path');
var router = express.Router();
var login = require("../controller/login");
var register = require("../controller/register");
var suscripcion = require("../controller/subscription");
var validarToken = require('../authorization/validation');
var validarRol = require('../authorization/validation_rol');
var user = require("../controller/user");



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

router.post('/MapArt/Soon', validarToken, validarRol("User"), function (req, res, next) {
});

router.get('/MapArt/Subscription', function (req, res, next) {
  res.sendFile(path.join(absolutePath, 'subscription.html'));
});

router.get('/MapArt/Arte_Urbano', function (req, res, next) {
  res.sendFile(path.join(absolutePath, 'arte_urbano.html'));
});

router.get('/MapArt/Escultura', function (req, res, next) {
  res.sendFile(path.join(absolutePath, 'escultura.html'));
});

router.get('/MapArt/Monumentos', function (req, res, next) {
  res.sendFile(path.join(absolutePath, 'monumentos.html'));
});

router.post('/MapArt/Home', validarToken, validarRol("User"), function (req, res, next) {
});

router.get('/MapArt/Home', function (req, res, next) {
  res.sendFile(path.join(absolutePath, 'planes.html'));
});

//API
router.post('/MapArt/Login', function (req, res, next) {

  login.entrar(req.body)

    .then((respuesta) => {

      if (respuesta == '1') {
        res.json({ "message": "Usuario o Contraseña incorrecto" });
      } else if (respuesta == '2') {

        res.json({ "message": "No posee una cuenta" });
      } else {

        console.log(respuesta);
        res.json({ "message": "Inicio de Sección exitoso", "token": respuesta });
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

router.post('/MapArt/User', function (req, res, next) {
  user.obtener(req.headers.authorization)
    .then((respuesta) => {
      if (respuesta == ""){
        res.sendStatus(400);
      }else{
        res.json({ "Usuario": respuesta });
      }
    })
});


module.exports = router;
