import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,

  mongodb_url: process.env.MONGODB_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,

  jwt_access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwt_access_token_expires_in: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,

  jwt_refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
  jwt_refresh_token_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,

  jwt_reset_token_secret: process.env.JWT_RESET_TOKEN_SECRET,
  jwt_reset_token_expires_in: process.env.JWT_RESET_TOKEN_EXPIRES_IN,

  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,

  client_url: process.env.CLIENT_URL,
};
