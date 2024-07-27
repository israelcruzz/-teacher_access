import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/lib/api";
import { LoaderCircle } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

interface DeleteStudentModalProps {
  deleteStudentModal: boolean;
  setDeleteStudentModal: Dispatch<SetStateAction<boolean>>;
  deleteStudentId: string;
}

export const DeleteStudentModal = ({
  deleteStudentModal,
  setDeleteStudentModal,
  deleteStudentId,
}: DeleteStudentModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      await api.delete(`/teacher/students/${deleteStudentId}`);
      toast.success("Student Deleted");
      setLoading(false);
    } catch (error) {
      toast.error("Internal Server Error");
      setLoading(false);
    }
  };

  return (
    <Dialog open={deleteStudentModal} onOpenChange={setDeleteStudentModal}>
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
            <Button onClick={handleClick}>
              {loading ? (
                <span>
                  <LoaderCircle
                    className="animate-spin"
                    color="#000000"
                    size={20}
                  />
                </span>
              ) : (
                "Delete"
              )}
            </Button>
          </main>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
