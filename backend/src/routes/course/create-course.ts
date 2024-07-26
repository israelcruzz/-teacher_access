import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../lib/prisma";

export async function createCourse(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/course",
    {
      schema: {
        body: z.object({
          name: z.string(),
        }),
      },
    },
    async (request) => {
      const { name } = request.body;

      const existingCourseWithSameName = await db.course.findFirst({
        where: {
          name: name,
        },
      });

      if (existingCourseWithSameName) {
        throw new Error("Course Already Exists");
      }

      const course = await db.course.create({
        data: {
          name,
        },
      });

      return { course: course.id };
    }
  );
}
