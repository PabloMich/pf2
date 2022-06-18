const express = require('express');
const controlador = require('../controllers/UsuarioController');
var api = express.Router();

api.post('/registro', controlador.crearCuenta)
api.post('/login', controlador.Login)
api.get('/listarUsuario/:ID', controlador.ListarUsuario)

module.exports = api;