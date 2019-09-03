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

module.exports = { listCategories };