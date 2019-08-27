const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const bcrypt = require('bcrypt');

const sequelize = new Sequelize(
    config.database, 
    config.username,
    config.password, 
    config
);

const User = sequelize.import('../models/user');

const getUser = (userID, callback) => {

    User.findByPk(userID).
    then(function(foundUser){
        return callback(foundUser);
    }).catch(function (err) {
        console.log("Error Identified: " + err);
    });

};

const createUser = (userObject, callback) => {

    bcrypt.hash(userObject.password.toString(), 12, function(err, hash) {
        
        var encryptedPassword = hash;

        const newUser = User.build({ 
            name: userObject.name,
            password: encryptedPassword
        });
    
        newUser.save().
        then(function(latestUser){
            return callback(latestUser);
        }).catch(function (err) {
            console.log("Error Identified: " + err);
        });

    });

};

module.exports = { getUser, createUser };