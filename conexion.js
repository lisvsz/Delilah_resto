const Sequelize = require('sequelize');
const productoDB = require('./models/producto');

//Proporciono la información de la BD
const sequelize = new Sequelize('delilah_resto', 'root', 'root', {
    host: "localhost",
    dialect: "mariadb"
});

const producto = productoDB(sequelize, Sequelize);

sequelize.sync({ force: false}).then(() => {  
    console.info('Tablas sincronizadas');
}).catch(console.error);

module.exports = {
    producto
}