import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { EditProfile } from "../components/edit-profile";
import { EditPass } from "../components/edit-pass";

export const Config = () => {
  const { user } = useAuth();

  return (
    <main className="w-full px-6 py-8 flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p>Manage your account preferences.</p>
      </header>

      <div className="flex gap-4 items-center">
        <Avatar className="h-24 w-24">
          <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTB150houmpak2hZV49XjS7KOLcAFNI6YI1A&s" />
          <AvatarFallback>Profile Photo</AvatarFallback>
        </Avatar>

        <section>
          <h1>{user?.name}</h1>
          <p>{user?.email}</p>
        </section>
      </div>

      <div>
        <div className="w-full flex gap-24 items-center justify-between mb-2 mt-4">
          <section>
            <div className="text-base font-medium">Change Password</div>
            <div className="text-sm text-muted-foreground">
              Update your account password
            </div>
          </section>

          <EditPass />
        </div>

        <Separator />

        <div className="w-full flex gap-24 items-center justify-between mb-2 mt-4">
          <section>
            <div className="text-base font-medium">Change informations</div>
            <div className="text-sm text-muted-foreground">
              Update your account informations
            </div>
          </section>

          <EditProfile />
        </div>

        <Separator />

        <div className="w-full flex gap-24 items-center justify-between mb-2 mt-4">
          <section>
            <div className="text-base font-medium">Delete Account</div>
            <div className="text-sm text-muted-foreground">
              Permanently delete your account
            </div>
          </section>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </DialogTrigger>
            <DialogPortal>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete? You cannot go back any
                    further, the decision is permanent
                  </DialogDescription>
                </DialogHeader>
                <main className="flex gap-2 justify-end">
                  <Button>Confirm</Button>
                </main>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </div>

        <Separator />
      </div>
    </main>
  );
};
