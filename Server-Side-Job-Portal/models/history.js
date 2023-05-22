'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  history.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "History name can not be null"
        },
        notEmpty: {
          msg: "History name can not be empty"
        },
      },
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "History description can not be null"
        },
        notEmpty: {
          msg: "History description can not be empty"
        },
      },
    },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "UpdatedBy can not be null"
        },
        notEmpty: {
          msg: "UpdateBy can not be empty"
        },
      },
    },
  }, {
    sequelize,
    modelName: 'history',
  });
  return history;
};