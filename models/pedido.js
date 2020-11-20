//Genero tabla para pedidos

module.exports = (sequelize, type) => {
    return sequelize.define('pedidos', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        estado_pedido: type.STRING(50),
        hora_pedido: type.TIME,
        descripcion_pedido: type.STRING(100),
        monto_pedido: type.INTEGER,
        metodo_pago: type.STRING(40),
        usuario: type.STRING(50),
        direccion_envio: type.STRING(200),
    })
}