const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodolistSchema = Schema({
    nombre: String,
    texto: String,
    idUsuario: { type: Schema.Types.ObjectId, ref: "UsuarioModel" }
});

module.exports = mongoose.model("Todolist", TodolistSchema);