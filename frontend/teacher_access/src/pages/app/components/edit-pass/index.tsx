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

export const EditPass = () => {
  const { updatePassword, loading } = useAuth();

  const formSchema = z.object({
    recentPassword: z.string().min(8),
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  });

  type formType = z.infer<typeof formSchema>;

  const { register, handleSubmit, reset } = useForm<formType>();

  const handleSubmitForm = async (data: formType) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const dataSubmit = {
      recentPassword: data.recentPassword,
      newPassword: data.newPassword,
    };

    try {
      await updatePassword(dataSubmit);
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
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>Change your password now</DialogDescription>
          </DialogHeader>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="pass">Password</Label>
              <Input
                id="pass"
                type="password"
                required
                {...register("recentPassword", { min: 8 })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="new_pass">New Password</Label>
              <Input
                id="new_pass"
                type="password"
                required
                {...register("newPassword", { min: 8 })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="confirm_pass">Confirm Password</Label>
              <Input
                id="confirm_pass"
                type="password"
                required
                {...register("confirmPassword", { min: 8 })}
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
