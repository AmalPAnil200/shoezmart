const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define("Order", {
  id: {
    // ✅ ONLY primary key
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // ✅ NOT primary key
  },

  payerName: DataTypes.STRING,
  totalAmount: DataTypes.FLOAT,
  items: DataTypes.JSON,
  shippingAddress: DataTypes.JSON,

  status: {
    type: DataTypes.STRING,
    defaultValue: "Processing",
  },
  paymentStatus: DataTypes.STRING,
  paymentMethod: DataTypes.STRING,
});

module.exports = Order;
