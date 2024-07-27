import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Course } from "../../home";

interface CreateStudentModal {
  courses: Course[];
}

export const CreateStudentModal = ({ courses }: CreateStudentModal) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Add Student</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Studant</DialogTitle>
            <DialogDescription>
              Create studant per send leasons
            </DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name_student">Name</Label>
              <Input id="name_student" placeholder="type name for student..." />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email_student">Email</Label>
              <Input
                id="email_student"
                placeholder="type email for student..."
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="name_leason">Select Course</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Course" />
                </SelectTrigger>
                <SelectContent>
                  {courses &&
                    courses.map((course, i) => (
                      <SelectItem value={course.id} key={i}>
                        {course.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Button className="mt-2">Create</Button>
            </div>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
