var express = require("express");
var router = express.Router();
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(
    config.database, 
    config.username,
    config.password, 
    config
);

const User = sequelize.import('../models/user');
const { listUsers, getUser, getUserByName, createUser, updateUser, deleteUser } = require("../services/UserService");

router.get("/", function(req, res) {

    listUsers(function(response){

        // If users have been found.
        if(response != null) {
            // If more than one user has been found, return a list.
            if(response.length >= 1) {
                return res.status(200).json({
                    ok: true,
                    response
                });
            } else {
                // Otherwise, return not found.
                return res.status(204);
            }
        } 
        // If there's an error, return error 404.
        else 
        {
            return res.status(500);
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

            return res.status(200).json({
                ok: false,
                foundUser
            });
        } 
        // Otherwise
        else 
        {
            return res.status(404);
        }
    });

});

router.post("/", function(req, res) {
    if (!req.body.name || !req.body.password) {
        return res.status(422).json({
            ok: false,
            data: {
                msg: "no data",
                route: "/users/",
                method: "post"
            }
        });
    }

    // Create new user object from the request's body.
    const newUser = User.build({ 
        name: req.body.name,
        password: req.body.password.toString()
    });

    getUserByName(newUser.name, function(response){
        // There's already an user with this name.
        if(response.length > 0) {
            return res.status(409).json({
                ok: false,
                data: {
                    msg: "There's already an user with this name.",
                    route: "/users/",
                    method: "post"
                }
            });
        } else {
            createUser(newUser, function(response){
                if(response.dataValues == undefined) {
                    return res.status(400).json({
                        ok: false,
                        data: {
                            msg: response,
                            route: "/users/",
                            method: "post"
                        }
                    });
                } else {
                    const latestUser = {
                        id: response.id,
                        name: response.name,
                        createdAt: response.createdAt
                    };
        
                    return res.status(201).json({
                        ok: true,
                        latestUser
                    });
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
                        return res.status(409).json({
                            ok: false,
                            data: {
                                msg: "There's already an user with this name.",
                                route: `/users/${req.params.id}`,
                                method: "put"
                            }
                        });
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
                        return res.status(409).json({
                            ok: false,
                            data: {
                                msg: updateResponse.message,
                                route: `/users/${req.params.id}`,
                                method: "put"
                            }
                        });
                    } else {
                        const updatedUser = {
                            id: updateResponse.id,
                            name: updateResponse.name,
                            createdAt: updateResponse.createdAt
                        };

                        return res.status(200).json({
                            ok: true,
                            updatedUser
                        });
                    }
                    
                });

            });

        } 
        // Otherwise
        else 
        {
            return res.status(404);
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

                    return res.status(200).json({
                        ok: true,
                        deletedUser
                    });
                } 
                // Otherwise
                else 
                {
                    return res.status(404);
                }
            });

        } 
        // Otherwise
        else 
        {
            return res.status(404);
        }
    });

});

module.exports = router;