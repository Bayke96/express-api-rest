'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    categoryFK: {
      type:DataTypes.INTEGER,
      allowNull: false,
      isInt: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      len: {
        args: [3, 128],
        msg: 'The name field must contain between 3 and 128 characters.'
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      len: {
        args: [3, 128],
        msg: 'The description field must contain between 3 and 128 characters.'
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      min: 0
    },
    units: {
      type: DataTypes.INTEGER,
      allowNull: false,
      min: 0,
      defaultValue: 0
    }
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};