const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
// const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
connectDB(); // connect to the database
// allow the server to accept JSON data in the body of the request
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 5000;

console.log("test-01");
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);
console.log("user-0101");
app.use("/api/users", userRoutes);

app.use("/api/orders", orderRoutes);
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);
console.log("user-0102");
app.listen(port, () => console.log(`Server running on port ${port}`));
