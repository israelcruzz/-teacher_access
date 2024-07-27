import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, LoaderCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Course } from "@/pages/app/home";
import axios from "axios";

export const Invite = () => {
  const { loading } = useAuth();
  const [courses, setCourses] = useState<Course[]>();
  const [courseId, setCourseId] = useState<string>("");

  const formSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3),
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
      reset();
    } catch (error) {
      toast.error("Email or Password Invalid");
    }
  };

  const fetchCoursesInApi = async () => {
    const courses = await axios.get("http://localhost:3033/courses");

    setCourses(courses.data);
  };

  useEffect(() => {
    fetchCoursesInApi();
  }, []);

  return (
    <main className="h-screen p-4 md:p-0 max-w-[400px] mx-auto flex justify-center items-center">
      <Card className="w-full ">
        <CardHeader className="text-center space-y-1">
          <GraduationCap className="flex self-center h-12 w-12 transition-all group-hover:scale-110" />
          <CardTitle className="text-2xl">
            Student Registration by invitation
          </CardTitle>
          <CardDescription>
            Enter your details so your teacher can send lessons to you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register("email", { required: true })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="type your name"
                required
                {...register("name", { min: 3, required: true })}
              />
            </div>

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

            <div className="mt-4">
              <Button disabled={loading} type="submit" className="w-full">
                {loading ? (
                  <span>
                    <LoaderCircle
                      className="animate-spin"
                      color="#000000"
                      size={20}
                    />
                  </span>
                ) : (
                  "Finish"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};
