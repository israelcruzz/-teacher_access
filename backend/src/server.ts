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
import { deleteStudent } from "./routes/student/delete-student";
import { updateStudent } from "./routes/student/update-student";
import { findTeacher } from "./routes/teacher/find-teacher";
import { updateTeacherPassword } from "./routes/teacher/update-teacher-password";
import { updateTeacher } from "./routes/teacher/update-teacher";
import { createCourse } from "./routes/course/create-course";
import { findCourses } from "./routes/course/find-courses";
import { sendLeason } from "./routes/teacher/send-leason";
import multipart from "@fastify/multipart";

const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(cors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(multipart);

app.register(createTeacher);
app.register(teacherAuth);
app.register(createStudent);
app.register(findStudents);
app.register(findStudentPerCourse);
app.register(findStudentsPerName);
app.register(deleteStudent);
app.register(updateStudent);
app.register(findTeacher);
app.register(updateTeacherPassword);
app.register(updateTeacher);
app.register(createCourse);
app.register(findCourses);
app.register(sendLeason);

app
  .listen({ port: env.PORT })
  .then(() => console.log(`🚀 Server Running in http://localhost:${env.PORT}`));
