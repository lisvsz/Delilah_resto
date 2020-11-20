const router = require('express').Router();
const authorization = require('./auth');
const apiProductosRouter = require('./api/productos');
const apiUsuariosRouter = require('./api/usuarios');
const apiPedidosRouter = require('./api/pedidos');

router.use('/productos', apiProductosRouter);
router.use('/usuarios', /*authorization.checkToken,*/ apiUsuariosRouter);
router.use('/pedidos', apiPedidosRouter);

module.exports = router;