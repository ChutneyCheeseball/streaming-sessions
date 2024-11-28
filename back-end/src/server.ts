import fastify from "fastify";
import { getAllSessions } from "./handlers/getAllSessions";
import { getSessionById, getSessionByIdSchema } from "./handlers/getSessionById";
import { createOrUpdateSession, createOrUpdateSessionSchema } from "./handlers/createOrUpdateSession";
import { deleteSessionByIdSchema, deleteSessionById } from "./handlers/deleteSessionById";
import { database } from "./database";
import cors from "@fastify/cors";

// Our fake database for testing
export const sessions = [
  {
    id: "1",
    start: 0,
    end: 12,
  },
  {
    id: "2",
    start: 5,
    end: 13,
  },
];

async function main() {
  // Get Fastify instance
  const server = fastify();
  // Automatically handle CORS headers
  server.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  });
  
  // NOTE: This must match docker-compose.yml
  await server.register(database, {
    database: "my_database",
    user: "my_user",
    password: "my_password",
    host: "localhost"
  })
  
  // Server routes
  server.get("/sessions", getAllSessions);
  server.get("/sessions/:id", { schema: getSessionByIdSchema }, getSessionById);
  server.post("/sessions", { schema: createOrUpdateSessionSchema }, createOrUpdateSession);
  server.delete("/sessions/:id", { schema: deleteSessionByIdSchema }, deleteSessionById);
  
  // Go server go
  const port = 3001;
  server.listen({ port }, (err) => {
    if (err) throw err;
    console.log(`Server listening on port ${port}`);
  });  
}

main()