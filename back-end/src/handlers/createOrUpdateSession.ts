import { FastifyRequest, FastifyReply } from "fastify";
import { sessions } from "../server";

// =================================================================================================
// Handler Schema
// =================================================================================================

export const createOrUpdateSessionSchema = {
  body: {
    type: "object",
    properties: { id: { type: "string" }, start: { type: "number" }, end: { type: "number" } },
    required: ["id", "start", "end"],
  },
};

// =================================================================================================
// Handler Function
// =================================================================================================

export async function createOrUpdateSession(
  request: FastifyRequest<{
    Body: { id: string; start: number; end: number };
  }>,
  reply: FastifyReply
) {
  const { id, start, end } = request.body;
  if (start < 0 || start > 24 || end < 0 || end > 24 || end < start) {
    reply.code(400).send({ message: "Session start/end out of bounds" });
  }
  const idx = sessions.findIndex((s) => s.id === id);
  if (idx === -1) {
    sessions.push({ id, start, end });
    reply.send({ message: "Session created" });
  } else {
    sessions[idx] = { id, start, end };
    reply.send({ message: "Session updated" });
  }
}
