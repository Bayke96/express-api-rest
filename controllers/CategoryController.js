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

const Category = sequelize.import("../models/category");
const { listCategories, getCategory, getCategoryByName, createCategory, updateCategory, deleteCategory } = require("../services/CategoryService");

router.get("/", function(req, res) {

    listCategories(function(response){

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

    getCategory(req.params.id, function(response){

        // If an user has been found.
        if(response != null) {

            const foundCategory = {
                id: response.id,
                name: response.name,
                employees: response.employees
            };

            res.status(200);
            res.header("Content-Type", "application/json");
            res.send(JSON.stringify(foundCategory, null, 4));
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

    let latestCategory = {};
    // Create new category object from the request's body.
    const newCategory = Category.build({ 
        name: req.body.name,
        employees: 0
    });

    getCategoryByName(newCategory.name, function(response){
        // There's already an category with this name.
        if(response.length > 0) {
            res.status(409);
            res.send("There's already a category with this name.");
            return false;
        } else {
            createCategory(newCategory, function(response){

                if(response.dataValues == undefined) {
                    res.status(400);
                    res.send(response);
                    return false;
                } else {
                    latestCategory.id = response.id;
                    latestCategory.name = response.name;
                    latestCategory.employees = response.employees;
        
                    res.status(201);
                    res.header("Content-Type", "application/json");
                    res.send(JSON.stringify(latestCategory, null, 4));
                }

            });
        }
        
    });

});

router.put("/:id(\\d+)/", function(req, res) {
    
    getCategory(req.params.id, function(response){
        // If a category has been found.
        if(response != null) {

            getCategoryByName(req.body.name, function(foundResponse){

                if(foundResponse.length > 0) {
                    let foundID = foundResponse[0].dataValues.id;
                    let oldName = foundResponse[0].dataValues.name.toString().toUpperCase();
                    let newName = req.body.name.toString().toUpperCase();

                    // If there's another category with this name, return a conflict.
                    if(foundID != req.params.id && oldName == newName) {
                        res.status(409);
                        res.send("There's already a category with this name.");
                        return false;
                    }
                } 
                // Otherwise, proceed.

                // Create new category object from the request's body.

                const newCategory = Category.build({ 
                    id: req.params.id,
                    name: req.body.name,
                    employees: parseInt(req.body.employees)
                });

                updateCategory(newCategory, function(updateResponse){

                    if(updateResponse.message != undefined) {
                        res.status(400);
                        res.send(updateResponse.message);
                        return false;
                    } else {
                        var updatedCategory = {};
                        updatedCategory.id = updateResponse.id;
                        updatedCategory.name = updateResponse.name;
                        updatedCategory.employees = updateResponse.employees;
            
                        res.status(200);
                        res.header("Content-Type", "application/json");
                        res.send(JSON.stringify(updatedCategory, null, 4));
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
    
    getCategory(req.params.id, function(response){

        // If a category has been found.
        if(response != null) {

            deleteCategory(req.params.id, function(deleteResponse){

                // If a category has been found.
                if(response != null) {
        
                    const deletedCategory = {
                        id: deleteResponse.id,
                        name: deleteResponse.name,
                        employees: deleteResponse.employees
                    };
        
                    res.status(200);
                    res.header("Content-Type", "application/json");
                    res.send(JSON.stringify(deletedCategory, null, 4));
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