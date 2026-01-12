import jwt from "jsonwebtoken";
import AppError from "../../errors/AppError.js";

export const createToken = (
  jwtPayload: {
    id: string;
    role: string;
    email: string;
  },
  secret: string,
  expiresIn: string
) => {
  const token = jwt.sign(jwtPayload, secret, { expiresIn } as jwt.SignOptions);

  return token;
};

const verifyToken = (token: string, secret: string) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error: any) {
    throw new AppError(401, error.message);
  }
};

export const jwtHelper = {
  createToken,
  verifyToken,
};
