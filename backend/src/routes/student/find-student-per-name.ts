import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../lib/prisma";

export async function findStudentsPerName(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/teacher/student",
    {
      schema: {
        querystring: z.object({
          name: z.string(),
          page: z.coerce.number().default(1),
        }),
      },
    },
    async (request) => {
      await request.jwtVerify();

      const { name, page } = request.query;
      const teacherId = request.user.sub;
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
          name: {
            contains: name,
          },
        },
        include: {
          course: true,
        },
        skip: (page - 1) * limitStudentFind,
        take: 5,
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
