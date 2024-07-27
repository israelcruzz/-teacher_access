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
import { useAuth } from "@/hooks/useAuth";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const EditProfile = () => {
  const { updateInfo, loading } = useAuth();

  const formSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3),
  });

  type formType = z.infer<typeof formSchema>;

  const { register, handleSubmit, reset } = useForm<formType>();

  const handleSubmitForm = async (data: formType) => {
    try {
      await updateInfo(data);
      toast.success("Account Updated");
      reset();
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Change</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Information</DialogTitle>
            <DialogDescription>
              Change your account information
            </DialogDescription>
          </DialogHeader>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="new_name">New Name</Label>
              <Input
                id="new_name"
                type="text"
                required
                {...register("name", { required: true, min: 3 })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="new_email">New Email</Label>
              <Input
                id="new_email"
                type="text"
                required
                {...register("email", { required: true })}
              />
            </div>

            <Button>
              {loading ? (
                <span>
                  <LoaderCircle
                    className="animate-spin"
                    color="#000000"
                    size={20}
                  />
                </span>
              ) : (
                "Change"
              )}
            </Button>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
