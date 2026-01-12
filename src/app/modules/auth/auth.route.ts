import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest.js";
import { multerUpload } from "../../config/multer.config.js";
import { parseBody } from "../../middlewares/bodyParser.js";
import { AuthValidation } from "./auth.validation.js";
import { AuthController } from "./auth.controller.js";

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

export const AuthRoutes = router;
