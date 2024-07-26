import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../lib/prisma";

export async function updateStudent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/teacher/:teacherId/students/:studentId",
    {
      schema: {
        params: z.object({
          teacherId: z.string().uuid(),
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
      const { email, name, courseId } = request.body;
      const { teacherId, studentId } = request.params;

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
