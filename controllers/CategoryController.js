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

const Category = sequelize.import('../models/category');
const { listCategories, getCategory, getCategoryByName, createCategory } = require("../services/CategoryService");

router.get("/", function(req, res) {

    listCategories(function(response){

        // If users have been found.
        if(response != null) {
            // If more than one user has been found, return a list.
            if(response.length >= 1) {
                res.status(200);
                res.header("Content-Type",'application/json');
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
            res.header("Content-Type",'application/json');
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
        if(response > 0) {
            res.status(409);
            res.send("There's already a category with this name.");
        } else {
            createCategory(newCategory, function(response){

                if(response.dataValues == undefined) {
                    res.status(400);
                    res.send(response);
                } else {
                    latestCategory.id = response.id;
                    latestCategory.name = response.name;
                    latestCategory.employees = response.employees;
        
                    res.status(201);
                    res.header("Content-Type",'application/json');
                    res.send(JSON.stringify(latestCategory, null, 4));
                }

            });
        }
        
    });

});

router.put("/:id(\\d+)/", function(req, res) {
    res.status(200);
    res.header("Content-Type",'application/json');
});

router.delete("/:id(\\d+)/", function(req, res) {
    res.status(200);
    res.header("Content-Type",'application/json');
});

module.exports = router;