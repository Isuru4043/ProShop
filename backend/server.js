const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
// const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
connectDB(); // connect to the database
// allow the server to accept JSON data in the body of the request
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log("serveS-001");
app.use(cookieParser());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
