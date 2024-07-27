import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
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
import { Dispatch, SetStateAction } from "react";

interface EditStudentModalProps {
  courses: Course[];
  editStudentModal: boolean;
  setEditStudentModal: Dispatch<SetStateAction<boolean>>;
}

export const EditStudentModalProps = ({
  courses,
  editStudentModal,
  setEditStudentModal
}: EditStudentModalProps) => {
  return (
    <Dialog open={editStudentModal} onOpenChange={setEditStudentModal}>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Studant</DialogTitle>
            <DialogDescription>Make student info</DialogDescription>
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

              <Button className="mt-2">Update</Button>
            </div>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
