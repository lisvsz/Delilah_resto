const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { usuario } = require('../../conexion');
const { check, validationResult } = require('express-validator'); // comprueba los datos
const moment = require('moment');
const jwt = require('jwt-simple');

const { checkToken } = require('../auth');

//Solicitar la información de todos los usuarios
router.get('/', checkToken, async (req, res) => {
    try{
    const usuarios = await usuario.findAll();
    usuarios.forEach( usuario => usuario.contrasena = ":D"); // ocultar contraseña
    //usuarios.forEach(usuario => delete usuario.contrasena); // investigar más al respecto
    res.json(usuarios);
    } catch (error) {
        res.status(400).send('No se pueden mostrar los usuarios, intente más tarde')
    }
})

//Agregar un nuevo usuario
router.post('/registro', [
    check ('usuario', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check ('nombre_completo', 'El nombre es obligatorio').not().isEmpty(),
    check ('correo_electronico', 'El correo electrónico debe ser válido').isEmail(),
    check ('telefono', 'El telefono debe ser válido').not().isEmpty(),
    check ('direccion_envio', 'La dirección de envío es obligatoria').not().isEmpty(),
    check ('contrasena', 'La contraseña es obligatoria').not().isEmpty(),
], async (req, res) => {
    try{
    //Validar campos del registro
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array() })
    }
    
    req.body.contrasena = bcrypt.hashSync(req.body.contrasena, 10); // las veces que se va encriptar la contraseña
    const usuarioNuevo = await usuario.create(req.body);
    res.json(usuarioNuevo);
    } catch (error) {
        console.log(error);
        res.status(400).send('No se pudo registrar el usuario')
    }
});

//Modificar un usuario
router.put('/:usuarioId', async (req, res) => {
    try{
    await usuario.update(req.body, {
        where: { id: req.params.usuarioId }
    });
    res.json({ success: 'Se ha modificado el usuario'})
    } catch (error) {
        res.status(400).send('No se pudo modificar el usuario')
    }
})

//Borrar un usuario
router.delete('/:usuarioId', async (req, res) => {
    try{
    await usuario.destroy({
        where: { id: req.params.usuarioId}
    });
    res.json({ success: 'Se ha borrado el usuario'});
    } catch (error) {
        console.log(error);
        res.status(400).send('No se pudo eliminar el usuario')
    }
})

//Login de usuario
router.post('/login', async (req, res) => {
    try{
    const usuarios = await usuario.findOne ({ where: { correo_electronico: req.body.correo_electronico} });
    if (usuarios) {
        const validacion = bcrypt.compareSync(req.body.contrasena, usuarios.contrasena);
        if(validacion) {
            res.json({ success: createToken(usuarios)});
        } else {
            res.json({ error: 'Error en usuario y/o contraseña' });
        }
    } else {
        res.json({ error: 'Error en usuario y/o contraseña'});
        } 
    } catch (error) {
        console.log(error);
        res.status(400).send('No se puede ingresar, favor de intentarlo más tarde')
    }
});

//Crear TOKEN

const createToken = (usuario) => {
    const payload = {
        usuarioID: usuario.id,
        administrador: usuario.administrador,
        createdAt: moment().unix(),
        expiredAt: moment().add(1, 'minutes').unix()
    }

    return jwt.encode(payload, 'frase secreta');
}


module.exports = router;