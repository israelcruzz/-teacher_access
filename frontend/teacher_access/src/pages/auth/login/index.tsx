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
import { LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const Login = () => {
  const { login, loading } = useAuth();

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  type formType = z.infer<typeof formSchema>;

  const { register, handleSubmit, reset } = useForm<formType>();

  const handleSubmitForm = async (data: formType) => {
    try {
      await login(data);
      reset();
    } catch (error) {
      toast.error("Email or Password Invalid");
    }
  };

  return (
    <main className="h-screen p-4 md:p-0 max-w-[400px] mx-auto flex justify-center items-center">
      <Card className="w-full ">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Enter your email and password to access your account.
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="type your password"
                required
                {...register("password", { min: 8 })}
              />
            </div>

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
                  "Login"
                )}
              </Button>
            </div>
          </form>
          <div className="flex justify-center items-center mt-4">
            <Link
              to="/register"
              className="text-center text-sm text-muted-foreground hover:underline"
            >
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
