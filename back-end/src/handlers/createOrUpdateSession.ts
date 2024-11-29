import { FastifyRequest, FastifyReply } from "fastify";

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
  // Range check
  if (start < 0 || start > 24 || end < 0 || end > 24 || end < start) {
    reply.code(400).send({ message: "Session start/end out of bounds" });
  }
  try {
    const existingSession = await request.server.database.sessions.findOne({
      where: { id }
    });
    const session = await request.server.database.sessions.upsert({
      id, start, end
    });
    if (existingSession) {
      reply.send("Session updated");
    } else {
      reply.send("Session created");
    }
  } catch (error) {
    console.error(error);
    reply.code(500).send({ message: "DB error while updating/creating session" });
  }
}
