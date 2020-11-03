//Genero la tabla de usuarios

module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
        },
        usuario: type.STRING(50),
        nombre_completo: type
        correo_electronico: 
        telefono:
        direccion_envio:
        contraseña: 
    })
}