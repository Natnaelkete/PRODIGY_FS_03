import dotenv from "dotenv";
import user from "./data/userData.js";
import product from "./data/productData.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import connectDB from "./config/connectDB.js";

dotenv.config();
await connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(user);

    await Product.insertMany(product);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
