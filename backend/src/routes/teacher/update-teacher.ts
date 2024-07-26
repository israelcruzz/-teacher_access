import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../lib/prisma";

export async function updateTeacher(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/teacher/:teacherId",
    {
      schema: {
        params: z.object({
          teacherId: z.string().uuid(),
        }),
        body: z.object({
          name: z.string().min(3),
          email: z.string().email(),
        }),
      },
    },
    async (request) => {
      const { name, email } = request.body;
      const { teacherId } = request.params;

      const existingTeacher = await db.teacher.findUnique({
        where: {
          id: teacherId,
        },
      });

      if (!existingTeacher) {
        throw new Error("Teacher Not Found");
      }

      const teacher = await db.teacher.update({
        where: {
          id: teacherId,
        },
        data: {
          name,
          email,
        },
      });

      return { teacher: teacher.id };
    }
  );
}
