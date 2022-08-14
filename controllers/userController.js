const {Thoughts, Users} = require('../models');

const usersController = {
    //New user
    createUser({body}, res) {
        Users.create(body)
        .then((dbUserData) => res.status(200).json({ "User created": dbUserData}))
        .catch(err => res.status(500).json(err));
    },
    //Get all users
    getAllUsers(req, res) {
        Users.find({})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then((dbUsersData) => res.status(200).json({ "All users": dbUsersData}))
        .catch(err => res.status(500).json(err));
    },

    // Get specific user
    getUserById({params}, res) {
        Users.findOne({_id: params.userId })
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then((dbUserData) => {
            !dbUserData
                ? res.status(404).json({"message": 'There is no user with that ID'})
                : res.status(200).json({ "Specific User": dbUserData})
        })
        .catch(err => res.status(500).json(err));
    },

    // Update specific user
    updateUser(req, res) {
        Users.findOneAndUpdate(
          { _id: req.params.userId },
          {$set: req.body},
          {
            runValidators: true,
            new: true
          }
        )
        .then((dbUserData) => {
            !dbUserData
                ? res.status(404).json({ "message": "There is no user with that ID" })
                : res.status(200).json({ "User Updated": dbUserData})
          })
          .catch(err => res.status(500).json(err));
    },
    // Delete specific user
    deleteUser({params}, res) {
        Users.findOneAndDelete({_id: params.userId})
        .then((dbUserData) =>
            !dbUserData
                ? res.status(404).json({"message": 'No User with that ID found!'})
                : Thoughts.deleteMany({_id: {$in: dbUserData.thoughts}})
        )
        .then(() => res.json({ "message": "User and Thoughts deleted!" }))
        .catch((err) => res.status(500).json(err));
    },

    // Add a friend
    addFriend({params}, res) {
        Users.findOneAndUpdate({_id: params.userId}, {$push: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then((dbUserData) => {
            !dbUserData
                ? res.status(404).json({"message": 'No User with this particular ID!'})
                : res.status(200).json({ "friend added": dbUserData})
        })
        .catch((err) => res.status(500).json(err));
    },

    // Remove a friend
    removeFriend({ params }, res) {
        Users.findOneAndUpdate({_id: params.userId}, {$pull: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then((dbUsersData) => {
            !dbUsersData
                ? res.status(404).json({"message": 'No User with this particular ID!'})
                : res.status(200).json({ "friend removed": dbUserData})
        })
        .catch((err) => res.status(500).json(err));
    }
};
module.exports = usersController; 