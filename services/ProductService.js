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

const getProduct = (productID, callback) => {

    Product.findByPk(productID).
    then(function(foundProduct){
        return callback(foundProduct);
    }).catch(function (err) {
        console.log("Error Identified: " + err);
    });

};

const getProductByName = (productName, callback) => {

    var findProduct = productName.toString().toUpperCase();
    Product.findAll({
        limit: 1,
        attributes: ["id", "categoryFK", "name", "description", "price", "units"],
        where: sequelize.where(
            sequelize.fn("upper", sequelize.col("name")), 
            sequelize.fn("upper", findProduct)
          )
    }).
    then(function(foundProduct){
        return callback(foundProduct);
    }).catch(function (err) {
        return callback(null);
    });

};

const createProduct = (productObject, callback) => {

    const newProduct = Product.create({
        categoryFK: categoryObject.categoryFK,
        name: categoryObject.name,
        description: categoryObject.description,
        price: categoryObject.price,
        units: categoryObject.units
    }).then(function(newestProduct){
        return callback(newestProduct);
    }).catch(function (err) {
        return callback(err.message);
    });

};

module.exports = { listProducts, getProduct, getProductByName, createProduct };