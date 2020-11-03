const router = require('express').Router();
//const middlewares = require('./middlewares');
const apiProductosRouter = require('./api/productos');

router.use('/productos', apiProductosRouter);

module.exports = router;