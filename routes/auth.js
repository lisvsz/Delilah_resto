const jwt = require('jwt-simple');
const moment = require('moment');
const usuario = require('../models/usuario');

const checkToken = (req, res, next) => {

    if(!req.headers['user-token']) {
        return res.json({ error: 'Necesitas incluir el user-token en la cabecera'})
    }

    const userToken = req.headers['user-token'];

    let payload = {}; // desencriptar

    try{
    payload = jwt.decode(userToken, 'frase secreta'); // frase secreta se puede meter en variable de entorno
    } catch (err) {
        return res.json({ error: 'El token es incorrecto' });
    }

    if(payload.expireAt < moment().unix()) {
        return res.json({ error: 'El token ha expirado'});
    }
    req.usuarioID = payload.usuarioID; // dispensable
    console.log(payload);
    //Verificar si es administrador
    
    /*const administrador = usuario.find({ where: { id: payload.id}});*/
    if(payload.administrador === true){
        next();
    } else{
        res.status(403).json('No tienes acceso de administrador');
    }

    /*const { administrador } = usuario;
    if (administrador) {
        req.administrador = administrador;
    } else {
        res.status(403).json('No tienes acceso de administrador');
    } */

}

module.exports = {
    checkToken: checkToken
}
