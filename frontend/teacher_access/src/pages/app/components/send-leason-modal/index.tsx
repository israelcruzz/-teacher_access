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
import { LoaderCircle, Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "@/lib/api";

interface SendLeasonModalProps {
  courses: Course[];
}

export const SendLeasonModal = ({ courses }: SendLeasonModalProps) => {
  const [courseId, setCourseId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const formSchema = z.object({
    nameLeason: z.string(),
    leason: z.string(),
    courseId: z.string(),
  });

  type formType = z.infer<typeof formSchema>;

  const { register, handleSubmit, reset } = useForm<formType>();

  const handleSubmitLeason = async (data: formType) => {
    if (courseId.length === 0) {
      toast.error("Select a Course");
      return;
    }

    const submitData = {
      nameLeason: data.nameLeason,
      leason: data.leason,
      courseId,
    };

    try {
      setLoading(true);
      await api.post("/teacher/leason", submitData);
      toast.success("Leason Sended");
      reset();
      setLoading(false);
    } catch (error) {
      toast.error("Internal Server Error");
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="fixed bottom-0 right-0 m-6">
          <Plus size={16} />
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Leason</DialogTitle>
            <DialogDescription>
              Send the lessons to your students by email
            </DialogDescription>
          </DialogHeader>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleSubmitLeason)}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="name_leason">Name Leason</Label>
              <Input
                id="name_leason"
                placeholder="type name for leason..."
                required
                {...register("nameLeason", { required: true })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="leason">Name Leason</Label>
              <Textarea
                id="leason"
                placeholder="type leason..."
                required
                {...register("leason", { required: true })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="name_leason">Select Course</Label>
              <Select onValueChange={setCourseId}>
                <SelectTrigger>
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
                  "Send"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
