const router = require('express').Router();
const { getCurrentUser, updateUserData, getCyclesFrindsUser, addFriendToUser, getAllUsers, deleteUser, deleteFriendToUser } = require('../controllers/controllersUser');
const { updateUserValidation } = require('../middlewares/validation');


router.get('/users', getAllUsers);

router.delete('/users/:id', deleteUser)

router.get('/users/:id', getCurrentUser);

router.post('/users/add/:user_id/:friend_id', addFriendToUser);

router.delete('/users/add/:user_id/:friend_id', deleteFriendToUser);

router.patch('/users/:id', updateUserData);

router.get('/users/me/cycles', getCyclesFrindsUser);

module.exports = router;