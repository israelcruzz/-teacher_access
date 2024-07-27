import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../lib/prisma";

export async function createStudentInvite(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/teacher/:teacherId/student",
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          courseId: z.string().uuid(),
        }),
        params: z.object({
          teacherId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { email, name, courseId } = request.body;
      const { teacherId } = request.params;

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
