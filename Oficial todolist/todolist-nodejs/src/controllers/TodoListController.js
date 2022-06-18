const Todolist = require('../models/TodoListModel')

function RegistrarTarea(req, res) {
    var datos = req.body;
    var modeloEntidades = new Todolist();
    if (datos.nombre, datos.texto) {
        modeloEntidades.nombre = datos.nombre;
        modeloEntidades.texto = datos.texto;
        modeloEntidades.idUsuario = req.params.ID;
        Todolist.find({ nombre: datos.nombre, texto: datos.texto, idUsuario: req.params.ID }, (error, tareaEncontrada) => {
            if (tareaEncontrada.length == 0) {
                modeloEntidades.save((error, tareaAgregada) => {
                    if (error)
                        return res.status(500).send({ Error: "Error en la petición" });
                    if (!tareaAgregada)
                        return res.status(404).send({ Error: "No se pudo agregar la tarea" });
                    return res.status(200).send({ Tarea_nueva: tareaAgregada });
                });
            } else {
                return res.status(500).send({ Error: "Esta tarea ya existe" });
            }
        })
    } else {
        return res.status(500).send({ Error: "Debes llenar los campos solicitados" });
    }
}

function ListarTarea(req, res) {
    Todolist.find({ idUsuario: req.params.ID }, (error, listadoEntidades) => {
        if (error) return res.status(500).send({ Error: "Error en la petición" });
        return res.status(200).send({ Entidades_registradas: listadoEntidades });
    });
}

function tareaPorId(req, res) {
    Todolist.findById({ _id: req.params.ID }, (error, tareaEncontrada) => {
        if (error)
            return res.status(404).send({ Error: "Error al obtener la tarea" });
        if (!tareaEncontrada)
            return res.status(500).send({ Error: "No existe esta tarea" });
        return res.status(200).send({ Tarea_Encontrada: tareaEncontrada });
    });
}

function editarTarea(req, res) {
    var datos = req.body;
    if (datos.nombre == "" || datos.texto == "") {
        return res.status(404).send({ Error: "No dejes campos vacíos" });
    } else {
        Todolist.findByIdAndUpdate({ _id: req.params.ID }, datos, { new: true }, (error, tareaActualizada) => {
            if (error)
                return res.status(404).send({ Error: "Error al obtener la tarea" });
            return res.status(200).send({ Tarea_editada: tareaActualizada })
        }
        )
    }

}

function borrarTarea(req, res) {
    Todolist.findByIdAndDelete({ _id: req.params.ID }, (error, tareaBorrada) => {
        if (error) return res.status(404).send({ Mensaje: "Error." })
        return res.status(200).send({ Entidad_borrada: tareaBorrada });
    })
}

module.exports = {
    RegistrarTarea,
    ListarTarea,
    tareaPorId,
    editarTarea,
    borrarTarea,

}