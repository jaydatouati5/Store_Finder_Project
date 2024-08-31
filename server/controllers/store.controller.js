const Store = require('../models/store.model');

// Get one by ID
module.exports.getOne = (req , res) => {
    Store.findOne({_id: req.params.id})
    .then(data => res.json(data))
    .catch(err => res.status(404).json(err));
}

// Get all
module.exports.getAll = (req , res) => {
    Store.find()
    .then(data => res.json(data))
    .catch(err => res.status(404).json(err));
}

// Create
module.exports.create = (req , res) => {
    console.log("Create called!")
    Store.create(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(404).json(err));
}

// Update 
module.exports.update = (req , res) => {
    Store.findOneAndUpdate({_id: req.params.id} , req.body , { new: true, runValidators: true })
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
}

// Delete
module.exports.delete = (req , res) => {
    Store.findOneAndDelete({_id: req.params.id})
    .then(data => res.json(data))
    .catch(err => res.status(404).json(err));
}