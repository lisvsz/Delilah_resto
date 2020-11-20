//Endpoints de productos
const router = require('express').Router();
//const { request } = require("express");
const { producto } = require('../../conexion');
const { checkToken } = require('../auth');

//Solicitar la información de todos los productos
router.get('/', async (req, res) => {
    try{
    const productos = await producto.findAll();
    res.json(productos);
    } catch (error) {
        res.status(400).send('No se pueden mostrar los productos, intente más tarde')
    }
})

//Agregar un nuevo producto
router.post('/', checkToken, async (req, res) => {
    try{
    const productoR = await producto.create(req.body);
    res.json(productoR);
    } catch (error) {
        res.status(400).send('No se pudo agregar el producto')
    }
})

//Modificar producto
router.put('/:productoId', checkToken, async (req, res) => {
    try{
    await producto.update(req.body, {
        where: { id: req.params.productoId }
    });
    res.json({ success: 'Se ha modificado el producto'})
    } catch (error) {
        res.status(400).send('No se pudo modificar el producto')
    }
})

//Borrar un producto
router.delete('/:productoId', checkToken, async (req, res) => {  /*INCLUIR VALIDACION DE ADMON*/
    try{
    await producto.destroy({
        where: { id: req.params.productoId}
    });
    res.json({ success: 'Se ha borrado el producto'});
    } catch (error) {
        console.log(error);
        res.status(400).send('No se pudo eliminar el producto')
    }
})

module.exports = router; //ROUTER nos da la dirección del endpoint