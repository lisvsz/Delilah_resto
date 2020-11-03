const express = require('express'); 
const bodyParser = require('body-parser'); //Gestión post
const app = express();
const PORT_SERVER = 3000;
const apiRouter = require('./routes/api');

require('./conexion'); ////

app.use(bodyParser.json()); //middleware
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/api', apiRouter);

app.listen(PORT_SERVER, () => {
    console.log('El servidor está corriendo en el puerto 3000 :)')
})