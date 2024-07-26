import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../lib/prisma";

export async function updateTeacher(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/teacher",
    {
      schema: {
        body: z.object({
          name: z.string().min(3),
          email: z.string().email(),
        }),
      },
    },
    async (request) => {
      await request.jwtVerify();

      const { name, email } = request.body;
      const teacherId = request.user.sub;

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
