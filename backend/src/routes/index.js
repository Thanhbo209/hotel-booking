import authRoutes from "./auth.route.js";
import userRoutes from "./user.route.js";
import adminRoutes from "./admin.route.js";
import ownerRoutes from "./owner.route.js";

export default function route(app) {
  app.use("/api/auth", authRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/owner", ownerRoutes);
}
