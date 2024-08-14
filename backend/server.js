import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import UserRoute from "./routes/userRoute.js";
import ProductRoute from "./routes/productRoute.js";
import CartRoute from "./routes/cartRoute.js";
import OrderRoute from "./routes/orderRoute.js";

const PORT = process.env.PORT || 8000;
await connectDB();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", UserRoute);
app.use("/api/products", ProductRoute);
app.use("/api/cart", CartRoute);
app.use("/api/orders", OrderRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
