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

router.get("/", BookController.getAllBooks);

router.get(
  "/recommended",
  auth(USER_ROLES.USER),
  BookController.getRecommendedBooks
);

router.get("/:id", BookController.getBookById);

router.put(
  "/:id",
  auth(USER_ROLES.ADMIN),
  multerUpload.single("coverImage"),
  parseBody,
  validateRequest(BookValidation.updateBookValidation),
  BookController.updateBook
);

router.delete("/:id", auth(USER_ROLES.ADMIN), BookController.deleteBook);

export const BookRoutes = router;
