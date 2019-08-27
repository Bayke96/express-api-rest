'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      len: {
        args: [3, 128],
        msg: 'The name field must contain between 3 and 128 characters.'
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len: {
        args: [12, 128],
        msg: 'The password field must contain between 12 and 128 characters.'
      },
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
