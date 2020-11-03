//Genero la tabla de usuarios

module.exports = (sequelize, type) => {
    return sequelize.define('usuario', {
        id: {
            type: type.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
        },
        usuario: type.STRING(50),
        nombre_completo: type.STRING(200),
        correo_electronico: type.STRING(100),
        telefono: type.INTEGER(20),
        direccion_envio: type.STRING(200),
        contraseña: type.STRING(20),
    })
}