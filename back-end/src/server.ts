import fastify from "fastify";
import cors from "@fastify/cors";

import { getAllSessions } from "./handlers/getAllSessions";
import {
  getSessionById,
  getSessionByIdSchema,
} from "./handlers/getSessionById";
import {
  createOrUpdateSession,
  createOrUpdateSessionSchema,
} from "./handlers/createOrUpdateSession";
import { deleteSessionById } from "./handlers/deleteSessionById";
import { database } from "./database";

// =================================================================================================
// Main Application
// =================================================================================================

async function main() {
  // Get Fastify instance
  const server = fastify();
  // Automatically handle CORS headers
  server.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  });

  // Register database plugin
  // NOTE: This must match docker-compose.yml
  await server.register(database, {
    database: "my_database",
    user: "my_user",
    password: "my_password",
    host: "localhost",
  });

  // Server routes
  server.get("/sessions", getAllSessions);
  server.get("/sessions/:id", { schema: getSessionByIdSchema }, getSessionById);
  server.post(
    "/sessions",
    { schema: createOrUpdateSessionSchema },
    createOrUpdateSession
  );
  server.delete(
    "/sessions/:id",
    { schema: getSessionByIdSchema },
    deleteSessionById
  ); // Reuse schema

  // Go server go
  const port = 3001;
  server.listen({ port }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening on ${address}`);
  });
}

main();
