import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../lib/prisma";

export async function findStudentsPerName(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/teacher/:teacherId/student",
    {
      schema: {
        querystring: z.object({
          name: z.string(),
        }),
        params: z.object({
          teacherId: z.string(),
        }),
      },
    },
    async (request) => {
      const { name } = request.query;
      const { teacherId } = request.params;

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
