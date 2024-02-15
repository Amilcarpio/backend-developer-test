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
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      companyId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Companies',
          key: 'id'
        }
      },
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
      modelName: 'Job'
    }
  )
  return Job
}
