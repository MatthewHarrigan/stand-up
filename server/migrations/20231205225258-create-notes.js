'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Notes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      speakerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { // Reference to the TeamMember model
          model: 'TeamMembers',
          key: 'id'
        }
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
      // If you're using paranoid (soft deletes)
      // deletedAt: {
      //   allowNull: true,
      //   type: Sequelize.DATE
      // }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Notes');
  }
};
