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

const Product = sequelize.import("../models/product");
const { listProducts } = require("../services/ProductService");

router.get("/category/:id(\\d+)/", function(req, res) {
    
    listProducts(req.params.id, function(response){

        // If no products have been found.
        if(response != null) {
            // If more than one product has been found, return a list.
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