import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./database/db.js";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// ); // Allows requests from react frontend

app.use("/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
