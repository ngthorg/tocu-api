export default function (sequelize, DataTypes) {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'products',
  });

  return Product;
}
