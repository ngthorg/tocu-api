
export default function (sequelize, DataTypes) {
  const District = sequelize.define('District', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ghnDistrictCode: {
      type: DataTypes.STRING,
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: DataTypes.INTEGER,
    ghnSupportType: {
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: false,
  });

  return District;
}
