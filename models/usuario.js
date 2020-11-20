//Genero la tabla de usuarios

module.exports = (sequelize, type) => {
    return sequelize.define('usuario', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        usuario: type.STRING(50),
        nombre_completo: type.STRING(200),
        correo_electronico: type.STRING(100),
        telefono: type.STRING(10),
        direccion_envio: type.STRING(200),
        contrasena: type.STRING(150), // el tamaño es porque irá encriptada
        administrador: type.BOOLEAN,
    })
}