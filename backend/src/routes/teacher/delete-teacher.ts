import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { db } from "../../lib/prisma";

export async function deleteTeacher(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .delete("/teacher", async (request) => {
      await request.jwtVerify();

      const teacherId = request.user.sub;

      const existingTeacherWithSameEmail = await db.teacher.findUnique({
        where: {
          id: teacherId,
        },
      });

      if (!existingTeacherWithSameEmail) {
        throw new Error("Teacher Not Found");
      }

      await db.teacher.delete({
        where: {
          id: teacherId,
        },
      });

      return { message: "Teacher Deleted" };
    });
}
