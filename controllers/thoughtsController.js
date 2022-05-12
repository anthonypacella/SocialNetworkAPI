const { Thought, User } = require('../models');

module.exports = {
    // Get all Thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    //Get single thought by its _id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId})
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
     },
     
     //Create a thought
     createThought(req, res) {
         Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
     },

     //Update a thought
     updateThought(req, res) {
         Thought.findOneAndUpdate(
             { _id: req.params.thoughtId},
             { $set: req.body },
             { runValidators: true, new: true}
         )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this ID'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
     },

     //Delete a thought
     deleteThought(req, res) {
         Thought.findOneAndDelete({ _id: req.params.thoughtId})
            .then((thought) =>
                !thought
                    ? res.status(404).json({message: 'No thought with this ID'})
                    : res.json(thought)
                )
                .catch((err) => res.status(500).json(err));
     },

     createReaction(req, res) {
         Thought.findOneAndUpdate(
             { _id: req.params.thoughtId },
             { $addToSet: { reaction: req.body }},
             { runValidators: true, new: true}
         )
         .then((thought) =>
            !thought
                ?res.status(404).json({message: 'No thought with thatID'})
                : res.json(thought)
            )
        .catch((err) => res.status(500).json(err));
     },

     deleteReaction(req, res) {
         Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reaction: req.params.reactionId }},
            { new: true}
         )
         .then((thought) =>
            !thought
                ?res.status(404).json({message: 'No thought with thatID'})
                : res.json("Reaction Deleted!")
            )
        .catch((err) => res.status(500).json(err));
     }

}