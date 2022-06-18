const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
    usuario: String,
    email: String,
    password: String,
});

module.exports = mongoose.model("Usuario", UsuarioSchema);