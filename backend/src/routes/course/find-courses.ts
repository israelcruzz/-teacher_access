import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { db } from "../../lib/prisma";

export async function findCourses(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get("/courses", async () => {
    const courses = await db.course.findMany();

    return courses;
  });
}
