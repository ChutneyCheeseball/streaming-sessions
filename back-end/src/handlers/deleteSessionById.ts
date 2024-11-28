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
  try {
    const session = await request.server.database.sessions.findOne({
      where: {
        id
      }
    });
    if (session) {
      await session.destroy();
      reply.send({ message: "Session deleted" });
    } else {
      reply.code(404).send({ message: "Session not found" });
    }
  } catch (error) {
    console.error(error);
    reply.code(500).send({ message: "DB error while deleting session" });
  }
}
