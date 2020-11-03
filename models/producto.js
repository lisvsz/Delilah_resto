//Genero la tabla de productos

module.exports = (sequelize, type) => {
    return sequelize.define('producto', {
        id: {
            type: type.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        nombre_producto: type.STRING(100),
        precio_producto: type.INTEGER(10),
    })
}