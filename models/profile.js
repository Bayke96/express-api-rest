'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
    userFK: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: [true],
          msg: "The user's foreign key must be an integer value."
        }
      }
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlpha: true,
      validate: {
        len: {
          args: [3, 72],
          msg: "The firstname field must contain between 3 and 72 characters."
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlpha: true,
      validate: {
        len: {
          args: [3, 72],
          msg: "The lastname field must contain between 3 and 72 characters."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      validate: {
        len: {
          args: [3, 128],
          msg: "The email field must contain between 3 and 128 characters."
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 128],
          msg: "The address field must contain between 3 and 128 characters."
        }
      }
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 50],
          msg: "The number field must contain between 3 and 50 characters."
        }
      }
    }
  }, {});
  Profile.associate = function(models) {
    // associations can be defined here
    Profile.belongsTo(User, { as : "user_1" , foreignKey : "userFK" });
  };
  return Profile;
};

