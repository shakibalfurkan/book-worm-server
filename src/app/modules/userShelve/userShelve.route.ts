import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { USER_ROLES } from "../../constant/index.js";
import { UserShelveController } from "./userShelve.controller.js";
import validateRequest from "../../middlewares/validateRequest.js";
import { UserShelveValidation } from "./userShelve.validation.js";

const router: Router = Router();

router.post(
  "/toggle-shelf",
  auth(USER_ROLES.USER),
  validateRequest(UserShelveValidation.toggleShelveSchema),
  UserShelveController.toggleShelve
);

export const UserShelveRoutes = router;
