import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../lib/prisma";
import bcryptjs from "bcryptjs";

export async function updateTeacherPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    "/teacher",
    {
      schema: {
        body: z.object({
          recentPassword: z.string().min(8),
          newPassword: z.string().min(8),
        }),
      },
    },
    async (request) => {
      await request.jwtVerify();

      const { newPassword, recentPassword } = request.body;
      const teacherId = request.user.sub;

      const teacher = await db.teacher.findUnique({
        where: {
          id: teacherId,
        },
      });

      if (!teacher) {
        throw new Error("Teacher Not Found");
      }

      const comparePassword = await bcryptjs.compare(
        recentPassword,
        teacher.password
      );

      if (!comparePassword) {
        throw new Error("Passoword Invalid");
      }

      const hashNewPassoword = await bcryptjs.hash(newPassword, 6)

      await db.teacher.update({
        where: {
          id: teacherId,
        },
        data: {
          password: hashNewPassoword,
        },
      });

      return { teacher: teacher.id };
    }
  );
}
