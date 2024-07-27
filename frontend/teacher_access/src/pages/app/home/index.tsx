import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Ellipsis } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export const Home = () => {
  const [deleteStudentModal, setDeleteStudentModal] = useState<boolean>(false);
  const [deleteStudentId, setDeleteStudentId] = useState<string>("");

  const handleOpenDeleteStudentModal = (id: string) => {
    setDeleteStudentId(id);
    setDeleteStudentModal(true);
  };

  return (
    <main className="realative w-full py-8 px-6 flex flex-col">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Students</h1>

        <div className="flex gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"secondary"}>Add Student</Button>
            </DialogTrigger>
            <DialogPortal>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Studant</DialogTitle>
                  <DialogDescription>
                    Create studant per send leasons
                  </DialogDescription>
                </DialogHeader>
                <form className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name_student">Name</Label>
                    <Input
                      id="name_student"
                      placeholder="type name for student..."
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email_student">Email</Label>
                    <Input
                      id="email_student"
                      placeholder="type email for student..."
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name_leason">Select Course</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button className="mt-2">Create</Button>
                  </div>
                </form>
              </DialogContent>
            </DialogPortal>
          </Dialog>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex w-[300px] h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 items-center gap-2">
            <Search className="h-4 w-4" />
            <input
              type="text"
              className="bg-transparent outline-none flex-1"
              placeholder="Search student..."
            />
          </div>
        </div>
      </header>

      <div className="mt-6 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>CreatedAt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="font-medium">Israel Cruz</TableCell>
                  <TableCell>israel@dev.com</TableCell>
                  <TableCell>TI</TableCell>
                  <TableCell>24/03/2020</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex justify-center items-center  rounded-md p-1">
                          <Ellipsis />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Israel Cruz</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleOpenDeleteStudentModal(i.toString())}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="self-end mt-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

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
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="mt-2">Send</Button>
              </div>
            </form>
          </DialogContent>
        </DialogPortal>
      </Dialog>

      <Dialog open={deleteStudentModal} onOpenChange={setDeleteStudentModal}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogPortal>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete? You cannot go back any further,
                the decision is permanent
              </DialogDescription>
            </DialogHeader>
            <main className="flex gap-2 justify-end">
              <Button
                variant={"outline"}
                onClick={() => setDeleteStudentModal(false)}
              >
                Cancel
              </Button>
              <Button>Confirm</Button>
            </main>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </main>
  );
};
