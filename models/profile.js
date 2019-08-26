'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    userFK: DataTypes.INTEGER,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    number: DataTypes.STRING
  }, {});
  Profile.associate = function(models) {
    // associations can be defined here
  };
  return Profile;
};