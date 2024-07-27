import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Ellipsis } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { CreateStudentModal } from "../components/create-student-modal";
import { SendLeasonModal } from "../components/send-leason-modal";
import { EditStudentModalProps } from "../components/edit-student-modal";
import { DeleteStudentModal } from "../components/delete-student-modal";
import dayjs from "dayjs";

export interface Course {
  id: string;
  name: string;
  createdAt: Date;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  courseName: string;
}

export interface StudentResponse {
  data: {
    students: Student[];
  };
}

export const Home = () => {
  const [deleteStudentModal, setDeleteStudentModal] = useState<boolean>(false);
  const [editStudentModal, setEditStudentModal] = useState<boolean>(false);
  const [deleteStudentId, setDeleteStudentId] = useState<string>("");
  const [editStudentId, setEditStudentId] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>();
  const [query, setQuery] = useState<string>("");
  const [course, setCourse] = useState<string>("");

  const handleOpenDeleteStudentModal = (id: string) => {
    setDeleteStudentId(id);
    setDeleteStudentModal(true);
  };

  const handleOpenEditStudentModal = (id: string) => {
    setEditStudentId(id);
    setEditStudentModal(true);
  };

  const fetchCoursesInApi = async () => {
    const courses = await api.get("/courses");

    setCourses(courses.data);
  };

  const fetchStudentsInApi = async () => {
    const students = await api.get("/teacher/students");

    setStudents(students.data.students);
  };

  const fetchStudentsWithQueryInApi = async () => {
    const students = await api.get(`/teacher/student?name=${query}`);

    setStudents(students.data.students);
  };

  const fetchStudentsWithCourseInApi = async () => {
    if (course === "all") {
      await fetchStudentsInApi();
    } else {
      const students = await api.get(`/teacher/course/${course}/students`);
      setStudents(students.data.students);
    }
  };

  useEffect(() => {
    fetchCoursesInApi();
    fetchStudentsInApi();
  }, []);

  useEffect(() => {
    fetchStudentsWithQueryInApi();
  }, [query]);

  useEffect(() => {
    fetchStudentsWithCourseInApi();
  }, [course]);

  return (
    <main className="realative w-full py-8 px-6 flex flex-col">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Students</h1>

        <div className="flex gap-4">
          <CreateStudentModal courses={courses} />

          <Select onValueChange={setCourse}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {courses &&
                courses.map((course, i) => (
                  <SelectItem value={course.id} key={i}>
                    {course.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <div className="flex w-[300px] h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 items-center gap-2">
            <Search className="h-4 w-4" />
            <input
              type="text"
              className="bg-transparent outline-none flex-1"
              placeholder="Search student..."
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </header>
      <div className="mt-6 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>CreatedAt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students &&
              students.map((student, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      {student.name}
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.courseName}</TableCell>
                    <TableCell>
                      {dayjs(student.createdAt).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex justify-center items-center  rounded-md p-1">
                            <Ellipsis />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Israel Cruz</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              handleOpenEditStudentModal(student.id)
                            }
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleOpenDeleteStudentModal(student.id)
                            }
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>

      <div className="self-end mt-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <SendLeasonModal courses={courses} />

      <DeleteStudentModal
        deleteStudentModal={deleteStudentModal}
        setDeleteStudentModal={setDeleteStudentModal}
      />

      <EditStudentModalProps
        editStudentModal={editStudentModal}
        courses={courses}
        setEditStudentModal={setEditStudentModal}
      />
    </main>
  );
};
