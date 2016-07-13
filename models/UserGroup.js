export default function (sequelize, DataTypes) {
  const UserGroup = sequelize.define('UserGroup', {
    name: {
      type: DataTypes.STRING,
    },
    section: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'user_groups',
  });

  return UserGroup;
}
