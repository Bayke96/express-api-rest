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
const { listCategories } = require("../services/CategoryService");

router.get("/", function(req, res) {

    listCategories(function(response){

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
    res.status(200);
    res.header("Content-Type",'application/json');
});

router.post("/", function(req, res) {
    res.status(201);
    res.header("Content-Type",'application/json');
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