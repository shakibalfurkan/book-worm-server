import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest.js";
import { BookValidation } from "./book.validation.js";
import { multerUpload } from "../../config/multer.config.js";
import { parseBody } from "../../middlewares/bodyParser.js";
import { auth } from "../../middlewares/auth.js";
import { USER_ROLES } from "../../constant/index.js";
import { BookController } from "./book.controller.js";

const router: Router = Router();

router.post(
  "/",
  auth(USER_ROLES.ADMIN),
  multerUpload.single("coverImage"),
  parseBody,
  validateRequest(BookValidation.createBookValidation),
  BookController.createBook
);

export const BookRoutes = router;
