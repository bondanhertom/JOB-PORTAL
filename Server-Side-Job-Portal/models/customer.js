'use strict';

const { hashPassword } = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsToMany(models.Job, {
        through: models.Bookmark,
        foreignKey: 'UserId'
      })
    }
  }
  Customer.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email can not be null"
        },
        notEmpty: {
          msg: "Email can not be empty"
        },
        isEmail: {
          msg: 'Please enter a valid email address'
        },
        async isUnique(email) {
          const user = await Customer.findOne({ where: { email } });
          if (user) {
            throw new Error('Email address already in use!');
          }
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password can not be null"
        },
        notEmpty: {
          msg: "Password can not be empty"
        },
        len: {
          args: [5],
          msg: 'Password must be at least 5 characters long'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });
  Customer.beforeCreate((customer, option) => {
    customer.password = hashPassword(customer.password)
  });
  return Customer;
};