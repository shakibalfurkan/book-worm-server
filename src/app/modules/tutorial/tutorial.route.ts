import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { USER_ROLES } from "../../constant/index.js";
import { TutorialController } from "./tutorial.controller.js";
import validateRequest from "../../middlewares/validateRequest.js";
import { TutorialValidation } from "./tutorial.validation.js";

const router: Router = Router();

router.post(
  "/",
  auth(USER_ROLES.ADMIN),
  validateRequest(TutorialValidation.createTutorialSchema),
  TutorialController.addTutorial
);

router.get("/", TutorialController.getTutorials);

export const TutorialRoutes = router;
