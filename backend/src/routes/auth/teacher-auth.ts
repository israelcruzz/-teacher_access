import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../lib/prisma";
import bcryptjs from "bcryptjs";

export async function teacherAuth(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/teacher/auth",
    {
      schema: {
        body: z.object({
          email: z.string().email(),
          password: z.string().min(8),
        }),
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;

      const teacher = await db.teacher.findUnique({
        where: {
          email,
        },
      });

      if (!teacher) {
        throw new Error("Incorrect email or password");
      }

      const comparePassword = await bcryptjs.compare(
        password,
        teacher.password
      );

      if (!comparePassword) {
        throw new Error("Incorrect email or password");
      }

      const token = await reply.jwtSign(
        {},
        {
          sign: {
            sub: teacher.id,
          },
        }
      );

      return { token };
    }
  );
}
