import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route.js";
import { GenreRoutes } from "../modules/genre/genre.route.js";

const router: Router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/genres",
    route: GenreRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const globalRouter = router;
