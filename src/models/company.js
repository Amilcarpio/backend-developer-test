import { Model, DataTypes } from 'sequelize';

export default function(sequelize) {
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
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Company',
      freezeTableName: true
    }
  )
  return Company
}
