'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    categoryFK: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: [true],
          msg: "The category's foreign key ammount must be an integer."
        },
        min: {
          args: [1],
          msg: "The category's foreign key value cannot be less than 1"
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 128],
          msg: "The name field must contain between 3 and 128 characters."
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 128],
          msg: "The description field must contain between 3 and 128 characters."
        }
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: "The price cannot be under 0."
        }
      }
    },
    units: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: "The units value cannot be under 0."
        }
      }
    }
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};

Product.hasMany(Category, {
  foreignKey: "categoryFK",
  sourceKey: "id"
});