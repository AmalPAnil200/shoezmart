require("dotenv").config();
const User = require("./models/User");
const sequelize = require("./config/db");
const bcrypt = require("bcryptjs");

async function seedAdmin() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); 

    const email = "admin@shoezmart.com";
    const password = "admin123";
    const hashedPassword = await bcrypt.hash(password, 10);

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name: "Default Admin",
        password: hashedPassword,
        role: "admin",
      },
    });

    if (created) {
      console.log("✅ Admin user created successfully!");
    } else {
      user.role = "admin";
      user.password = hashedPassword;
      await user.save();
      console.log("ℹ️ Admin user already exists. ACCESS GRANTED with forced password update.");
    }
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to create admin:", err);
    process.exit(1);
  }
}

seedAdmin();
