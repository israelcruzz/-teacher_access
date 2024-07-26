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
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <main className="h-screen p-4 md:p-0 max-w-[400px] mx-auto flex justify-center items-center">
      <Card className="w-full ">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your name, email and password to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="type your name"
              required
            />
          </div>

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
            <Button className="w-full">Create</Button>
          </div>

          <Link
            to="/"
            className="text-center text-sm text-muted-foreground hover:underline"
          >
            Login
          </Link>
        </CardContent>
      </Card>
    </main>
  );
};
