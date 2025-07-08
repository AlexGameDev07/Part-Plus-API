import e from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

import customersRoutes from "./src/routes/customersRoutes.js";
import reservationsRoutes from "./src/routes/reservationsRoutes.js";

const swaggerDocument = JSON.parse(
    fs.readFileSync(path.resolve("./PartPlusAPIDocs.json"), 'utf8')
);

const app = e();
app.use(e.json());
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/customers", customersRoutes);
app.use("/api/reservations", reservationsRoutes);
export default app;

