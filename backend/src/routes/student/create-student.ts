import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../lib/prisma";

export async function createStudent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/teacher/student",
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          courseId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      await request.jwtVerify();

      const { email, name, courseId } = request.body;
      const teacherId = request.user.sub;

      const existingCourse = await db.course.findUnique({
        where: {
          id: courseId,
        },
      });

      if (!existingCourse) {
        throw new Error("Course Id Invavlid");
      }

      const existingTeacher = await db.teacher.findUnique({
        where: {
          id: teacherId,
        },
      });

      if (!existingTeacher) {
        throw new Error("Teacher Id Invavlid");
      }

      const student = await db.student.create({
        data: {
          name,
          email,
          courseId,
          teacherId,
        },
      });

      return { student: student.id };
    }
  );
}
