import fastify from "fastify";
import { getAllSessions } from "./handlers/getAllSessions";
import { getSessionById, getSessionByIdSchema } from "./handlers/getSessionById";
import { createOrUpdateSession, createOrUpdateSessionSchema } from "./handlers/createOrUpdateSession";
import cors from "@fastify/cors";
import { deleteSessionByIdSchema, deleteSessionById } from "./handlers/deleteSessionById";

const server = fastify();
server.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
});

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
