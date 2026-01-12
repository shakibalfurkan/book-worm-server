import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest.js";
import { multerUpload } from "../../config/multer.config.js";
import { parseBody } from "../../middlewares/bodyParser.js";
import { AuthValidation } from "./auth.validation.js";
import { AuthController } from "./auth.controller.js";
import { USER_ROLES } from "../../constant/index.js";
import { auth } from "../../middlewares/auth.js";

const router: Router = Router();

router.post(
  "/register",
  multerUpload.single("photo"),
  parseBody,
  validateRequest(AuthValidation.userRegistrationSchema),
  AuthController.registerUser
);
router.post(
  "/login",
  validateRequest(AuthValidation.userLoginSchema),
  AuthController.loginUser
);

router.get(
  "/me",
  auth(USER_ROLES.ADMIN, USER_ROLES.USER),
  AuthController.getUser
);

router.post("/refresh-token", AuthController.refreshToken);

router.post("/logout", AuthController.logout);

export const AuthRoutes = router;
