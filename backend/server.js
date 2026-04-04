import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import indexRoutes from "./api/v1/routes/index.js";


dotenv.config();

const app = express();

// ✅ Global Middlewares
app.use(cors());
app.use(express.json());

// ✅ Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running 🚀"
  });
});

// ✅ Use all routes
app.use("/api/v1", indexRoutes); // ✅ fixed

// ✅ Start Server Function
const startServer = async () => {
  const isConnected = await connectDB();

  if (!isConnected) {
    console.log("❌ Server not started due to DB failure");
    process.exit(1);
  }

  const PORT = process.env.PORT || 5555;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

// 🚀 Initialize
startServer();