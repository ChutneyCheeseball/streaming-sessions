import { FastifyRequest, FastifyReply } from "fastify";

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

export async function getSessionById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  try {
    const session = await request.server.database.sessions.findOne({
      where: {
        id,
      },
    });
    if (session) {
      reply.send(session);
    } else {
      reply.code(404).send({ message: "Session not found" });
    }
  } catch (error) {
    console.error(error);
    reply.code(500).send({ message: "DB error while getting session" });
  }
}
