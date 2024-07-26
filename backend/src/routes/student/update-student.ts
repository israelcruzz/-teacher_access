import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../lib/prisma";

export async function updateStudent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/teacher/students/:studentId",
    {
      schema: {
        params: z.object({
          studentId: z.string().uuid(),
        }),
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
      const { studentId } = request.params;
      const teacherId = request.user.sub;

      const existingStudent = await db.student.findUnique({
        where: {
          id: studentId,
        },
      });

      const existingCourse = await db.course.findUnique({
        where: {
          id: courseId,
        },
      });

      const existingTeacher = await db.teacher.findUnique({
        where: {
          id: teacherId,
        },
      });

      if (!existingCourse) {
        throw new Error("Course Id Invavlid");
      }

      if (!existingStudent) {
        throw new Error("Student Not Found");
      }

      if (!existingTeacher) {
        throw new Error("Teacher Id Invavlid");
      }

      const student = await db.student.update({
        where: {
          id: studentId,
        },
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
