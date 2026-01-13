import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route.js";
import { GenreRoutes } from "../modules/genre/genre.route.js";
import { BookRoutes } from "../modules/book/book.route.js";
import { ReviewRoutes } from "../modules/review/review.route.js";
import { UserShelveRoutes } from "../modules/userShelve/userShelve.route.js";

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
  {
    path: "/books",
    route: BookRoutes,
  },
  {
    path: "/reviews",
    route: ReviewRoutes,
  },
  {
    path: "/shelves",
    route: UserShelveRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const globalRouter = router;
