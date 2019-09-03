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

const listCategories = (callback) => {

    Category.findAll({
        attributes: ["id", "name", "employees"]
    }).
    then(function(categoriesList){
        return callback(categoriesList);
    }).catch(function (err) {
        console.log("Error Identified: " + err);
    });

};

const getCategory = (categoryID, callback) => {

    Category.findByPk(categoryID).
    then(function(foundCategory){
        return callback(foundCategory);
    }).catch(function (err) {
        console.log("Error Identified: " + err);
    });

};

const getCategoryByName = (categoryName, callback) => {

    var findCategory = categoryName.toString().toUpperCase();
    Category.findAll({
        limit: 1,
        attributes: ["id", "name", "employees"],
        where: sequelize.where(
            sequelize.fn("upper", sequelize.col("name")), 
            sequelize.fn("upper", findCategory)
          )
    }).
    then(function(foundCategory){
        return callback(foundCategory.length);
    }).catch(function (err) {
        return callback(null);
    });

};

const createCategory = (categoryObject, callback) => {

    const newCategory = Category.create({
        name: categoryObject.name,
        employees: 0
    }).then(function(newestCategory){
        return callback(newestCategory);
    }).catch(function (err) {
        return callback(err.message);
    });

};

module.exports = { listCategories, getCategory, getCategoryByName, createCategory };