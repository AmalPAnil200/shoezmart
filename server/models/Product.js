const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    category: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    purchasePrice: { type: DataTypes.FLOAT }, // 👈 Add this: What you paid for it
    colors: { type: DataTypes.TEXT, allowNull: true },
    sizes: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    timestamps: true,
  },
);

module.exports = Product;
