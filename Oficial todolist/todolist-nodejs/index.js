const mongoose = require('mongoose');
const app = require('./app');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoList', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        const PORT = process.env.PORT || 3000;
        console.log('Se encuentra conectado a la base de datos.');

        app.listen(PORT, function () {
            console.log('Hola, la base de datos esta corriendo correctamente');
        });
    })
    .catch((error) => console.log(error));
