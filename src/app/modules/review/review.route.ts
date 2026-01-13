import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { USER_ROLES } from "../../constant/index.js";
import validateRequest from "../../middlewares/validateRequest.js";
import { ReviewValidation } from "./review.validation.js";
import { ReviewController } from "./review.controller.js";

const router: Router = Router();

router.post(
  "/",
  auth(USER_ROLES.USER),
  validateRequest(ReviewValidation.createReviewSchema),
  ReviewController.createReview
);
router.get("/", () => {});
router.get("/:id", () => {});
router.put("/", auth(USER_ROLES.ADMIN), () => {});
router.delete("/", auth(USER_ROLES.ADMIN), () => {});

export const ReviewRoutes = router;
