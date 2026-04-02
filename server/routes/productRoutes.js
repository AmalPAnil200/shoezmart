const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

router.post("/", async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

app.get("/api/products/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.json([]);
    }

    const products = await Product.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${q}%` } },        // Matches "Nike"
          { category: { [Op.like]: `%${q}%` } },    // Matches "Shoes" or "Sneakers"
          { description: { [Op.like]: `%${q}%` } }  // Matches keywords in the text
        ]
      }
    });

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;
