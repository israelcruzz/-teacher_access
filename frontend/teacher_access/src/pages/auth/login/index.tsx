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

export const Login = () => {
  return (
    <main className="h-screen p-4 md:p-0 max-w-[400px] mx-auto flex justify-center items-center">
      <Card className="w-full ">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Enter your email and password to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
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
              placeholder="type your password"
              required
            />
          </div>

          <div className="mt-4">
            <Button className="w-full">Login</Button>
          </div>

          <a
            href="#"
            className="text-center text-sm text-muted-foreground hover:underline"
          >
            Register
          </a>
        </CardContent>
      </Card>
    </main>
  );
};
