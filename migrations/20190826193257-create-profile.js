'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userFK: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
      },
      firstname: {
        type: Sequelize.STRING(128)
      },
      lastname: {
        type: Sequelize.STRING(128)
      },
      email: {
        type: Sequelize.STRING(128)
      },
      address: {
        type: Sequelize.STRING(128)
      },
      number: {
        type: Sequelize.STRING(128)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Profiles');
  }
};