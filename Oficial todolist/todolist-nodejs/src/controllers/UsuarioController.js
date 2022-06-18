const Usuario = require('../models/UsuarioModel');
const encriptar = require("bcrypt-nodejs");
const jwt = require("../services/jwt");

function Login(req, res) {
    var datos = req.body;

    if (datos.email == null || datos.password == null) {
        return res.status(500).send({ Error: "Debes ingresar todos los datos" });
    } else {
        Usuario.findOne(
            { email: datos.email },
            (error, usuarioEncontrado) => {
                if (error)
                    return res.status(500).send({ Error: "Error en la peticion" });
                if (usuarioEncontrado) {
                    encriptar.compare(
                        datos.password,
                        usuarioEncontrado.password,
                        (error, claveVerificada) => {
                            if (claveVerificada) {
                                if (datos.obtenerToken == "true") {
                                    return res
                                        .status(200)
                                        .send({ Token: jwt.crearToken(usuarioEncontrado) });
                                } else {
                                    usuarioEncontrado.password = undefined;
                                    return res
                                        .status(200)
                                        .send({ Inicio_exitoso: usuarioEncontrado });
                                }
                            } else {
                                return res.status(500).send({ Error: "Password no coincide" });
                            }
                        }
                    );
                } else {
                    return res
                        .status(500)
                        .send({ Error: "El usuario no existe" });
                }
            }
        );
    }
}

function crearCuenta(req, res) {

    var datos = req.body;
    var modeloEntidades = new Usuario();
    if (datos.usuario && datos.email && datos.password) {
        modeloEntidades.usuario = datos.usuario;
        modeloEntidades.email = datos.email;
        modeloEntidades.rol = "Usuario";

        Usuario.find({ usuario: datos.usuario }, (error, empresaEncontrada) => {
            if (empresaEncontrada.length == 0) {
                encriptar.hash(datos.password, null, null, (error, claveEncriptada) => {
                    modeloEntidades.password = claveEncriptada;
                    modeloEntidades.save((error, empresaAgregada) => {
                        if (error)
                            return res.status(500).send({ Error: "Error en la peticion" });
                        if (!empresaAgregada)
                            return res.status(404).send({
                                Error: "No se pudo crear el usuario",
                            });
                        return res.status(200).send({ Empresa_nueva: empresaAgregada });
                    });
                });
            } else {
                return res.status(500).send({ Error: "Este usuario ya existe" });
            }
        });
    } else {
        return res
            .status(500)
            .send({ Error: "Debes llenar los campos solicitados" });
    }
}

function ListarUsuario(req, res) {
    Usuario.findById({ _id: req.params.ID }, (error, tareaEncontrada) => {
        if (error)
            return res.status(404).send({ Error: "Error al obtener la tarea" });
        if (!tareaEncontrada)
            return res.status(500).send({ Error: "No existe esta tarea" });
        return res.status(200).send({ Tarea_Encontrada: tareaEncontrada });
    });
}

module.exports = {
    Login,
    crearCuenta,
    ListarUsuario
}