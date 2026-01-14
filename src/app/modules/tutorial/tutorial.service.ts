import { Tutorial } from "./tutorial.model.js";

export const addTutorial = async (payload: Record<string, unknown>) => {
  const tutorial = await Tutorial.create(payload);
  return tutorial;
};

export const getTutorials = async () => {
  const tutorials = await Tutorial.find().sort({ order: 1 });
  return tutorials;
};

export const TutorialService = {
  addTutorial,
  getTutorials,
};
