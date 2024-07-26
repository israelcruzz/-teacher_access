import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../lib/prisma";

export async function findStudentPerCourse(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/teacher/:teacherId/course/:courseId/students",
    {
      schema: {
        params: z.object({
          teacherId: z.string().uuid(),
          courseId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { teacherId, courseId } = request.params;

      const existingTeacher = await db.teacher.findUnique({
        where: {
          id: teacherId,
        },
      });

      const existingCourse = await db.course.findUnique({
        where: {
          id: courseId,
        },
      });

      if (!existingTeacher) {
        throw new Error("Teacher Not Found");
      }

      if (!existingCourse) {
        throw new Error("Course Not Found");
      }

      const students = await db.student.findMany({
        where: {
          teacherId,
          courseId,
        },
        include: {
          course: true,
        },
      });

      return {
        students: students.map((student) => {
          return {
            id: student.id,
            name: student.name,
            email: student.email,
            createdAt: student.createdAt,
            courseName: student.course.name,
          };
        }),
      };
    }
  );
}
