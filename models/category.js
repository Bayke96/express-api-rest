'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      len: {
        args: [3, 128],
        msg: 'The name field must contain between 3 and 128 characters.'
      }
    },
    employees: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      isInt: true,
      min: 0
    }
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
  };
  return Category;
};

