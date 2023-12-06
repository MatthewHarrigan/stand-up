// models/note.js
module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define('Note', {
      date: DataTypes.DATEONLY,
      speakerId: DataTypes.INTEGER,
      content: DataTypes.TEXT
    });
  
    Note.associate = function(models) {
      // associations can be defined here
      // Assuming you have a TeamMember model
      Note.belongsTo(models.TeamMember, { foreignKey: 'speakerId' });
    };
  
    return Note;
  };
  