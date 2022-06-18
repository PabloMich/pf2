const express = require('express');
const cors = require('cors');
var app = express();

const rutaTodoList = require('./src/routes/TodoListRoutes');
const rutaUsuario = require('./src/routes/UsuarioRoutes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use('/api', rutaTodoList, rutaUsuario);


module.exports = app;