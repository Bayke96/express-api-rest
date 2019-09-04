var express = require("express");
var router = express.Router();
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const sequelize = new Sequelize(
    config.database, 
    config.username,
    config.password, 
    config
);

const User = sequelize.import("../models/user");
const { listUsers, getUser, getUserByName, createUser, updateUser, deleteUser } = require("../services/UserService");

router.get("/", function(req, res) {

    listUsers(function(response){

        // If users have been found.
        if(response != null) {
            // If more than one user has been found, return a list.
            if(response.length >= 1) {
                res.status(200);
                res.header("Content-Type", "application/json");
                res.send(JSON.stringify(response, null, 4));
            } else {
                // Otherwise, return not found.
                res.status(204);
                res.send(null);
            }
        } 
        // If there's an error, return error 404.
        else 
        {
            res.status(500);
            res.send(null);
        }
    });

});

router.get("/:id(\\d+)/", function(req, res) {

    getUser(req.params.id, function(response){

        // If an user has been found.
        if(response != null) {

            const foundUser = {
                id: response.id,
                name: response.name,
                createdAt: response.createdAt
            };

            res.status(200);
            res.header("Content-Type", "application/json");
            res.send(JSON.stringify(foundUser, null, 4));
        } 
        // Otherwise
        else 
        {
            res.status(404);
            res.send(null);
        }
    });

});

router.post("/", function(req, res) {

    let latestUser = {};
    // Create new user object from the request's body.
    const newUser = User.build({ 
        name: req.body.name,
        password: req.body.password.toString()
    });

    getUserByName(newUser.name, function(response){
        // There's already an user with this name.
        if(response.length > 0) {
            res.status(409);
            res.send("There's already an user with this name.");
            return false;
        } else {
            createUser(newUser, function(response){

                if(response.dataValues == undefined) {
                    res.status(400);
                    res.send(response);
                    return false;
                } else {
                    latestUser.id = response.id;
                    latestUser.name = response.name;
                    latestUser.createdAt = response.createdAt;
        
                    res.status(201);
                    res.header("Content-Type", "application/json");
                    res.send(JSON.stringify(latestUser, null, 4));
                }

            });
        }
        
    });

});

router.put("/:id(\\d+)/", function(req, res) {
    
    getUser(req.params.id, function(response){

        // If an user has been found.
        if(response != null) {

            getUserByName(req.body.name, function(foundResponse){

                if(foundResponse != null) {
                    let foundID = foundResponse[0].dataValues.id;
                    let oldName = foundResponse[0].dataValues.name.toString().toUpperCase();
                    let newName = req.body.name.toString().toUpperCase();

                    // If there's another user with this name, return a conflict.
                    if(foundID != req.params.id && oldName == newName) {
                        res.status(409);
                        res.send("There's already an user with this name.");
                        return false;
                    }
                } 
                // Otherwise, proceed.

                // Create new user object from the request's body.
                const newUser = { 
                    id: req.params.id,
                    name: req.body.name
                };

                updateUser(newUser, function(updateResponse){

                    if(updateResponse.message != undefined) {
                        res.status(400);
                        res.send(updateResponse.message);
                        return false;
                    } else {
                        var updatedUser = {};
                        updatedUser.id = updateResponse.id;
                        updatedUser.name = updateResponse.name;
                        updatedUser.createdAt = updateResponse.createdAt;
            
                        res.status(200);
                        res.header("Content-Type", "application/json");
                        res.send(JSON.stringify(updatedUser, null, 4));
                    }
                    
                });

            });

        } 
        // Otherwise
        else 
        {
            res.status(404);
            res.send(null);
        }
    });

});

router.delete("/:id(\\d+)/", function(req, res) {
    
    getUser(req.params.id, function(response){

        // If an user has been found.
        if(response != null) {

            deleteUser(req.params.id, function(deleteResponse){

                // If an user has been found.
                if(response != null) {
        
                    const deletedUser = {
                        id: deleteResponse.id,
                        name: deleteResponse.name,
                        createdAt: deleteResponse.createdAt
                    };
        
                    res.status(200);
                    res.header("Content-Type", "application/json");
                    res.send(JSON.stringify(deletedUser, null, 4));
                } 
                // Otherwise
                else 
                {
                    res.status(404);
                    res.send(null);
                }
            });

        } 
        // Otherwise
        else 
        {
            res.status(404);
            res.send(null);
        }
    });

});

module.exports = router;