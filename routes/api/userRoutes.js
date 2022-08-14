const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
  } = require('../../controllers/userController');

//GET and POST route to /api/users
router.route('/').get(getAllUsers).post(createUser);

//GET, PUT and DELETE route to /api/users/:id
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

//POST and DELETE route to /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend)

module.exports = router; 