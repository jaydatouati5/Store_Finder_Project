const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

module.exports.register = (req , res) => {
    User.create(req.body)
    .then(user => {
        const userToken = jwt.sign({id: user._id} , secretKey);
        res
        .cookie("usertoken" , userToken , {httpOnly: true})
        .json({msg: "Success!" , user: user});
    })
    .catch(err => res.status(400).json(err));
}

module.exports.login = async(req , res) => {
    const user = await User.findOne({email: req.body.email});

    if (user === null){
        return res.status(400).json({msg: "Email not Found!"});
    }


    const correctPassword = await bcrypt.compare(req.body.password , user.password);

    if (!correctPassword){
        return res.status(400).json({msg: "Incorrect password!"});
    }

    const userToken = jwt.sign({id: user._id} , secretKey);
    res
    .cookie("usertoken" , userToken , {httpOnly: true})
    .json({msg: "Success!"});
}

module.exports.logout = (req , res) => {
    res.clearCookie("usertoken");
    res.status(200).json({msg: "Logged Out!"});
}

module.exports.getAll = (req , res) => {
    User.find()
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
}