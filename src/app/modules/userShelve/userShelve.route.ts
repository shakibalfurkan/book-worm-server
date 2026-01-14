import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { USER_ROLES } from "../../constant/index.js";
import { UserShelveController } from "./userShelve.controller.js";
import validateRequest from "../../middlewares/validateRequest.js";
import { UserShelveValidation } from "./userShelve.validation.js";

const router: Router = Router();

router.post(
  "/toggle-shelve",
  auth(USER_ROLES.USER),
  validateRequest(UserShelveValidation.toggleShelveSchema),
  UserShelveController.toggleShelve
);

router.get(
  "/my-shelves",
  auth(USER_ROLES.USER),
  UserShelveController.getMyShelves
);

export const UserShelveRoutes = router;
