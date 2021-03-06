/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const usuarioController = require('../controllers/UsuarioController');
const auth = require('../middlewares/auth');

const router = routerx();

router.post('/login', usuarioController.login);
router.post('/add', usuarioController.add);
router.get('/list', usuarioController.list)
router.put('/update', usuarioController.update)
router.put('/activate', usuarioController.activate)
router.put('/deactivate', usuarioController.deactivate)

module.exports = router;