import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { router as authRoutes } from "./routes/auth.js";
import { router as contactRoutes } from "./routes/contact.js";
import { router as categoryRoutes } from "./routes/category.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URI, { family: 4 })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`"Db is  connected and Server is running at ${PORT}"`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/category", categoryRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Phonelyfy" });
});
