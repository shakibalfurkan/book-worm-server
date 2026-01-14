import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { USER_ROLES } from "../../constant/index.js";
import { UserController } from "./user.controller.js";

const router: Router = Router();
router.get(
  "/me",
  auth(USER_ROLES.ADMIN, USER_ROLES.USER),
  UserController.getUser
);

router.get("/", auth(USER_ROLES.ADMIN), UserController.getAllUsers);

export const UserRoutes = router;
