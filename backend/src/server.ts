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

app.listen({ port: env.PORT }).then(() => console.log(`🚀 Server Running in http://localhost:${env.PORT}`));
