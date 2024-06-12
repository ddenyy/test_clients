const router = require('express').Router();
const routesUser = require('./userRoutes');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login } = require('../controllers/controllersUser');
const auth = require('../middlewares/auth');
const {
  signUpValidation,
  signInValidation,
} = require('../middlewares/validation');

router.post('/signup', createUser);
router.post('/signin', login);

// router.use(auth);


router.use(routesUser);

router.use('*', (req, res, next) => {
  next(new NotFoundError('any error'))
});

module.exports = router;