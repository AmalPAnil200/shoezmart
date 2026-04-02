const { Sequelize } = require("sequelize");

let sequelize;

if (process.env.DATABASE_URL) {
  // ── Production (Render) ──
  // Render provides a single DATABASE_URL for Postgres
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // important for Render
      },
    },
  });
} else {
  // ── Local Development ──
  // Uses individual DB_* env vars from .env
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 5432,
      dialect: process.env.DB_DIALECT || "postgres",
      logging: false,
      ...(process.env.DB_SSL === "true" && {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }),
    }
  );
}

module.exports = sequelize;
