'use strict';
module.exports = (sequelize, DataTypes) => {
  var accouts = sequelize.define('accouts', {
    userName:DataTypes.STRING,
    passWord:DataTypes.STRING
  }, {});
  accouts.associate = function(models) {
    // associations can be defined here
  };
  return accouts;
};