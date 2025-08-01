import express from "express";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();

app.use(express.json());

app.use("/students", studentRoutes);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
