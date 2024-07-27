import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Ellipsis } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { CreateStudentModal } from "../components/create-student-modal";
import { SendLeasonModal } from "../components/send-leason-modal";
import { EditStudentModalProps } from "../components/edit-student-modal";
import { DeleteStudentModal } from "../components/delete-student-moda";

export interface Course {
  id: string;
  name: string;
  createdAt: Date;
}

export const Home = () => {
  const [deleteStudentModal, setDeleteStudentModal] = useState<boolean>(false);
  const [editStudentModal, setEditStudentModal] = useState<boolean>(false);

  const [deleteStudentId, setDeleteStudentId] = useState<string>("");
  const [editStudentId, setEditStudentId] = useState<string>("");

  const [courses, setCourses] = useState<Course[]>([]);

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

  useEffect(() => {
    fetchCoursesInApi();
  }, []);

  return (
    <main className="realative w-full py-8 px-6 flex flex-col">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Students</h1>

        <div className="flex gap-4">
          <CreateStudentModal courses={courses} />

          <Select>
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
            {Array.from({ length: 5 }).map((_, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="font-medium">Israel Cruz</TableCell>
                  <TableCell>israel@dev.com</TableCell>
                  <TableCell>TI</TableCell>
                  <TableCell>24/03/2020</TableCell>
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
                            handleOpenEditStudentModal(i.toString())
                          }
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleOpenDeleteStudentModal(i.toString())
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
