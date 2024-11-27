import fastify from "fastify";
import { getAllSessions } from "./handlers/getAllSessions";
import { getSessionById, getSessionByIdSchema } from "./handlers/getSessionById";
import { createOrUpdateSession, createOrUpdateSessionSchema } from "./handlers/createOrUpdateSession";

const server = fastify();

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

// Go server go
server.listen({ port: 3000 }, (err) => {
  if (err) throw err;
  console.log(`Server listening on port 3000`);
});
