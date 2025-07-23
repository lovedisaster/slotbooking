import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("auth/login", "routes/auth.login.tsx"),
  route("auth/register", "routes/auth.register.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("admin/dashboard", "routes/admin.dashboard.tsx"),
  route("admin/users", "routes/admin.users.tsx"),
  route("teacher/classes", "routes/teacher.classes.tsx"),
  route("components", "routes/components.tsx"),
] satisfies RouteConfig;
