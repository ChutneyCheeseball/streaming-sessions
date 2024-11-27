import { FastifyRequest, FastifyReply } from "fastify";
import { sessions } from "../server";

// =================================================================================================
// Handler Function
// =================================================================================================

export async function getAllSessions(request: FastifyRequest, reply: FastifyReply) {
  reply.send(sessions);
}
