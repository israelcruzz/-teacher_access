import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../lib/prisma";

export async function findTeacher(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/teacher/:teacherId",
    {
      schema: {
        params: z.object({
          teacherId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { teacherId } = request.params;

      const teacher = await db.teacher.findUnique({
        where: {
          id: teacherId,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      if (!teacher) {
        throw new Error("Teacher Not Found");
      }

      return teacher;
    }
  );
}
