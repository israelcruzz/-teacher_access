import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../lib/prisma";
import { mail } from "../../lib/mail";

export async function sendLeason(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/teacher/leason",
    {
      schema: {
        body: z.object({
          nameLeason: z.string(),
          leason: z.string(),
          courseId: z.string(),
        }),
      },
    },
    async (request) => {
      await request.jwtVerify();

      const teacherId = request.user.sub;
      const { nameLeason, leason, courseId } = request.body;

      const existingTeacher = await db.teacher.findUnique({
        where: {
          id: teacherId,
        },
      });

      if (!existingTeacher) {
        throw new Error("Teacher Not Found");
      }

      let studentsEmails: string[] = [];

      if (courseId === "all") {
        const studentEmailsWithTeacherId = await db.student.findMany({
          where: {
            teacherId,
          },
          select: {
            email: true,
          },
        });

        studentEmailsWithTeacherId.map((student) =>
          studentsEmails.push(student.email)
        );
      } else {
        const course = await db.course.findUnique({
          where: {
            id: courseId,
          },
        });

        if (!course) {
          throw new Error("Id Course Invalid");
        }

        const studentEmailsWithSameCourse = await db.student.findMany({
          where: {
            teacherId,
            courseId,
          },
          select: {
            email: true,
          },
        });

        studentEmailsWithSameCourse.map((student) =>
          studentsEmails.push(student.email)
        );
      }

      console.log(studentsEmails);

      await mail({
        to: studentsEmails,
        subject: nameLeason,
        html: `<p>${leason}</p>`,
      });

      return { message: "Leason Sended" };
    }
  );
}
