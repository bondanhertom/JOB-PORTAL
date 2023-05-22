'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.belongsToMany(models.User,{
        through: models.Job,
        foreignKey: 'companyId'
      })
    }
  }
  Company.init({
    name:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Company name can not be null"
        },
        notEmpty: {
          msg: "company Name can not be empty"
        },
      }
    },
    companyLogo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Logo url can not be null"
        },
        notEmpty: {
          msg: "Logo url can not be empty"
        },
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Location can not be null"
        },
        notEmpty: {
          msg: "Location can not be empty"
        },
      }
    },
    email: DataTypes.STRING,
    description:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description can not be null"
        },
        notEmpty: {
          msg: "Description can not be empty"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};