import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { db } from "../../lib/prisma";
import z from "zod";

export async function findStudents(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/teacher/students",
    {
      schema: {
        querystring: z.object({
          page: z.coerce.number().default(1),
        }),
      },
    },
    async (request) => {
      await request.jwtVerify();

      const teacherId = request.user.sub;
      const { page } = request.query;
      const limitStudentFind = 5;

      const teacher = await db.teacher.findUnique({
        where: {
          id: teacherId,
        },
      });

      if (!teacher) {
        throw new Error("Teacher Not Found");
      }

      const students = await db.student.findMany({
        where: {
          teacherId,
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
