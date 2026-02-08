import authRoutes from "./auth.route.js";
import userRoutes from "./user.route.js";

export default function route(app) {
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
}
