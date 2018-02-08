'use strict';
module.exports = (sequelize, DataTypes) => {
  var Recordings = sequelize.define('Recordings', {
    title: DataTypes.STRING,
    transcript: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Recordings;
};