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

const listUsers = (callback) => {

    User.findAll({
        attributes: ["id", "name", "createdAt"]
    }).
    then(function(userList){
        return callback(userList);
    }).catch(function (err) {
        console.log("Error Identified: " + err);
    });

};

const getUser = (userID, callback) => {

    User.findByPk(userID).
    then(function(foundUser){
        return callback(foundUser);
    }).catch(function (err) {
        console.log("Error Identified: " + err);
    });

};

const getUserByName = (username, callback) => {

    var searchUsername = username.toString().toUpperCase();
    User.findAll({
        limit: 1,
        attributes: ["id", "name", "createdAt"],
        where: sequelize.where(
            sequelize.fn('upper', sequelize.col('name')), 
            sequelize.fn('upper', searchUsername)
          )
    }).
    then(function(foundUser){
        return callback(foundUser);
    }).catch(function (err) {
        return callback(null);
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

const updateUser = (userObject, callback) => {

    User.update(
        { name: userObject.name },
        { where: { id: userObject.id }, returning: true, plain: true } 
    ).
    then(function(updatedUserResponse){

        var updated = {
            id: updatedUserResponse[1].dataValues.id,
            name: updatedUserResponse[1].dataValues.name,
            createdAt: updatedUserResponse[1].dataValues.createdAt
        };

        return callback(updated);

    }).catch(function (err) {
        console.log("Error Identified: " + err);
    });

};

const deleteUser = (userID, callback) => {

    getUser(userID, function(findUserResponse){

        var deleted = {
            id: findUserResponse.dataValues.id,
            name: findUserResponse.dataValues.name,
            createdAt: findUserResponse.dataValues.createdAt
        };

        User.destroy(
            { where: { id: userID }, returning: true, plain: true } 
        ).
        then(function(deletedUserResponse){
            return callback(deleted);
    
        }).catch(function (err) {
            console.log("Error Identified: " + err);
        });

    });

};

module.exports = { listUsers, getUser, getUserByName, createUser, updateUser, deleteUser };