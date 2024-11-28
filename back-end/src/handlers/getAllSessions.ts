import { FastifyRequest, FastifyReply } from "fastify";
import { sessions } from "../server";

// =================================================================================================
// Handler Function
// =================================================================================================

export async function getAllSessions(request: FastifyRequest, reply: FastifyReply) {
  try {
    const sessions = await request.server.database.sessions.findAll();
    reply.send(sessions);
  } catch (error) {
    console.error(error);
    reply.code(500).send({ message: "DB error while getting sessions"});
  }
}
