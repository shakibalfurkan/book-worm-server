import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route.js";
import { GenreRoutes } from "../modules/genre/genre.route.js";
import { BookRoutes } from "../modules/book/book.route.js";
import { ReviewRoutes } from "../modules/review/review.route.js";
import { UserShelveRoutes } from "../modules/userShelve/userShelve.route.js";
import { UserRoutes } from "../modules/user/user.route.js";
import { TutorialRoutes } from "../modules/tutorial/tutorial.route.js";

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
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/tutorials",
    route: TutorialRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const globalRouter = router;
