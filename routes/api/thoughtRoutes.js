const router = require('express').Router();

const { 
    getAllThoughts, 
    getThoughtById, 
    createThought, 
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction

} = require('../../controllers/thoughtController');

// GET and POST route to /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// GET, PUT and DELETE route to /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought); 

// POST route to /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// DELETE route to /api/thoughts/:thoughtId/reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;