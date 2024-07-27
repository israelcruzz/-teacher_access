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
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

export const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("pass");

    try {
      const teacher = await axios.post("http://localhost:3033/auth", {
        email,
        password,
      });

      console.log(teacher.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
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
          <form className="flex flex-col gap-4" onSubmit={handleSubmitForm}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="pass"
                placeholder="type your password"
                required
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
