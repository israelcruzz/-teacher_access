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
import { Dispatch, SetStateAction, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { LoaderCircle } from "lucide-react";

interface EditStudentModalProps {
  courses: Course[];
  editStudentModal: boolean;
  setEditStudentModal: Dispatch<SetStateAction<boolean>>;
  editStudentId: string;
  updateStudentsFunction: () => Promise<void>;
}

export const EditStudentModalProps = ({
  courses,
  editStudentModal,
  setEditStudentModal,
  editStudentId,
  updateStudentsFunction,
}: EditStudentModalProps) => {
  const formSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
  });

  const [courseId, setCourseId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  type formType = z.infer<typeof formSchema>;

  const { register, handleSubmit, reset } = useForm<formType>();

  const handleSubmitForm = async (data: formType) => {
    if (courseId.length === 0) {
      toast.error("Select a Course");
      return;
    }

    const dataSubmit = {
      name: data.email,
      email: data.email,
      courseId,
    };

    try {
      setLoading(true);
      await api.put(`/teacher/students/${editStudentId}`, dataSubmit);
      reset();
      toast.success("Student Updated");
      setLoading(false);
      await updateStudentsFunction();
    } catch (error) {
      toast.error("Internal Server Error");
      setLoading(false);
    }
  };

  return (
    <Dialog open={editStudentModal} onOpenChange={setEditStudentModal}>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Studant</DialogTitle>
            <DialogDescription>Make student info</DialogDescription>
          </DialogHeader>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="name_student">Name</Label>
              <Input
                id="name_student"
                placeholder="type name for student..."
                required
                {...register("name", { required: true, min: 3 })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email_student">Email</Label>
              <Input
                id="email_student"
                placeholder="type email for student..."
                required
                {...register("email", { required: true })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="name_leason">Select Course</Label>
              <Select onValueChange={setCourseId}>
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

              <Button className="mt-2">
                {loading ? (
                  <span>
                    <LoaderCircle
                      className="animate-spin"
                      color="#000000"
                      size={20}
                    />
                  </span>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
