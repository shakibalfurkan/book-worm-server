import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest.js";
import { GenreController } from "./genre.controller.js";
import { GenreValidation } from "./genre.validation.js";
import { auth } from "../../middlewares/auth.js";
import { USER_ROLES } from "../../constant/index.js";

const router: Router = Router();

router.post(
  "/",
  auth(USER_ROLES.ADMIN),
  validateRequest(GenreValidation.createGenreSchema),
  GenreController.createGenre
);

router.get("/", GenreController.getAllGenres);

router.put("/:id", auth(USER_ROLES.ADMIN), GenreController.updateGenre);

export const GenreRoutes = router;
