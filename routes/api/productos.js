//Endpoints de productos
const router = require('express').Router();
//const { request } = require("express");
const { producto } = require('../../conexion');

//Solicitar la información de todos los productos

//Prueba
/*app.get('/', (req, res) => {
    res.send('Hola Mundo');
})*/
router.get('/', async (req, res) => {
    res.send('Respuesta a petición GET');
    const productos = await producto.findAll();
    res.json(productos);
})

//Agregar un nuevo producto
router.post('/', async (req, res) => {
    const producto = await producto.create(req.body);
    res.json(producto);
})

//Modificar un nuevo producto
router.put('/:productoId', async (req, res) => {
    await producto.update(req.body, {
        where: { id: req.params.productoId }
    });
    res.json({ success: 'Se ha modificado el producto'})
})

//Borrar un producto
router.delete('/:productId', async (request, response) => {
    await producto.destroy({
        where: { id: request.params.productoId}
    });
    response.json({ success: 'Se ha borrado el producto'});
})

module.exports = router; //ROUTER nos da la dirección del endpoint