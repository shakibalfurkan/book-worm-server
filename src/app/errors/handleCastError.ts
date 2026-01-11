import mongoose from "mongoose";
import type {
  TErrorSources,
  TGenericErrorResponse,
} from "../interfaces/error.js";

const handleCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: err?.message,
    errorSources,
  };
};

export default handleCastError;
