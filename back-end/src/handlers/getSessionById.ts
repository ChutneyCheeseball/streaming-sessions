import { FastifyRequest, FastifyReply } from "fastify";
import { sessions } from "../server";

// =================================================================================================
// Handler Schema
// =================================================================================================

export const getSessionByIdSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
};

// =================================================================================================
// Handler Function
// =================================================================================================

export async function getSessionById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const { id } = request.params;
  const idx = sessions.findIndex((s) => s.id === id);
  if (idx !== -1) {
    reply.send(sessions[idx]);
  } else {
    reply.code(404).send({ message: "Session not found" });
  }
}
