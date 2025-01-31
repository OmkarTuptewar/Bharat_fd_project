const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

// Track if mongoose is already connected
let isConnected = false;

beforeAll(async () => {
  if (!isConnected) {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    // Ensure mongoose isn't already connected to another instance
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
      isConnected = true; // Set to true once connected
    }
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  isConnected = false; // Reset after tests are done
});
