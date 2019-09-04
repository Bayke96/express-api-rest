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

const listProducts = (categoryID, callback) => {

    Product.findAll({
        attributes: ["id", "categoryFK", "name", "description", "price", "units"],
        where: { categoryFK: categoryID },
    }).
    then(function(categoriesList){
        return callback(categoriesList);
    }).catch(function (err) {
        console.log("Error Identified: " + err);
    });

};

module.exports = { listProducts };