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

export const GenreService = {
  createGenreIntoDB,
  getAllGenresFromDB,
};
