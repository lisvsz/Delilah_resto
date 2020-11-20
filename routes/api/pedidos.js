const router = require('express').Router(); 
const { pedido } = require('../../conexion');
const { checkToken } = require('../auth');

//Solicitar la información de todos los pedidos
router.get('/', /*no funciona checkToken,*/ async (req, res) => {
    try{
    const pedidos = await pedido.findAll();
    res.json(pedidos);
    } catch (error) {
    res.status(400).send('No se pueden mostrar los pedidos, intente más tarde')
    }
})

//Agregar un nuevo pedido ////////////VERIFICAR la tabla que se usa
router.post('/', async (req, es) => {
    const pedidoN = await pedido.create(req.body);
    res.json(pedidoN);
})

//Modificar pedido
router.put('/:pedidoId', checkToken, async (req, res) => {
    try{
    await pedido.update(req.body, {
        where: { id: req.params.pedidoId }
    });
    res.json({ success: 'Se ha modificado el pedido'})
    } catch (error) {
        res.status(400).send('No se pudo modificar el pedido')
    }
})

//Borrar un producto
router.delete('/:pedidoId', checkToken, async (req, res) => {
    try{
    await pedido.destroy({
        where: { id: req.params.pedidoId}
    });
    res.json({ success: 'Se ha borrado el pedido'});
    } catch (error) {
        console.log(error);
        res.status(400).send('No se pudo eliminar el pedido')
    }
})

module.exports = router;