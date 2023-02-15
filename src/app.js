import express from "express";
import morgan from "morgan";
// Routes
import companyRoutes from "./routes/company.routes";
import employeeRoutes from "./routes/employee.routes";

const app = express();

// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/companies", companyRoutes);
app.use("/api/employees", employeeRoutes);

export default app;
