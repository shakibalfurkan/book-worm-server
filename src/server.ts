import { createApp } from "./app.js";
// import config from "./app/config/index.js";
// import connectToMongoDB from "./app/database/mongodb.js";

const port = process.env.PORT || 5000;

async function main(): Promise<void> {
  try {
    // Connect to MongoDB database
    // await connectToMongoDB();
    // Create app
    const app = await createApp();

    // Start server
    app.listen(port, () => {
      console.log(`Auth service is listening on port: ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

main();
