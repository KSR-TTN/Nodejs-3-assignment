import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded());

import studentRoute from "./routes/student.route.js";
app.use("/api/v1/students", studentRoute);

export default app;
