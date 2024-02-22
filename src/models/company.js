const { Model, DataTypes } = require('sequelize');

module.exports = function(sequelize) {
  class Company extends Model {
    static associate(models) {
      Company.hasMany(models.Job, {
        foreignKey: 'companyId',
        as: 'jobs'
      });
    }
  }

  Company.init(
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
    },
    {
      sequelize,
      modelName: 'Company',
      freezeTableName: true
    }
  )
  return Company
}
