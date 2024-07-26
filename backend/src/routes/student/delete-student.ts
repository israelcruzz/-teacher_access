import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../lib/prisma";

export async function deleteStudent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/teacher/students/:studentId",
    {
      schema: {
        params: z.object({
          studentId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      await request.jwtVerify();

      const { studentId } = request.params;
      const teacherId = request.user.sub;

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
