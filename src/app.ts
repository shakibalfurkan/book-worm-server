import express, { type Request, type Response } from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middlewares/globalErrorHandler.js";
import notFoundError from "./app/middlewares/notFoundError.js";
import { globalRouter } from "./app/routes/index.js";

export async function createApp(): Promise<express.Express> {
  const app = express();

  // Middleware setup
  app.use(
    cors({
      origin: [
        "https://bookworm-client-jet.vercel.app",
        "http://localhost:3000",
      ],
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "Welcome to the BookWorm API service!",
    });
  });

  app.use("/api/v1", globalRouter);

  app.use(globalErrorHandler);
  app.use(notFoundError);

  return app;
}
