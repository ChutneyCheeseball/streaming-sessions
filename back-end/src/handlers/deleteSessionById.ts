import { FastifyRequest, FastifyReply } from "fastify";
import { sessions } from "../server";

// =================================================================================================
// Handler Schema
// =================================================================================================

export const deleteSessionByIdSchema = {
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

export async function deleteSessionById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const { id } = request.params;
  const idx = sessions.findIndex((s) => s.id === id);
  if (idx !== -1) {
    sessions.splice(idx, 1);
    reply.send({ message: "Session deleted." });
  } else {
    reply.code(404).send({ message: "Session not found" });
  }
}
