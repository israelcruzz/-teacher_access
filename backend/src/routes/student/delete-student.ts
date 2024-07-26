import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../lib/prisma";

export async function deleteStudent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/teacher/:teacherId/students/:studentId",
    {
      schema: {
        params: z.object({
          teacherId: z.string().uuid(),
          studentId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { studentId, teacherId } = request.params;

      const existingTeacher = await db.teacher.findUnique({
        where: {
          id: teacherId,
        },
      });

      const existingStudent = await db.student.findUnique({
        where: {
          id: studentId,
        },
      });

      if (!existingTeacher) {
        throw new Error("Teacher Not Found");
      }

      if (!existingStudent) {
        throw new Error("Student Not Found");
      }

      await db.student.delete({
        where: {
          id: studentId,
        },
      });

      return { message: "Student Deleted" };
    }
  );
}
