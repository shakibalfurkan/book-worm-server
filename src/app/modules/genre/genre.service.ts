import AppError from "../../errors/AppError.js";
import type { IGenre } from "./genre.interface.js";
import Genre from "./genre.model.js";

const createGenreIntoDB = async (payload: IGenre) => {
  const { name, description } = payload;

  const existingGenre = await Genre.findOne({
    name: {
      $regex: new RegExp(
        `^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
        "i"
      ),
    },
  });

  if (existingGenre) {
    throw new AppError(400, "Genre already exists");
  }

  const genre = await Genre.create({
    name,
    description,
  });

  return genre;
};

const getAllGenresFromDB = async () => {
  const genres = await Genre.find().sort("name");
  return genres;
};

const updateGenre = async (payload: {
  id: string;
  name: string;
  description: string;
}) => {
  const { id, name, description } = payload;

  const genre = await Genre.findById(id);

  if (!genre) {
    throw new AppError(404, "Genre not found");
  }

  if (name && name !== genre.name) {
    const existingGenre = await Genre.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
      _id: { $ne: id },
    });

    if (existingGenre) {
      throw new AppError(400, "Genre name already exists");
    }
  }

  if (name) genre.name = name.trim();
  if (description !== undefined) genre.description = description.trim();

  await genre.save();

  return genre;
};

export const GenreService = {
  createGenreIntoDB,
  getAllGenresFromDB,
  updateGenre,
};
