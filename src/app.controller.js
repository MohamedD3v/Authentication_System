import { configDotenv } from "dotenv";
import { connection } from "./Database/connection.js";
import { errorHandler } from "./Middleware/errorHandler.middleware.js";
import  authRoutes from "../src/Modules/Routes/AuthRouter/auth.routes.js";
configDotenv();

export const bootstrap = async (app, express) => {
  app.use(express.json());
  await connection();

  app.use("/api/auth", authRoutes);

  app.use(errorHandler);
};
