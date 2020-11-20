const Sequelize = require('sequelize');

//Sincronización de tablas
const productoDB = require('./models/producto');
const usuarioDB = require('./models/usuario');
const pedidoDB = require('./models/pedido');

//Proporciono la información de la BD
const sequelize = new Sequelize('delilah_resto', 'root', 'root', {
    host: "localhost",
    dialect: "mariadb"
});

const producto = productoDB(sequelize, Sequelize);
const usuario = usuarioDB(sequelize, Sequelize);
const pedido = pedidoDB(sequelize, Sequelize);

sequelize.sync({ force: false}).then(() => {  
    console.info('Tablas sincronizadas');
}).catch(console.error);

///funcion para crear mis catálogos (roles, método de pago, status de pedido)
///funcion para guardar un usuario /// swagger-header - token O_O NO (MENCIONAR que hay usuario precargado
//mencionar que deben crear la tabla en mariadb - read me

module.exports = {
    producto,
    usuario,
    pedido,
}