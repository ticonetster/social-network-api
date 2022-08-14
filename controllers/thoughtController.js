const {Thoughts, Users} = require('../models');

const thoughtsController = {

    // New thought
    createThought(req, res) {
        Thoughts.create(req.body)  
        .then((data) => {
            return Users.findOneAndUpdate({ _id: req.body.userId}, {$push: {thoughts: data._id}}, {new: true});
        })
        .then((dbThoughtsData) => {
            !dbThoughtsData
                ? res.status(404).json({"message": 'No user with this ID'})
                : res.status(200).json({ "Thought created": dbThoughtsData})
        })
        .catch(err => res.status(500).json(err));
    },

    // Get all Thoughts
    getAllThoughts(req,res) {
        Thoughts.find()
        .sort({ createdAt: -1 })
        .then((dbThoughtsData) => {
            dbThoughtsData.length <= 0
            ? res.status(404).json({"message": 'No thoughts available!'})
            : res.status(200).json({ "Thoughts list": dbThoughtsData})
        })
        .catch(err => res.status(500).json(err));
    },

    // Get Specific thought
    getThoughtById({params}, res) {
        Thoughts.findOne({ _id: params.thoughtId })
        .then((dbThoughtsData) => {
            !dbThoughtsData
              ? res.status(404).json({ message: "No thought with this id!" })
              : res.status(200).json({ "Specific thought": dbThoughtsData})
        })
        .catch(err => res.status(500).json(err));
    },

    // Update Specific thought
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((dbThoughtsData) => {
            !dbThoughtsData
                ? res.status(404).json({message: 'No thoughts with this ID!'})
                :res.status(200).json({"Thought updated": dbThoughtsData})
        })
        .catch(err => res.status(500).json(err));
    },

    // Delete Specific Thought
    deleteThought({params}, res) {
        Thoughts.findOneAndDelete({_id: params.thoughtId})
        .then((dbThoughtsData) => {
            !dbThoughtsData
                ? res.status(404).json({message: 'No thoughts with this ID!'})
                : res.status(200).json({ "Thought deleted": dbThoughtsData})
        })
        .catch(err => res.status(500).json(err));
    },

    // New Reaction
    addReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((dbThoughtsData) => {
            !dbThoughtsData
                ? res.status(404).json({message: 'No thoughts with this ID!'})
                : res.status(200).json({"New reaction": dbThoughtsData})
        })
        .catch(err => res.status(500).json(err));

    },

    // Delete Specific Reaction
    deleteReaction({params}, res) {
        Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
        .then(dbThoughtsData => {
            !dbThoughtsData
                ? res.status(404).json({message: 'No thoughts with this ID!'})
                : res.status(200).json({"New reaction": dbThoughtsData})
        })
        .catch(err => res.status(500).json(err));
    }

};

module.exports = thoughtsController;