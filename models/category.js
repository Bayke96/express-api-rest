'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 128],
          msg: "The name field must contain between 3 and 128 characters."
        },
      }
    },
    employees: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        isInt: {
          args: [true],
          msg: "The employees ammount must be an integer."
        },
        min: {
          args: [0],
          msg: "The minimum value must be 0."
        }
      }
    }
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
  };
  return Category;
};

