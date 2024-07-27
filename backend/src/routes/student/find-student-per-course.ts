import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../lib/prisma";

export async function findStudentPerCourse(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/teacher/course/:courseId/students",
    {
      schema: {
        querystring: z.object({
          page: z.coerce.number().default(1),
        }),
        params: z.object({
          courseId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      await request.jwtVerify();

      const teacherId = request.user.sub;
      const { courseId } = request.params;
      const { page } = request.query;
      const limitStudentFind = 5;

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
        skip: (page - 1) * limitStudentFind,
        take: limitStudentFind,
        orderBy: {
          createdAt: "desc",
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
