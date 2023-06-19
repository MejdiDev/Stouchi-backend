const UserServices = require('./../service/user_service');
var bcrypt = require('bcryptjs');
let UserModel = require('../models/user.js');

exports.register = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const { name, email, password, phone} = req.body;
        const duplicate = await UserServices.getUserByEmail(email);
        if (duplicate) {
            throw new Error(`UserName ${email}, Already Registered`)
        }
        const response = await UserServices.registerUser(name, email, password, phone);

        res.json({ status: true, success: 'User registered successfully' });


    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Parameter are not correct');
        }
        let User = await UserServices.checkUser(email);
        if (!User) {
            throw new Error('User does not exist');
        }

        const isPasswordCorrect = await bcrypt.compare(password, User.password);

        if (isPasswordCorrect === false) {
            throw new Error(`Username or Password does not match`);
        }

        // Creating Token

        let tokenData;
        tokenData = { _id: User._id, email: User.email };
    

        const token = await UserServices.generateAccessToken(tokenData,"secret","1h")

        res.status(200).json({ status: true, success: User, token: token, _id: User._id });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        UserModel.updateOne({ _id: req.query.id }, req.body)
        .then(() => {
            res.status(200).json({ status: true });
        });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}