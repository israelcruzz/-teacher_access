import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../lib/prisma";
import bcryptjs from "bcryptjs";

export async function createTeacher(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/teacher",
    {
      schema: {
        body: z.object({
          name: z.string().min(3),
          email: z.string().email(),
          password: z.string().min(8),
        }),
      },
    },
    async (request) => {
      const { name, email, password } = request.body;

      const existingTeacherWithSameEmail = await db.teacher.findUnique({
        where: {
          email,
        },
      });

      if (existingTeacherWithSameEmail) {
        throw new Error("Teacher Not Found");
      }

      const hashPassword = await bcryptjs.hash(password, 6);

      const teacher = await db.teacher.create({
        data: {
          name,
          email,
          password: hashPassword,
        },
      });

      return { teacher: teacher.id };
    }
  );
}
