const express = require("express")
const controller = require("../controllers/TodoListController")
var api = express.Router()

api.post("/tarea/:ID", controller.RegistrarTarea)
api.get("/listarTarea/:ID", controller.ListarTarea)
api.get("/tareaPorId/:ID", controller.tareaPorId)
api.put("/editarTarea/:ID", controller.editarTarea)
api.delete("/borrarTarea/:ID", controller.borrarTarea)

module.exports = api;