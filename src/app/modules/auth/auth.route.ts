import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest.js";
import { multerUpload } from "../../config/multer.config.js";
import { parseBody } from "../../middlewares/bodyParser.js";

const router: Router = Router();

router.post(
  "/register",
  multerUpload.single("photo"),
  parseBody,
  validateRequest(AuthValidation.userRegistrationSchema),
  AuthController.registerUser
);

export const AuthRoutes = router;
