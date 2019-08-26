'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryFK: {
        type: DataTypes.INTEGER,
        references: {
          model: "Categories",
          key: "id"
        },
      },
      name: {
        type: Sequelize.STRING(128)
      },
      description: {
        type: Sequelize.STRING(128)
      },
      price: {
        type: Sequelize.DOUBLE
      },
      units: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Products');
  }
};