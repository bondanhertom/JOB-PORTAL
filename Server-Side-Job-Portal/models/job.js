'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.User, {
        foreignKey: 'authorId'
      })
      Job.belongsTo(models.Company, {
        foreignKey: 'companyId'
      })
      Job.belongsToMany(models.Customer, {
        through : models.Bookmark,
        foreignKey: 'JobId'
      })

    }
  }
  Job.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Job name can not be null"
        },
        notEmpty: {
          msg: "Job name can not be empty"
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
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
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "ImageUrl can not be null"
        },
        notEmpty: {
          msg: "ImageUrl can not be empty"
        },
      }
    },
    companyId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    jobType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Job type can not be null"
        },
        notEmpty: {
          msg: "Job type can not be empty"
        },
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["Active", "Inactive", "Archived"]],
          msg: "Only allowed Active, Inactive and Archived",
        },
        notNull: {
          msg: "Job status can not be null"
        },
        notEmpty: {
          msg: "Job status can not be empty"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};