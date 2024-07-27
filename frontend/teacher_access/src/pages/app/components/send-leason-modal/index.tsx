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
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface SendLeasonModalProps {
  courses: Course[];
}

export const SendLeasonModal = ({ courses }: SendLeasonModalProps) => {
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
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name_leason">Name Leason</Label>
              <Input id="name_leason" placeholder="type name for leason..." />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="leason">Name Leason</Label>
              <Textarea id="leason" placeholder="type leason..." />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="name_leason">Select Course</Label>
              <Select>
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

              <Button className="mt-2">Send</Button>
            </div>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
