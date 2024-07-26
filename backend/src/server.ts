import fastify from "fastify";
import cors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import fastifyJwt from "@fastify/jwt";
import { createTeacher } from "./routes/teacher/create-teacher";
import { env } from "./env/env";
import { teacherAuth } from "./routes/auth/teacher-auth";
import { createStudent } from "./routes/student/create-student";
import { findStudents } from "./routes/student/find-students";
import { findStudentPerCourse } from "./routes/student/find-student-per-course";
import { findStudentsPerName } from "./routes/student/find-student-per-name";

const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(cors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTeacher);
app.register(teacherAuth);
app.register(createStudent);
app.register(findStudents);
app.register(findStudentPerCourse)
app.register(findStudentsPerName)

app.listen({ port: env.PORT }).then(() => console.log(`🚀 Server Running in http://localhost:${env.PORT}`));
