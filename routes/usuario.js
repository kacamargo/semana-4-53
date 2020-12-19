/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const usuarioController = require('../controllers/UsuarioController');
const auth = require('../middlewares/auth');

const router = routerx();

router.post('/login', usuarioController.login);
// Tener en cuenta si exiten mas funcionalidades para esta ruta como registrarse o listar usuario o algo asi

module.exports = router;