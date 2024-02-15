import { Model, DataTypes } from 'sequelize';

const jobStatusEnum = ['draft', 'published', 'archived', 'rejected'];

export default function(sequelize) {
  class Job extends Model {
    static associate(models) {
      Job.belongsTo(models.Company, {
        foreignKey: 'companyId',
        as: 'company'
      });
    }
  }
  Job.init(
    {
      title: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      location: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      notes: {
        type: DataTypes.TEXT
      },
      status: {
        type: DataTypes.ENUM(...jobStatusEnum),
        allowNull: false,
        defaultValue: 'draft'
      },
    },
    {
      sequelize,
      modelName: 'Job'
    }
  )
  return Job
}
