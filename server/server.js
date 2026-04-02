require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path"); // Declared once at the top
const multer = require("multer");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Database & Models
const sequelize = require("./config/db");
const Product = require("./models/Product");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 5000;

const Order = require("./models/Order");

// ─── Multer Storage Setup ───────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// THIS IS THE LINE YOU WERE MISSING OR HAD IN THE WRONG PLACE
const upload = multer({ storage });

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://shoezmart.vercel.app", // 👈 your REAL URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
// Serve the uploads folder so frontend can see images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ─── Auth Routes ─────────────────────────────────────────────────────────────
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.json({ message: "User created!", userId: user.id });
  } catch (err) {
    res.status(400).json({ error: "Email already exists" });
  }
});

// ─── Middleware ─────────────────────────────────────────────────────────────
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET || "SECRET", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (user && user.role === "admin") {
      next();
    } else {
      res.status(403).json({ error: "Access denied. Admins only." });
    }
  } catch (err) {
    res.status(500).json({ error: "Authorization check failed" });
  }
};

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || "SECRET",
        { expiresIn: "1d" },
      );
      res.json({
        token,
        user: { name: user.name, email: user.email, role: user.role },
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

// ─── Product Routes ──────────────────────────────────────────────────────────
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ─── Utility Route: Normalize Product Categories ─────────────────────────────
// Call this endpoint ONCE to fix all product categories in the DB
app.post("/api/admin/normalize-categories", authenticateToken, isAdmin, async (req, res) => {
  try {
    const products = await Product.findAll();
    for (const product of products) {
      // Remove non-letters, make lowercase, trim spaces
      const cleanCategory = (product.category || "")
        .toLowerCase()
        .replace(/[^a-z]/g, "")
        .trim();
      if (product.category !== cleanCategory) {
        product.category = cleanCategory;
        await product.save();
      }
    }
    res.json({ message: "Categories normalized!" });
  } catch (err) {
    res.status(500).json({ error: "Normalization failed" });
  }
});

// Replace your Search Route in server.js with this:
// In your server.js search route
// app.get("/api/products/search", async (req, res) => {
//   try {
//     const { q, id, category } = req.query;

//     console.log("QUERY:", req.query); // 🔍 debug

//     let whereCondition = {};

//     if (id) {
//       whereCondition.id = id;
//     }

//     if (q) {
//       whereCondition.name = { [Op.like]: `%${q}%` };
//     }

//     if (category) {
//       whereCondition.category = category;
//     }

//     console.log("WHERE:", whereCondition); // 🔍 debug

//     const products = await Product.findAll({ where: whereCondition });
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: "Search failed" });
//   }
// });

// server.js
// server.js
app.get("/api/products/search", async (req, res) => {
  try {
    const { q, category } = req.query; // 👈 Extract category from the URL
    let whereCondition = {};

    // 1. Handle Keyword Search (if user typed in search bar)
    if (q) {
      whereCondition.name = { [Op.like]: `%${q}%` };
    }

    // 2. Handle Category Filter (for Men, Women, Basketball, etc.)
    if (category && category !== "All") {
      // Case-insensitive match for category (works for most SQL dialects)
      whereCondition.category = sequelize.where(
        sequelize.fn("LOWER", sequelize.col("category")),
        category.toLowerCase(),
      );
    }

    const products = await Product.findAll({
      where: whereCondition,
    });

    res.json(products);
  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ error: "Search failed" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// ─── Admin Routes (With Image Upload) ─────────────────────────────────────────

// Fixed: Only ONE POST route for adding products
app.post("/api/admin/products", authenticateToken, isAdmin, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Image required" });

    const {
      name,
      price,
      category,
      stock,
      colors,
      sizes,
      description,
      purchasePrice,
    } = req.body;

    const product = await Product.create({
      name,
      price,
      purchasePrice,
      category,
      stock,
      colors, // Save the string "Red, Blue"
      sizes, // Save the string "7, 8, 9"
      description,
      image: req.file.filename,
    });

    res.json({ message: "Success", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

app.put("/api/admin/products/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    await Product.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Product updated!" });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

app.delete("/api/admin/products/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.json({ message: "Product deleted!" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

// ─── Order Routes ────────────────────────────────────────────────────────────
// ── 1. CREATE ORDER ROUTE (Called by Checkout page) ──
// ── 1. THE SUCCESS (CREATE) ROUTE ──
app.post("/api/orders/success", async (req, res) => {
  const {
    cartItems,
    orderID,
    payerName,
    total,
    shippingAddress,
    paymentMethod,
  } = req.body;

  try {
    const newOrder = await Order.create({
      orderId: orderID,
      payerName: payerName,
      totalAmount: total,
      items: cartItems,
      shippingAddress: shippingAddress,
      paymentStatus: "COMPLETED",
      paymentMethod: paymentMethod || "Not specified",
      status: "Processing",
    });

    // Stock Reduction
    for (const item of cartItems) {
      const product = await Product.findByPk(item.id);
      if (product) {
        await product.update({
          stock: Math.max(0, product.stock - item.quantity),
        });
      }
    }
    res.status(201).json(newOrder);
  } catch (err) {
    console.error("Order Save Error:", err);
    res.status(500).json({ error: "Database failed to save the order." });
  }
});

// ── 2. UPDATE ORDER STATUS (Called by Admin Orders Page) ──
app.put("/api/admin/orders/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    await Order.update({ status }, { where: { orderId: req.params.id } });
    res.json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// ── 3. DELETE ORDER ROUTE ──
app.delete("/api/admin/orders/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const deleted = await Order.destroy({
      where: { orderId: req.params.id }, // orderId is the string key e.g. "SZ-XXXXXXX"
    });

    if (!deleted) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error("Delete failed:", err);
    res.status(500).json({ error: "Delete failed" });
  }
});

// ─── Bootstrap ────────────────────────────────────────────────────────────────
async function startServer() {
  try {
    await sequelize.authenticate();
    // Move alter: true here to ensure columns exist before server accepts traffic
    await sequelize.sync({ alter: true });
    console.log("✅ Database & Models Ready (Altered).");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Startup failed:", error.message);
    process.exit(1);
  }
}

app.get("/api/admin/sales-stats", authenticateToken, isAdmin, async (req, res) => {
  try {
    // Fetch all orders to calculate stats
    const orders = await Order.findAll();

    // Grouping logic (e.g., by month)
    const stats = orders.reduce((acc, order) => {
      const date = new Date(order.createdAt);
      const month = date.toLocaleString("default", { month: "short" });

      if (!acc[month]) {
        acc[month] = { name: month, sales: 0, profit: 0, loss: 0 };
      }

      const orderTotal = Number(order.totalAmount);

      // Basic math: 20% profit margin, 5% loss estimate
      acc[month].sales += orderTotal;
      acc[month].profit += orderTotal * 0.2;
      acc[month].loss += orderTotal * 0.05;

      return acc;
    }, {});

    // Convert object back to array for Chart.js
    res.json(Object.values(stats));
  } catch (err) {
    console.error("Graph Data Error:", err);
    res.status(500).json({ error: "Failed to generate stats" });
  }
});

// (PUT route defined above at line 265 — no duplicate needed)

// 3. Admin Route to fetch all orders
app.get("/api/admin/orders", authenticateToken, isAdmin, async (req, res) => {
  try {
    const orders = await Order.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

startServer();
