import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route.js";

const router: Router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const globalRouter = router;
