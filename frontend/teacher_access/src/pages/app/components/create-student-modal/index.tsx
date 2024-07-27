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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Copy, LoaderCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import useCopyToClipboard from "react-use-clipboard";
import { useAuth } from "@/hooks/useAuth";

interface CreateStudentModalProps {
  courses: Course[];
  updateStudentsFunction: () => Promise<void>;
}

export const CreateStudentModal = ({
  courses,
  updateStudentsFunction,
}: CreateStudentModalProps) => {
  const { user } = useAuth();
  const [courseId, setCourseId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const linkInvite = `http://localhost:5173/invite/${user?.id}`;
  const [copy, setCopy] = useCopyToClipboard(linkInvite);

  const formSchema = z.object({
    name: z.string(),
    email: z.string().email(),
  });

  type formType = z.infer<typeof formSchema>;

  const { register, handleSubmit, reset } = useForm<formType>();

  const handleSubmitForm = async (data: formType) => {
    if (courseId.length === 0) {
      toast.error("Select a Course");
      return;
    }

    const submitData = {
      name: data.name,
      email: data.email,
      courseId,
    };

    try {
      setLoading(true);
      await api.post("/teacher/student", submitData);
      toast.success("Student Created");
      reset();
      setLoading(false);
      await updateStudentsFunction();
    } catch (error) {
      toast.error("Internal Server Error");
      setLoading(false);
    }
  };

  const handleClipCopy = () => {
    setCopy();
    toast.success("Link Copied");
  };

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
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="name_student">Name</Label>
              <Input
                {...register("name", { min: 3 })}
                required
                id="name_student"
                placeholder="type name for student..."
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email_student">Email</Label>
              <Input
                {...register("email", { required: true })}
                required
                id="email_student"
                placeholder="type email for student..."
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
                  "Create"
                )}
              </Button>
            </div>
          </form>

          <Separator />

          <Button
            onClick={handleClipCopy}
            variant={"outline"}
            className="flex gap-2 items-center justify-center"
          >
            Invite student via link
            <Copy size={16} />
          </Button>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
